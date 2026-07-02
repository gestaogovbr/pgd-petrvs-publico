<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\Entidade;
use App\Models\Integracao;
use App\Services\IntegracaoService;
use App\Services\Sipec\IntegracaoSipecService;
use App\Services\Sipec\SipecService;
use App\Facades\SipecLog;
use App\Services\TenantConfigurationsService;
use Carbon\Carbon;
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
            SipecLog::info("Job START", ['tenant' => $this->tenantId]);

            $this->inicializarTenant();

            $sipecService = new SipecService();

            /** @var IntegracaoSipecService $integracaoSipecService */
            $integracaoSipecService = app(IntegracaoSipecService::class);

            // FASE 0: Coleta resiliente com checkpoint e retry
            SipecLog::info("Fase 0: coleta API iniciada");
            $resultadoFase0 = $sipecService->executarFase0($this->tenantId);

            if ($resultadoFase0['status'] === 'locked') {
                SipecLog::warning("Fase 0 já em execução, abortando.");
                return;
            }

            SipecLog::info("Fase 0 concluída", [
                'unidades_coletadas' => $resultadoFase0['unidades'],
                'servidores_coletados' => $resultadoFase0['servidores'],
            ]);

            // FASE 1-3: Processa dados intermediários e sincroniza
            $this->sincronizarEntidades($integracaoSipecService, $resultadoFase0);

            $duracao = round(microtime(true) - $inicio, 2);
            SipecLog::info("Job END", ['duracao_segundos' => $duracao]);
        } catch (\Exception $e) {
            $duracao = round(microtime(true) - $inicio, 2);
            SipecLog::error("Job FALHOU", [
                'erro' => $e->getMessage(),
                'duracao_segundos' => $duracao,
            ]);
        }
    }

    private function sincronizarEntidades(IntegracaoSipecService $integracaoSipecService, array $resultadoFase0): void
    {
        $entidades = Entidade::all();

        foreach ($entidades as $entidade) {
            $inicioEntidade = microtime(true);
            SipecLog::info("Sincronizando entidade", ['entidade_id' => $entidade->id]);

            try {
                $integracaoService = new IntegracaoService([], $this->tenantId);
                $integracaoService->integracaoServiceAdapter = $integracaoSipecService;

                $inputs = [
                    'unidades' => true,
                    'servidores' => true,
                    'gestores' => true,
                    'entidade' => $entidade->id,
                ];

                $integracaoService->sincronizacao($inputs);

                $resultado = array_merge($integracaoService->result, [
                    'fase0' => $resultadoFase0,
                    'duracao_segundos' => round(microtime(true) - $inicioEntidade, 2),
                ]);

                SipecLog::info("Entidade sincronizada com sucesso", [
                    'entidade_id' => $entidade->id,
                    'duracao_segundos' => $resultado['duracao_segundos'],
                ]);
            } catch (\Throwable $e) {
                SipecLog::error("Erro ao sincronizar entidade", [
                    'entidade_id' => $entidade->id,
                    'erro' => $e->getMessage(),
                    'linha' => $e->getFile() . ':' . $e->getLine(),
                ]);
            }
        }
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
}
