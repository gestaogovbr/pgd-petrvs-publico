<?php

namespace App\Console\Commands;

use App\Services\SiapeIndividualService;
use App\Services\TenantConfigurationsService;
use App\Services\TenantService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Facades\SiapeLog;

class SiapeIndividual extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:siape-individual {tenant} {--cpf=} {--unidade=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Executa siape para um cpf ou para uma unidade';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tenantId = $this->argument('tenant');
        if (!$tenantId) {
            $this->error('Tenant não informado.');
            return;
        }

        $cpf = $this->option('cpf');

        $unidade = $this->option('unidade');

        SiapeLog::setImprimirNoTerminal(true);
        try {
            $tenantService = new TenantService();
            $tenantService->inicializeTenant($tenantId);

            $tenantConfigurations = new TenantConfigurationsService();
            $tenantConfigurations->handle($tenantId);

            $service = new SiapeIndividualService();
            if($cpf){
                $service->processaServidor($cpf);
            }
            if($unidade){
                $service->processaUnidade($unidade);
            }
            $this->info('Job executado com sucesso.');
        } catch (\Throwable $th) {
            Log::error($th->getMessage(), [$th]);
            $this->error($th->getMessage());
        }
    }
}
