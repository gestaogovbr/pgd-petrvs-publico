<?php
namespace App\Console\Commands;

use App\Services\TenantService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class RunBuscaDadosAssincronosJob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:run-busca-dados-assincronos-job  {tenant}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando para sincronizar os dados do SIAPE';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tenantId = $this->argument('tenant');
        if (! $tenantId) {
            $this->error('Tenant não informado.');
            return;
        }

        try {
            $tenantService = new TenantService();
            $tenantService->inicializeTenant($tenantId);

            $classe = new \App\Jobs\BuscarDadosSiapeJob($tenantId);
            $classe->handle();
            $this->info('Job executado com sucesso.');
        } catch (\Throwable $th) {
            Log::error($th->getMessage(), [$th]);
            $this->error('erro ao buscar dados no tenant: ' . $tenantId);
        }
    }
}
