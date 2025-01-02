<?php

namespace App\Jobs;

use Exception;
use App\Jobs\JobWithoutTenant;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Jobs\ExportarTenantJob;
use App\Models\Tenant;
use Illuminate\Support\Facades\Log;
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Bus;
use Illuminate\Queue\Middleware\WithoutOverlapping;

class ExportarPGDJob extends JobWithoutTenant implements ContratoJobSchedule
{

    public function __construct()
    {
        $this->queue = 'pgd_queue';
    }

    public static function getDescricao(): string
    {
        return "Enviar Todos os Tenants para API do PGD";
    }

    public function middleware()
    {
        return [new WithoutOverlapping()];
    }

    public function handle()
    {
        Log::info("Exportação de Todos os Tenants");

        $jobs = [];
        foreach(Tenant::all() as $tenant) {
            $jobs[] = new ExportarTenantJob($tenant->id);
        }

        Log::info("Exportação de Todos os Tenants -- batch");

        Bus::batch($jobs)->then(function (Batch $batch) {
            // Log::info("Exportação de Todos os Tenants - Finalizado!");
        })->catch(function (Batch $batch, Exception $e) {
            Log::error('Erro ao processar job.', ['error' => $e->getMessage()]);
            // $this->fail($e);
        })->finally(function (Batch $batch) {
            Log::info("Exportação de Todos os Tenants - Fim da execução");
        })->allowFailures()->dispatch();
    }
}