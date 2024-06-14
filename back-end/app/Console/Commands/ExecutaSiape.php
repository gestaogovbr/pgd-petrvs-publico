<?php

namespace App\Console\Commands;

use App\Exceptions\LogError;
use App\Models\Entidade;
use App\Services\IntegracaoService;
use App\Services\TenantConfigurationsService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ExecutaSiape extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:executa-siape {tenant}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Executa o SIAPE via comando';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tenantId = $this->argument('tenant');
        $this->inicializeTenant($tenantId);
        $this->loadingTenantConfigurationMiddleware($tenantId);
        $integracaoService = new IntegracaoService([], $tenantId);
        Log::info("Job SincronizarPetrvs START ");
        $entidades = Entidade::all();
        $inputs = [
            'unidades' => true,
            'servidores' => true,
            'gestores' => true,  
        ];
        foreach ($entidades as $entidade) {
            $inputs['entidade'] = $entidade->id;
            Log::alert("Job SincronizarPetrvs: " . json_encode($inputs));
            $integracaoService->sincronizar($inputs);
        }
        Log::info("Job SincronizarPetrvs END ");
    }

    private function inicializeTenant($tenantId): void
    {
        if (is_null($tenantId)) {
            return;
        }
        $tenant = tenancy()->find($tenantId);
        ($tenant) ? tenancy()->initialize($tenant) : LogError::newWarn("Tenant não encontrado.");
    }

    private function loadingTenantConfigurationMiddleware(string $tenantId): void
    {
        $tenantConfigurations = new TenantConfigurationsService();
        $tenantConfigurations->handle($tenantId);
    }
}
