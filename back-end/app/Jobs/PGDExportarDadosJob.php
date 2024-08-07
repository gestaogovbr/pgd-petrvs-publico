<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\API_PGD\Export\ExportarService;
use App\Services\API_PGD\Export\ExportarTenantService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use ReflectionClass;
use Symfony\Component\Finder\Finder;
use Illuminate\Support\Facades\App;

class PGDExportarDadosJob implements ShouldQueue, ShouldBeUnique, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private readonly ExportarTenantService $exportarTenantService
    )
    {}

    public static function getDescricao(): string
    {
        return "Envia Dados para API do PGD";
    }

    public function handle()
    {
        $this->exportarTenantService->exportar($this->job->tenant_id);
    }

}
