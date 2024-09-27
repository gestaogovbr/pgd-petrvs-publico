<?php

namespace App\Jobs;

use App\Exceptions\LogError;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\SiapeListaUORGS;
use App\Models\Tenant;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade as BuscarDadosBuscarDadosSiapeUnidade;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidades;
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
        Log::info("inicializando a busca dos dado SIAPE :" . $tenantId);
    }

    public static function getDescricao(): string
    {
        return 'Buscar Dados Siape Assincrono';
    }

    public function middleware(): array
    {
        return [(new WithoutOverlapping())->expireAfter(60 * 3)];
    }


    public function handle(): void
    {
        Log::info("Job BuscadoDadosSiapeAssincronoJob START ");
        $tenants = Tenant::all();
        foreach ($tenants as $tenant) {
            tenancy()->initialize($tenant);
            $this->loadingTenantConfigurationMiddleware($tenant->id);
            $config =  config("integracao")["siape"];
            $buscarDadosUnidadesSiape = new BuscarDadosSiapeUnidades($config["cpf"], $config["url"], $config["conectagov_chave"], $config["conectagov_senha"], $config);
            $buscarDadosUnidadesSiape->enviar();
            $buscarDadosUnidadeSiape = new BuscarDadosBuscarDadosSiapeUnidade($config["cpf"], $config["url"], $config["conectagov_chave"], $config["conectagov_senha"], $config);
            $buscarDadosUnidadeSiape->enviar();
        }
    }

    private function inicializeTenant($tenant): void
    {
        $tenant = tenancy()->find($tenant->id);
        ($tenant) ? tenancy()->initialize($tenant) : LogError::newWarn("Tenant não encontrado.");
    }

    private function loadingTenantConfigurationMiddleware(string $tenantId): void
    {
        $tenantConfigurations = new TenantConfigurationsService();
        $tenantConfigurations->handle($tenantId);
    }
}
