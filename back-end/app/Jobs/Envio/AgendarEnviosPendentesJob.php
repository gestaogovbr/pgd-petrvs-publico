<?php

declare(strict_types=1);

namespace App\Jobs\Envio;

use App\Services\Envio\AgendarEnviosPendentesService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Jobs\Contratos\ContratoJobSchedule;

class AgendarEnviosPendentesJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 0;
    public int $tries = 1;

    public function __construct(private readonly ?string $tenantId = null)
    {}

    public static function getDescricao(): string
    {
        return 'Enviar Agendamentos Pendentes para API';
    }

    public function handle(AgendarEnviosPendentesService $service): void
    {
        $service->executar($this->tenantId);
    }
}
