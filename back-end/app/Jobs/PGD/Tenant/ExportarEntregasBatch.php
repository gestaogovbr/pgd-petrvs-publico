<?php

namespace App\Jobs\PGD\Tenant;

use App\Models\Envio;
use App\Services\API_PGD\AuditSources\PlanoEntregaAuditSource;
use Illuminate\Support\Facades\Log;
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Bus;
use Throwable;

class ExportarEntregasBatch
{
    private $token;
    private Envio $envio;
    private $tenantId;

    public function __construct(
        private readonly PlanoEntregaAuditSource $planoEntregaAuditSource,
        private readonly ExportarTrabalhosBatch $exportarTrabalhosBatch
    )
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

        foreach($this->planoEntregaAuditSource->getData() as $source) {
            $jobs[] = new ExportarEntregaJob($this->token, $this->envio, $source);
        }

        $tenantId = $this->tenantId;
        $exportarTrabalhosBatch = $this->exportarTrabalhosBatch;
        $exportarTrabalhosBatch->setToken($this->token);
        $exportarTrabalhosBatch->setEnvio($this->envio);
        $exportarTrabalhosBatch->setTenantId($this->tenantId);

        if (count($jobs) > 0) {
            Log::info("Exportação de ".count($jobs)." plano(s) de Entrega ({$this->tenantId})...");

            Bus::batch($jobs)
                ->then(function (Batch $batch) use($tenantId, $exportarTrabalhosBatch) {
                    Log::info("Exportação dos planos de Entrega (Tenant {$tenantId}) finalizada com sucesso!");
                    $exportarTrabalhosBatch->send();
                })->catch(function (Batch $batch, Throwable $e) use($tenantId) {
                    Log::error("Exportação dos planos de Entrega (Tenant {$tenantId}) com erro!", ['error' => $e->getMessage()]);
                })->finally(function (Batch $batch) use($tenantId) {
                    Log::error("Exportação dos planos de Entrega (Tenant {$tenantId}) - Fim da execução");
                })
                ->allowFailures()
                ->dispatch();
        } else {
            Log::info("Sem planos de Entrega e enviar ({$this->tenantId}).");
            $exportarTrabalhosBatch->send();
        }
    }
}
