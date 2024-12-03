<?php

namespace App\Jobs\PGD\Tenant;

use App\Models\Envio;
use App\Services\API_PGD\AuditSources\ParticipanteAuditSource;
use Illuminate\Support\Facades\Log;
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Bus;
use Throwable;

class ExportarParticipantesBatch
{
    private $token;
    private Envio $envio;
    private $tenant;

    public function __construct(
        private readonly ParticipanteAuditSource $participanteAuditSource,
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
        $jobs = [];

        foreach($this->participanteAuditSource->getData() as $source) {
            $jobs[] = new ExportarParticipanteJob($this->tenant->api_url, $this->token, $this->envio, $source);
        }

        $tenantId = $this->tenant->id;
        $exportarEntregasBatch = $this->exportarEntregasBatch;
        $exportarEntregasBatch->setToken($this->token);
        $exportarEntregasBatch->setEnvio($this->envio);
        $exportarEntregasBatch->setTenant($this->tenant);

        if (count($jobs) > 0) {
            Log::info("Exportação de ".count($jobs)." participantes ({$this->tenant->id})...");

            Bus::batch($jobs)
                ->then(function (Batch $batch) use($tenantId) {
                    Log::info("Exportação dos participantes (Tenant {$tenantId}) finalizada com sucesso!");    
                })->catch(function (Batch $batch, Throwable $e) use($tenantId) {
                    Log::error("Exportação dos participantes (Tenant {$tenantId}) com erro!", ['error' => $e->getMessage()]);
                })->finally(function (Batch $batch) use($tenantId, $exportarEntregasBatch) {
                    Log::error("Exportação dos participantes (Tenant {$tenantId}) - Fim da execução");
                    $exportarEntregasBatch->send();
                })
                ->allowFailures()
                ->dispatch();
        } else {
            Log::info("Sem participantes a exportar ({$this->tenant->id}).");
            $exportarEntregasBatch->send();
        }
    }
}
