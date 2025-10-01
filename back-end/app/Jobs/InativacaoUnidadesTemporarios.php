<?php

namespace App\Jobs;

use App\Services\UnidadeService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class InativacaoUnidadesTemporarios implements ShouldQueue
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
            $unidadeService = new UnidadeService();
            $unidadeService->processarUnidadesTemporarias();
        } catch (\Exception $e) {
            Log::error("Erro ao processar inativação de unidades temporárias", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
}