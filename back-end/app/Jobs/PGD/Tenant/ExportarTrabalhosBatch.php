<?php

namespace App\Jobs\PGD\Tenant;

use App\Models\Envio;
use App\Jobs\PGD\Tenant\ExportarTrabalhoJob;
use App\Services\API_PGD\AuditSources\PlanoTrabalhoAuditSource;
use Illuminate\Support\Facades\Log;
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Bus;
use Throwable;

class ExportarTrabalhosBatch
{
    private $token;
    private Envio $envio;
    private $tenantId;

    public function __construct(private readonly PlanoTrabalhoAuditSource $planoTrabalhoAuditSource)
    {}

    public function setToken($token) {
        $this->token = $token;
    }

    public function setEnvio($envio) {
        $this->envio = $envio;
    }

    public function setTenantId($tenantId) {
        $this->tenantId = $tenantId;
    }

    public function send() {
        $jobs = [];

        foreach($this->planoTrabalhoAuditSource->getData() as $source) {
            $jobs[] = new ExportarTrabalhoJob($this->token, $this->envio, $source);
        }

        $tenantId = $this->tenantId;
        $envio = $this->envio;

        if (count($jobs) > 0) {
            Log::info("Exportação de ".count($jobs)." plano(s) de Trabalho ({$this->tenantId})...");

            Bus::batch($jobs)
                ->then(function (Batch $batch) use($tenantId, $envio) {
                    Log::info("Exportação dos planos de Trabalho (Tenant {$tenantId}) finalizada com sucesso!");

                    $envio->finished_at = now();
                    $envio->sucesso = true;
                    $envio->save();
                })->catch(function (Batch $batch, Throwable $e) use($tenantId) {
                    Log::error("Exportação dos planos de Trabalho (Tenant {$tenantId}) com erro!", ['error' => $e->getMessage()]);
                })->finally(function (Batch $batch) use($tenantId) {
                    Log::error("Exportação dos planos de Trabalho (Tenant {$tenantId}) - Fim da execução");
                    Log::info("Exportação do Tenant {$tenantId} finalizada!");
                })
                ->allowFailures()
                ->dispatch();
        } else {
            Log::info("Sem planos de Trabalho a enviar ({$this->tenantId}).");
            $envio->finished_at = now();
            $envio->sucesso = true;
            $envio->save();

            Log::info("Exportação do Tenant {$this->tenantId} finalizada com sucesso!");
        }
    }

}
