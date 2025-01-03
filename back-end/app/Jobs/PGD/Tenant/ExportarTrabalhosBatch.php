<?php

namespace App\Jobs\PGD\Tenant;

use App\Models\Envio;
use App\Jobs\PGD\Tenant\ExportarTrabalhoJob;
use App\Models\ViewPgdPlanosTrabalho;
use App\Services\API_PGD\AuditSources\AuditSource;
use App\Services\API_PGD\AuditSources\PlanoTrabalhoAuditSource;
use Illuminate\Support\Facades\Log;
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use PDO;
use Throwable;

class ExportarTrabalhosBatch
{
    private $token;
    private Envio $envio;
    private $tenant;
    private $batch;

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
       
        Cache::forget("{$this->envio->id}_trabalhos");
        
        $trabalhos = ViewPgdPlanosTrabalho::withoutGlobalScope(SoftDeletingScope::class)->get();
        $n = 0;
        $jobs = [];
        $data = [];
        try{
            foreach($trabalhos as $auditData) {
                if (array_key_exists($auditData->id, $data)) {
                    continue;
                } 

                $n++;
                $source = $auditSource->toExportSource($auditData);
                $data[$auditData->id] = $source;
                Log::info("[$tenantId] Calculando job de plano de Trabalho nº$n");
            }
        }catch(Throwable $e) {
            Log::error("Erro ao obter dados.".$e->getMessage());
            Log::error($e);
            throw $e;
        }
        unset($trabalhos);

        Log::info(count($data).' planos a exportar');

        try{
            $collection = collect($data);
            unset($data);

            $n = 0;
            $collection->chunk(50)->each(function ($chunk) use (&$n) {
                $jobs = [];
                foreach($chunk as $item) {
                    $n++;
                    $jobs[] = new ExportarTrabalhoJob(
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
        } catch(Throwable $e) {
            Log::error("Erro ao coletar dados.".$e->getMessage());
            Log::error($e);
            throw $e;
        }

        Log::info("[$tenantId] Adicionados $n jobs de plano de Trabalho");
        gc_collect_cycles();

        $this->getBatch()->dispatch();
        
        if ($n > 0) {
            Cache::put("{$this->envio->id}_trabalhos", $n);
            Log::info("[$tenantId] Exportação de ".$n." plano de trabalho(s) em andamento");
        } else {
            Log::info("[$tenantId] Exportação dos planos de Trabalho finalizada sem dados a exportar");
            Log::info("[$tenantId] Exportação finalizada! Envio #".$this->envio->numero);

            $envio->finished_at = now();
            $envio->sucesso = true;
            $envio->save();
        }
    }

    public function getBatch() {
        if ($this->batch) return $this->batch;

        $tenantId = $this->tenant->id;
        $envio = $this->envio;

        $this->batch = Bus::batch([])
            ->name("Envio #".$this->envio->numero. ' - Exportar Planos de Trabalho')
            ->finally(function () use($tenantId, $envio) {
                $flag = Cache::get("{$envio->id}_trabalhos", false);

                Log::info("[$tenantId] Fila de planos de trabalho vazia.");
                Log::info($flag);

                if ($flag) {
                    Cache::forget("{$envio->id}_trabalhos");
                    Log::info("[$tenantId] Exportação dos planos de Trabalho finalizada");
                    Log::info("[$tenantId] Exportação finalizada!");

                    $envio->finished_at = now();
                    $envio->sucesso = true;
                    $envio->save();
                }
            })
            ->allowFailures()
            ->onQueue('pgd_queue');

        return $this->batch;
    }
}
