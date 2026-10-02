<?php

namespace App\Jobs;

use App\Facades\SipecLog;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\Entidade;
use App\Models\Integracao;
use App\Services\Sipec\Gestor\SipecGestorIntegracaoService;
use App\Services\Sipec\IntegracaoSipecService;
use App\Services\Sipec\Servidor\SipecServidorAtualizacaoService;
use App\Services\Sipec\Servidor\SipecServidorIntegracaoService;
use App\Services\Sipec\SipecService;
use App\Services\Sipec\Unidade\SipecUnidadeAtualizacaoService;
use App\Services\Sipec\Unidade\SipecUnidadeIntegracaoService;
use App\Services\TenantConfigurationsService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SincronizarSipecJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 0;

    public function __construct(private readonly ?string $tenantId = null)
    {
        $this->queue = 'sipec_queue';
    }

    public static function getDescricao(): string
    {
        return "Sincronizar SIPEC";
    }

    public function handle(): void
    {
        ini_set('memory_limit', '-1');
        $inicio = microtime(true);

        try {
            SipecLog::info('Job START', ['tenant' => $this->tenantId]);

            $this->inicializarTenant();

            $sipecService = new SipecService();

            /** @var IntegracaoSipecService $integracaoSipecService */
            $integracaoSipecService = app(IntegracaoSipecService::class);

            $entidades = Entidade::all();
            foreach ($entidades as $entidade) {

                // FASE 0: Coleta resiliente com checkpoint e retry
                SipecLog::info("Sincronização de entidade [$entidade] iniciada");

                $resultadoUnidades = $this->sincronizarUnidades();
                $resultadoServidores = $this->sincronizarServidores();
                $resultadoGestores = $this->sincronizarGestores();

                $this->persistirIntegracao($entidade->id, [
                    'unidades'  => $resultadoUnidades,
                    'servidores' => $resultadoServidores,
                    'gestores'  => $resultadoGestores,
                ]);
            }

            $duracao = round(microtime(true) - $inicio, 2);
            SipecLog::info('Job END', ['duracao_segundos' => $duracao]);
        } catch (\Throwable $e) {
            $duracao = round(microtime(true) - $inicio, 2);
            SipecLog::error('Job FALHOU', [
                'erro' => $e->getMessage(),
                'duracao_segundos' => $duracao,
            ]);
            report($e);
        }
    }

    private function sincronizarEntidades(IntegracaoSipecService $integracaoSipecService, array $resultadoFase0): bool
    {
        $dataUltimaUnidades = null;//$this->getUltimaExecucaoSemFalhas('unidades');
        $dataUltimaServidores = null;//$this->getUltimaExecucaoSemFalhas('servidores');

        SipecLog::info('Filtro delta sync', [
            'dataUltimaTransacao_unidades' => $dataUltimaUnidades,
            'dataUltimaTransacao_servidores' => $dataUltimaServidores,
        ]);

        SipecLog::info('Coleta API iniciada');

        $sipecService = app(SipecService::class);
        $resultado = $sipecService->executarFase0($this->tenantId, $dataUltimaUnidades, $dataUltimaServidores);

        if ($resultado['status'] === 'locked') {
            SipecLog::warning('Coleta já em execução, abortando.');
            return false;
        }

        SipecLog::info('Coleta concluída', [
            'unidades_coletadas' => $resultado['unidades'] ?? null,
            'servidores_coletados' => $resultado['servidores'] ?? null,
        ]);

        return true;
    }

    /**
     * Processa unidades: sipec_unidades → integracao_unidades → unidades
     */
    private function sincronizarUnidades(): array
    {
        SipecLog::info('Sincronização de unidades iniciada');

        $integracaoResult = app(SipecUnidadeIntegracaoService::class)->processar();
        SipecLog::info('Unidades: integração concluída', $integracaoResult);

        $atualizacaoResult = app(SipecUnidadeAtualizacaoService::class)->processar();
        SipecLog::info('Unidades: atualização concluída', $atualizacaoResult);

        return array_merge($integracaoResult, $atualizacaoResult);
    }

    /**
     * Processa servidores: sipec_servidores → integracao_servidores → usuarios/lotações
     */
    private function sincronizarServidores(): array
    {
        SipecLog::info('Sincronização de servidores iniciada');

        $integracaoResult = app(SipecServidorIntegracaoService::class)->processar();
        SipecLog::info('Servidores: integração concluída', $integracaoResult);

        $atualizacaoResult = app(SipecServidorAtualizacaoService::class)->processar();
        SipecLog::info('Servidores: atualização concluída', $atualizacaoResult);

        return array_merge($integracaoResult, $atualizacaoResult);
    }

    /**
     * Atribui gestores (titular) baseando-se nos CPFs de integracao_unidades.
     */
    private function sincronizarGestores(): array
    {
        SipecLog::info('Sincronização de gestores iniciada');

        $resultado = app(SipecGestorIntegracaoService::class)->processar();
        SipecLog::info('Gestores: concluído', $resultado);

        return $resultado;
    }

    private function inicializarTenant(): void
    {
        if (!$this->tenantId) {
            return;
        }

        $tenant = tenancy()->find($this->tenantId);
        if ($tenant) {
            tenancy()->initialize($tenant);
        }

        (new TenantConfigurationsService())->handle($this->tenantId);
    }

    /**
     * Persiste registro na tabela integracoes após sincronização.
     */
    private function persistirIntegracao(string $entidadeId, array $resultado): void
    {
        Integracao::create([
            'entidade_id' => $entidadeId,
            'atualizar_unidades' => true,
            'atualizar_servidores' => true,
            'atualizar_gestores' => true,
            'usar_arquivos_locais' => false,
            'gravar_arquivos_locais' => false,
            'usuario_id' => null,
            'data_execucao' => Carbon::now(),
            'resultado' => json_encode($resultado, JSON_UNESCAPED_UNICODE),
        ]);
    }
}
