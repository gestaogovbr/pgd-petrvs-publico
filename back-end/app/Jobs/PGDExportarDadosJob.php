<?php

namespace App\Jobs;

use App\Exceptions\LogError;
use Exception;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\Tenant;
use App\Services\API_PGD\Export\ExportarTenantService;
use Illuminate\Support\Facades\Log;
use Illuminate\Queue\Middleware\WithoutOverlapping;

class PGDExportarDadosJob extends JobWithoutTenant implements ContratoJobSchedule
{
    public $failOnTimeout = false;
    public $timeout = 120000;

    public function __construct()
    {
        Log::info("PGDExportarDadosJob:construct");

        $this->queue = 'pgd_queue';
    }

    public static function getDescricao(): string
    {
        return "Envia Dados para API do PGD";
    }

    /*public function middleware(): array
    {
        return [(new WithoutOverlapping())->expireAfter(60*3)];
    }*/

    public function handle(ExportarTenantService $exportarTenantService)
    {
        Log::info("PGDExportarDadosJob:START");

        foreach(Tenant::all() as $tenant) {
            try{
                Log::info("PGDExportarDadosJob - START - Tenant {$tenant->id}");
                $exportarTenantService->exportar($tenant->id);
            } catch (Exception $e) {
                Log::error("Erro ao processar PGDExportarDadosJob: - Erro: " . $e->getMessage());
                
                $tenant = tenancy()->find($tenant->id);
                tenancy()->initialize($tenant);
                
                LogError::newWarn("Erro ao processar PGDExportarDadosJob - Erro: " . $e->getMessage());
                
                tenancy()->end();
            }
        }

        Log::info("PGDExportarDadosJob:END");
    }

    

}
