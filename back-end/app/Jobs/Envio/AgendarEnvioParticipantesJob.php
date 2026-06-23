<?php

namespace App\Jobs\Envio;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\Envio\AgendarEnvioParticipantesService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AgendarEnvioParticipantesJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 60 * 60; // 1 hora
    public int $tries = 1;

    public function __construct(private readonly ?string $tenantId = null)
    {
    }

    public static function getDescricao(): string
    {
        return 'Enviar Participantes para API';
    }

    public function handle(AgendarEnvioParticipantesService $service): void
    {
        $service->executar($this->tenantId);
    }
}
