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
        // DB::connection()->getPdo()->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);

        $tenantId = $this->tenant->id;
        $exportarTrabalhosBatch = $this->exportarTrabalhosBatch;
        $exportarTrabalhosBatch->setToken($this->token);
        $exportarTrabalhosBatch->setEnvio($this->envio);
        $exportarTrabalhosBatch->setTenant($this->tenant);

        Log::info("[$tenantId] Consultando planos de Entrega a exportar...");
        
        $auditSource = new PlanoEntregaAuditSource();
                     
        Cache::forget("{$this->envio->id}_entregas", 0);
            
        $batch = Bus::batch([])
            ->name("Envio #".$this->envio->numero.' - Exportar Planos de Entrega')
            ->finally(function () use($tenantId, $exportarTrabalhosBatch) 
            {
                $flag = Cache::get("{$this->envio->id}_entregas", false);

                if ($flag) {
                    Cache::forget("{$this->envio->id}_entregas");
                    Log::info("[$tenantId] Exportação dos planos de Entrega finalizada. Envio #".$this->envio->numero);
                    gc_collect_cycles();
                    $exportarTrabalhosBatch->send();
                }
            })
            ->allowFailures()
            ->onQueue('pgd_queue')
            ->dispatch();

        $n = 0;
        foreach($auditSource->getData() as $auditData) {
            $n++;
            $source = $auditSource->toExportSource($auditData);
            $job = new ExportarEntregaJob($this->tenant->id, 
                $n,
                $this->token, 
                $this->tenant->api_url, 
                $this->tenant->api_cod_unidade_autorizadora, 
                $this->envio->id, 
                $this->envio->numero,
                $source
            );
            $batch->add($job);
        }

        if ($n > 0) {
            Cache::put("{$this->envio->id}_entregas", true);
            Log::info("[$tenantId] Exportação de ".$n." planos de entrega(s) em andamento");
        } else {
            Log::info("[$tenantId] Exportação dos planos de Entrega finalizada sem dados para exportar");
            $exportarTrabalhosBatch->send();
        }
    }
}
