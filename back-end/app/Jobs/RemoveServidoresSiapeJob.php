<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\IntegracaoSiapeService;
use App\Services\TenantConfigurationsService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class RemoveServidoresSiapeJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    
    public function __construct(private readonly ?string $tenantId = null) {}


    public function handle(): void
    {
        if (empty($this->tenantId)) {
            return;
        }
        Log::info("Job RemoveServidoresSiapeJob - Tenant {$this->tenantId}: INICIANDO");

        $tenant = tenancy()->find($this->tenantId);
        tenancy()->initialize($tenant);

        $this->loadingTenantConfigurationMiddleware($this->tenantId);

        $service = new IntegracaoSiapeService();
        $service->processaServidoresRemovidosNoSiape();

        Log::info("Job RemoveServidoresSiapeJob - Tenant {$this->tenantId}: FINALIZADO");
    }

    public static function getDescricao(): string
    {
        return "Remover servidores inativos no SIAPE";
    }

    private function loadingTenantConfigurationMiddleware(string $tenantId): void
    {
        $tenantConfigurations = new TenantConfigurationsService();
        $tenantConfigurations->handle($tenantId);
    }
}
