<?php

namespace App\Jobs;

use App\Services\PlanoTrabalhoConsolidacaoService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class VerificarAvaliacoesPendentes implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private readonly ?string $tenantId = null)
    {
        $this->queue = 'default';
        if (!$this->tenantId) {
            return;
        }
        $tenant = tenancy()->find($this->tenantId);
        tenancy()->initialize($tenant);
    }

    public function handle(): void
    {
        if (!$this->tenantId) {
            return;
        }

        try {
            Log::info("Iniciando verificação de avaliações pendentes", [
                'tenant_id' => $this->tenantId,
                'timestamp' => now()
            ]);
            
            $planoTrabalhoConsolidacaoService = new PlanoTrabalhoConsolidacaoService();
            $planoTrabalhoConsolidacaoService->verificarAvaliacoesPendentes();
            
            Log::info("Verificação de avaliações pendentes concluída", [
                'tenant_id' => $this->tenantId,
                'timestamp' => now()
            ]);
            
        } catch (\Exception $e) {
            Log::error("Erro ao verificar avaliações pendentes", [
                'tenant_id' => $this->tenantId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
}