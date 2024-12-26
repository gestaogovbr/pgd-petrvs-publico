<?php

namespace App\Jobs\PGD\Tenant;

use App\Models\Envio;
use App\Jobs\PGD\Tenant\ExportarTrabalhoJob;
use App\Services\API_PGD\AuditSources\AuditSource;
use App\Services\API_PGD\AuditSources\PlanoTrabalhoAuditSource;
use Illuminate\Support\Facades\Log;
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use PDO;
use Throwable;

class ExportarTrabalhosBatch
{
    private $token;
    private Envio $envio;
    private $tenant;

    public function __construct()
    {}

    public function setToken($token) {
        $this->token = $token;
    }

    public function setEnvio($envio) {
        $this->envio = $envio;
    }

    public function setTenant($tenant) {
        $this->tenant = $tenant;
    }

    public function send() {
        DB::connection()->getPdo()->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);

        $tenantId = $this->tenant->id;
        $envio = $this->envio;

        Log::info("[$tenantId] Consultando planos de Trabalho a exportar...");

        $auditSource = new PlanoTrabalhoAuditSource();
        $total = $auditSource->count();

        if ($total == 0) {
            Log::info("[$tenantId] Sem planos de Trabalho a enviar.");
            $envio->finished_at = now();
            $envio->sucesso = true;
            $envio->save();
            Log::info("[$tenantId] Exportação finalizada com sucesso!");
        } else {
            Log::info("[$tenantId] Exportação de $total plano(s) de Trabalho ...");
            Cache::put("{$tenantId}_trabalhos", 0);
            

            $batch = Bus::batch([])
                ->then(function ($batch) use ($tenantId) {
                    Log::info("[$tenantId] Exportação dos planos de Trabalho - restantes: ".$batch->pendingJobs.'/'.$batch->totalJobs);
                })->finally(function () use($tenantId, $total, $envio) {
                    $jobs = Cache::get("{$tenantId}_trabalhos");

                    if ($jobs >= $total) {
                        Cache::forget("{$tenantId}_trabalhos");
                        Log::info("[$tenantId] Exportação dos planos de Trabalho finalizada");
                        Log::info("[$tenantId] Exportação finalizada!");

                        $envio->finished_at = now();
                        $envio->sucesso = true;
                        $envio->save();
                    }
                })
                ->allowFailures()
                ->onQueue('pgd_queue')
                ->dispatch();
            
            $n = 0;
            $jobs = [];
            foreach($auditSource->getData() as $auditData) {
                $source = $auditSource->toExportSource($auditData);
                $job = new ExportarTrabalhoJob($this->tenant, $this->token, $this->envio, $source);
                $n++;
                $jobs[] = $job;
                if (count($jobs) >= 20) {
                    $batch->add($jobs);  
                    $jobs = [];  
                }
            }

            if (count($jobs) > 0) {
                $batch->add($jobs);
            }
            
            Cache::put("{$tenantId}_trabalhos", $n);
        }
    }

}
