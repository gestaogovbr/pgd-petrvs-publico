<?php

namespace App\Jobs;

use App\Facades\SipecLog;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\Sipec\SipecService;
use App\Services\TenantConfigurationsService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class BuscarDadosSipecJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 0;

    public function __construct(private readonly ?string $tenantId = null)
    {
        $this->queue = 'sipec_queue';
    }

    public static function getDescricao(): string
    {
        return 'Buscar Dados SIPEC';
    }

    public function handle(): void
    {
        ini_set('memory_limit', '-1');

        try {
            SipecLog::info('Job BuscarDadosSipecJob START', ['tenant' => $this->tenantId]);

            $this->inicializarTenant();

            $config = config('integracao.sipec');

            if (empty(trim($config['conectagov_chave'] ?? '')) || empty(trim($config['conectagov_senha'] ?? '')) || empty(trim($config['url'] ?? ''))) {
                SipecLog::error('BuscarDadosSipecJob: configurações de integração SIPEC ausentes', ['tenant' => $this->tenantId]);
                return;
            }

            $sipecService = new SipecService($config);
            $resultado = $sipecService->executarFase0($this->tenantId);

            if ($resultado['status'] === 'locked') {
                SipecLog::warning('BuscarDadosSipecJob: Fase 0 já em execução, abortando.');
                return;
            }

            SipecLog::info('Job BuscarDadosSipecJob END', [
                'unidades' => $resultado['unidades'] ?? 0,
                'servidores' => $resultado['servidores'] ?? 0,
            ]);
        } catch (\Throwable $e) {
            SipecLog::error('Job BuscarDadosSipecJob FALHOU', ['erro' => $e->getMessage()]);
            report($e);
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
