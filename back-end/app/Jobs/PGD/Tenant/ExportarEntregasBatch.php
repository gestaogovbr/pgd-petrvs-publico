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
    private $tenant;

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

    public function setTenant($tenant) {
        $this->tenant = $tenant;
    }

    public function send() {
        $jobs = [];

        foreach($this->planoEntregaAuditSource->getData() as $source) {
            $jobs[] = new ExportarEntregaJob($this->tenant, $this->token, $this->envio, $source);
        }

        $tenantId = $this->tenant->id;
        $exportarTrabalhosBatch = $this->exportarTrabalhosBatch;
        $exportarTrabalhosBatch->setToken($this->token);
        $exportarTrabalhosBatch->setEnvio($this->envio);
        $exportarTrabalhosBatch->setTenant($this->tenant);

        if (count($jobs) > 0) {
            Log::info("Exportação de ".count($jobs)." plano(s) de Entrega ({$this->tenant->id})...");

            Bus::batch($jobs)
                ->then(function (Batch $batch) use($tenantId) {
                    Log::info("Exportação dos planos de Entrega (Tenant {$tenantId}) finalizada com sucesso!");
                })->catch(function (Batch $batch, Throwable $e) use($tenantId) {
                    Log::error("Exportação dos planos de Entrega (Tenant {$tenantId}) com erro!", ['error' => $e->getMessage()]);
                })->finally(function (Batch $batch) use($tenantId, $exportarTrabalhosBatch) {
                    Log::info("Exportação dos planos de Entrega (Tenant {$tenantId}) - Fim da execução");
                    $exportarTrabalhosBatch->send();
                })
                ->allowFailures()
                ->dispatch();
        } else {
            Log::info("Sem planos de Entrega e enviar ({$this->tenant->id}).");
            $exportarTrabalhosBatch->send();
        }
    }
}
