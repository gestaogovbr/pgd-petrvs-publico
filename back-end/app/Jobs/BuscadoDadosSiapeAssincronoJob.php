<?php

namespace App\Jobs;

use App\Exceptions\LogError;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\Siape\BuscarDadosSiapeUnidade;
use App\Services\TenantConfigurationsService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class BuscadoDadosSiapeAssincronoJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    
    public function __construct(private readonly ?string $tenantId = null)
    {
        Log::info("inicializando a bussca dos dado SIAPE :". $tenantId);
    }

    public static function getDescricao(): string
    {
        return 'Buscar Dados Siape Assincrono';
    }

    

    public function middleware(): array
    {
        return [(new WithoutOverlapping())->expireAfter(60*3)];
    }

    
    public function handle(): void
    {
        Log::alert("Job BuscadoDadosSiapeAssincronoJob START ");
        $tenants = tenancy()->all();
        Log::info("AQUI",json_encode($tenants));
        foreach ($tenants as $tenant) {
            $this->inicializeTenant();
            $this->loadingTenantConfigurationMiddleware($tenant->getTenantKey());
            $config =  config("integracao")["siape"];
            $buscarDadosSiape = new BuscarDadosSiapeUnidade($config["cpf"], $config["url"], $config["conectagov_chave"], $config["conectagov_senha"], $config);
            $buscarDadosSiape->enviar();
        }
    }

    private function inicializeTenant(): void
    {
        if (is_null($this->job->tenant_id)) {
            return;
        }
        $tenant = tenancy()->find($this->job->tenant_id);
        ($tenant) ? tenancy()->initialize($tenant) : LogError::newWarn("Tenant não encontrado.");
    }

    private function loadingTenantConfigurationMiddleware(string $tenantId): void
    {
        $tenantConfigurations = new TenantConfigurationsService();
        $tenantConfigurations->handle($tenantId);
    }

}
