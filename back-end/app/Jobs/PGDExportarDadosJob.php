<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\Tenant;
use App\Services\API_PGD\Export\ExportarTenantService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;


class PGDExportarDadosJob implements ShouldQueue, ShouldBeUnique, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public static function getDescricao(): string
    {
        return "Envia Dados para API do PGD";
    }

    public function handle(ExportarTenantService $exportarTenantService)
    {
        Log::alert("PGDExportarDadosJob");

        foreach(Tenant::all() as $tenant) {
            $exportarTenantService->exportar($tenant->id);
        }
    }

}
