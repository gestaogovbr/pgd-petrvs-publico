<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class InativacaoUnidadesSiape implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public static function getDescricao(): string
    {
        return 'Inativação de Unidades SIAPE';
    }

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

        $integracaoUnidadeService = new \App\Services\IntegracaoUnidadeService();
        $integracaoUnidadeService->processaUnidadesRemovidasNoSiape();
        
        Log::info("Job InativacaoUnidadesSiape executado", ['tenant_id' => $this->tenantId]);
    }
}