<?php

namespace App\Jobs\PGD\Tenant;

use App\Models\Envio;
use App\Jobs\PGD\Tenant\ExportarTrabalhoJob;
use App\Services\API_PGD\AuditSources\AuditSource;
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

        $auditSource = new AuditSource('entrega');
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
                ->then(function () use($tenantId) {
                    // Log::info("Exportação dos planos de Trabalho (Tenant {$tenantId}) finalizada com sucesso!");
                })->catch(function (Throwable $e) use($tenantId) {
                    Log::error("[$tenantId] Exportação dos planos de Trabalho com erro!", ['error' => $e->getMessage()]);
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
            
            $jobs = 0;
            foreach($auditSource->getData() as $auditData) {
                $source = $auditSource->toExportSource($auditData);
                $job = new ExportarTrabalhoJob($this->tenant, $this->token, $this->envio, $source);
                $jobs++;
                Cache::put("{$tenantId}_trabalhos", $jobs);
                $batch->add($job);
            }

        }
    }

}
