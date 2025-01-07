<?php

namespace App\Jobs\PGD\Tenant;

use App\Models\Envio;
use App\Services\API_PGD\AuditSources\ParticipanteAuditSource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Cache;
use Throwable;
use PDO;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Models\ViewPgdParticipantes;

class ExportarParticipantesBatch
{
    private $token;
    private Envio $envio;
    private $tenant;
    private $batch;

    public function __construct(
        private readonly ExportarEntregasBatch $exportarEntregasBatch
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
        
        $tenantId = $this->tenant->id;
        
        Log::info("[$tenantId] Consultando participantes a exportar...");
        
        $auditSource = new ParticipanteAuditSource();
        
        Cache::forget("{$this->envio->id}_part");
        
        $n = 0;
        $data = [];

        // DB::connection()->getPdo()->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
        $participantes = ViewPgdParticipantes::withoutGlobalScope(SoftDeletingScope::class)->get();

        Log::info($participantes->count().' participantes a exportar');
        
        foreach($participantes as $auditData) {
            if (array_key_exists($auditData->id, $data)) {
                continue;
            } 
            
            $n++;
            $source = $auditSource->toExportSource($auditData);
            $data[$auditData->id] = $source;
            Log::info("[$tenantId] Calculando job de participante nº$n");
        }
        unset($participantes);

        Log::info(count($data).' participantes a exportar');

        $collection = collect($data);
        unset($data);

        $n = 0;
        $collection->chunk(50)->each(function ($chunk) use (&$n) {
            $jobs = [];
            foreach($chunk as $item) {
                $n++;
                $jobs[] = new ExportarParticipanteJob(
                    $this->tenant->id,
                    $n,
                    $this->token, 
                    $this->tenant->api_url, 
                    $this->tenant->api_cod_unidade_autorizadora, 
                    $this->envio->id, 
                    $this->envio->numero,
                    $item
                );
            }

            Log::info("Total atual de jobs: $n");
            $this->getBatch()->add($jobs);
            unset($jobs);
        });
        unset($collection);
        gc_collect_cycles();

        $this->getBatch()->dispatch();

        if ($n > 0) {
            Log::info("[$tenantId] Exportação de ".$n." participante(s) em andamento");
            Cache::put("{$this->envio->id}_part", true);
        } else {
            Log::info("[$tenantId] Exportação dos participantes finalizada sem dados a exportar");
            gc_collect_cycles();
            $this->getExportarEntregasBatch()->send();
        }
    }

    private function getExportarEntregasBatch() {
        $exportarEntregasBatch = $this->exportarEntregasBatch;
        $exportarEntregasBatch->setToken($this->token);
        $exportarEntregasBatch->setEnvio($this->envio);
        $exportarEntregasBatch->setTenant($this->tenant);

        return $exportarEntregasBatch;
    }

    public function getBatch() {
        if ($this->batch) return $this->batch;

        $tenantId = $this->tenant->id;
        $envio = $this->envio;

        $exportarEntregasBatch = $this->getExportarEntregasBatch();

        $this->batch = Bus::batch([])
            ->name("Envio #{$this->envio->numero} - Exportar Participantes")
            ->finally(function () use($tenantId, $exportarEntregasBatch, $envio) 
            {    
                $flag = Cache::get("{$envio->id}_part", false);
                
                if ($flag) {
                    Cache::forget("{$envio->id}_part");
                    Log::info("[$tenantId] Exportação dos participantes finalizada. Envio #".$envio->numero);
                    $exportarEntregasBatch->send();
                }
            })
            ->allowFailures()
            ->onQueue('pgd_queue');
        
        return $this->batch;
    }
}