<?php

namespace App\Jobs;

use App\Facades\SipecLog;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\Sipec\Gestor\SipecGestorIntegracaoService;
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

            // Busca datas da última execução sem falhas para delta sync
            $dataUltimaUnidades = $this->getUltimaExecucaoSemFalhas('unidades');
            $dataUltimaServidores = $this->getUltimaExecucaoSemFalhas('servidores');

            SipecLog::info("Filtro delta sync", [
                'dataUltimaTransacao_unidades' => $dataUltimaUnidades,
                'dataUltimaTransacao_servidores' => $dataUltimaServidores,
            ]);

            // FASE 0: Coleta resiliente com checkpoint e retry
            SipecLog::info("Fase 0: coleta API iniciada");
            $resultadoFase0 = $sipecService->executarFase0($this->tenantId, $dataUltimaUnidades, $dataUltimaServidores);

            if ($resultadoFase0['status'] === 'locked') {
                SipecLog::warning("Fase 0 já em execução, abortando.");
                return;
            }

            $this->sincronizarUnidades();
            $this->sincronizarServidores();
            $this->sincronizarGestores();

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

    private function sincronizarEntidades(IntegracaoSipecService $integracaoSipecService, array $resultadoFase0): void
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
    private function sincronizarUnidades(): void
    {
        SipecLog::info('Sincronização de unidades iniciada');

        $integracaoResult = app(SipecUnidadeIntegracaoService::class)->processar();
        SipecLog::info('Unidades: integração concluída', $integracaoResult);

        $atualizacaoResult = app(SipecUnidadeAtualizacaoService::class)->processar();
        SipecLog::info('Unidades: atualização concluída', $atualizacaoResult);
    }

    /**
     * Processa servidores: sipec_servidores → integracao_servidores → usuarios/lotações
     */
    private function sincronizarServidores(): void
    {
        SipecLog::info('Sincronização de servidores iniciada');

        $integracaoResult = app(SipecServidorIntegracaoService::class)->processar();
        SipecLog::info('Servidores: integração concluída', $integracaoResult);

        $atualizacaoResult = app(SipecServidorAtualizacaoService::class)->processar();
        SipecLog::info('Servidores: atualização concluída', $atualizacaoResult);
    }

    /**
     * Atribui gestores (titular) baseando-se nos CPFs de integracao_unidades.
     */
    private function sincronizarGestores(): void
    {
        SipecLog::info('Sincronização de gestores iniciada');

        $resultado = app(SipecGestorIntegracaoService::class)->processar();
        SipecLog::info('Gestores: concluído', $resultado);
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
     * Busca a data_execucao da última integração sem falhas para a etapa informada.
     * Retorna null se nunca houve execução bem-sucedida (full sync).
     */
    private function getUltimaExecucaoSemFalhas(string $etapa): ?string
    {
        $registro = Integracao::whereNotNull('data_execucao')
            ->where('resultado', '!=', '')
            ->orderBy('data_execucao', 'desc')
            ->get()
            ->first(function (Integracao $integracao) use ($etapa) {
                $resultado = json_decode($integracao->resultado, true);
                return is_array($resultado)
                    && isset($resultado[$etapa]['Falhas'])
                    && empty($resultado[$etapa]['Falhas']);
            });

        return $registro?->data_execucao?->toIso8601String();
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
