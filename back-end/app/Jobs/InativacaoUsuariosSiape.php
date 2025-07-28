<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class InativacaoUsuariosSiape implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public static function getDescricao(): string
    {
        return 'Inativação de Usuários SIAPE';
    }

    public function __construct(private readonly ?string $tenantId = null)
    {
        $this->queue = 'siape_queue';
        if (!$this->tenantId) {
            return;
        }
        $tenant = tenancy()->find($this->tenantId);
        tenancy()->initialize($tenant);
    }

    public function handle(): void
    {
        if(!$this->tenantId){
            return;
        }

        $integracaoServidorService = app()->make('App\Services\IntegracaoServidorService');
        $ids = $integracaoServidorService->processaServidoresRemovidosNoSiape();
        if (empty($ids)) {
            return;
        }
        Log::info("Inativação de usuários SIAPE concluída", ['ids' => $ids]);
    }
}
