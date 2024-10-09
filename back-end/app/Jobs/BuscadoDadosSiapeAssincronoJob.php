<?php

namespace App\Jobs;

use App\Exceptions\LogError;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\SiapeListaUORGS;
use App\Models\Tenant;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidores;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidades;
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

    public $tries = 1;

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
        return [(new WithoutOverlapping())->expireAfter(60 * 300)];
    }


    public function handle(): void
    {
        Log::info("Job BuscadoDadosSiapeAssincronoJob START ");
        $tenants = Tenant::all();
        foreach ($tenants as $tenant) {
            tenancy()->initialize($tenant);
            $this->loadingTenantConfigurationMiddleware($tenant->id);
            $config =  config("integracao")["siape"];
            
            if(empty(trim($config["conectagov_chave"]))){
                continue;
            }
            $buscarDadosUnidadesSiape = new BuscarDadosSiapeUnidades($config["cpf"], $config["url"], $config["conectagov_chave"], $config["conectagov_senha"], $config);
            $buscarDadosUnidadesSiape->enviar();
            $buscarDadosUnidadeSiape = new BuscarDadosSiapeUnidade($config["cpf"], $config["url"], $config["conectagov_chave"], $config["conectagov_senha"], $config);
            $buscarDadosUnidadeSiape->enviar();
            $buscarDadosServidoresSiape = new BuscarDadosSiapeServidores($config["cpf"], $config["url"], $config["conectagov_chave"], $config["conectagov_senha"], $config);
            $buscarDadosServidoresSiape->enviar();
            $buscarDadosServidorSiape = new BuscarDadosSiapeServidor($config["cpf"], $config["url"], $config["conectagov_chave"], $config["conectagov_senha"], $config);
            $buscarDadosServidorSiape->enviar();
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
