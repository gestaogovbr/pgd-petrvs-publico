<?php

namespace App\Jobs;

use App\Exceptions\LogError;
use Exception;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\Tenant;
use App\Services\API_PGD\Export\ExportarTenantService;
use Illuminate\Support\Facades\Log;

class PGDExportarDadosJob extends JobWithoutTenant implements ContratoJobSchedule
{
    public static function getDescricao(): string
    {
        return "Envia Dados para API do PGD";
    }

    public function handle(ExportarTenantService $exportarTenantService)
    {
        try{
            Log::alert("PGDExportarDadosJob");

            foreach(Tenant::all() as $tenant) {
                $exportarTenantService->exportar($tenant->id);
            }
        } catch (Exception $e) {
            $tenant = tenancy()->find($tenant->id);
            tenancy()->initialize($tenant);

            Log::error("Erro ao processar PGDExportarDadosJob: - Erro: " . $e->getMessage());
            LogError::newWarn("Erro ao processar PGDExportarDadosJob - Erro: " . $e->getMessage());

            tenancy()->end();
            return false; 
        }
    }

}
