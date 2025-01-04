<?php

namespace App\Jobs\PGD\Tenant;

use App\Models\Envio;
use App\Services\API_PGD\AuditSources\AuditSource;
use App\Services\API_PGD\AuditSources\PlanoEntregaAuditSource;
use Illuminate\Support\Facades\Log;
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Throwable;
use PDO;

class ExportarEntregasBatch
{
    private $token;
    private Envio $envio;
    private $tenant;

    public function __construct(
        private readonly ExportarTrabalhosBatch $exportarTrabalhosBatch
    )
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
        $exportarTrabalhosBatch = $this->exportarTrabalhosBatch;
        $exportarTrabalhosBatch->setToken($this->token);
        $exportarTrabalhosBatch->setEnvio($this->envio);
        $exportarTrabalhosBatch->setTenant($this->tenant);

        Log::info("[$tenantId] Consultando planos de Entrega a exportar...");
        
        $auditSource = new PlanoEntregaAuditSource();
        $total = $auditSource->count();

        if ($total == 0) {
            Log::info("[$tenantId] Sem planos de Entrega e enviar.");
            $exportarTrabalhosBatch->send();
        } else {
            Log::info("[$tenantId] Exportação de ".$total." plano(s) de Entrega...");                
            Cache::put("{$tenantId}_entregas", 0);
            $n = 0;

            $batch = Bus::batch([])
                ->then(function () {
                    // Log::info("Exportação dos planos de Entrega (Tenant {$tenantId}) finalizada com sucesso!");
                })->catch(function (Throwable $e) use($tenantId) {
                    Log::error("[$tenantId] Exportação dos planos de Entrega com erro!", ['error' => $e->getMessage()]);
                })->finally(function () use($tenantId, $total, $exportarTrabalhosBatch) 
                {
                    $n = Cache::get("{$tenantId}_entregas");

                    if ($n >= $total) {
                        Cache::forget("{$tenantId}_entregas");
                        Log::info("[$tenantId] Exportação dos planos de Entrega finalizada");
                        $exportarTrabalhosBatch->send();
                    }
                })
                ->allowFailures()
                ->onQueue('pgd_queue')
                ->dispatch();

            foreach($auditSource->getData() as $auditData) {
                $source = $auditSource->toExportSource($auditData);
                $job = new ExportarEntregaJob($this->tenant, $this->token, $this->envio, $source);
                $n++;
                Cache::put("{$tenantId}_entregas", $n);
                $batch->add($job);
            }
        }
    }
}
