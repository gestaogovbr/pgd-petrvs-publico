<?php

namespace App\Jobs\Envio;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\Envio\AgendarEnvioPlanosEntregasService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AgendarEnvioPlanosEntregasJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 60 * 60; // 1 hora
    public int $tries = 1;

    public function __construct(private readonly ?string $tenantId = null)
    {
    }

    public static function getDescricao(): string
    {
        return 'Enviar Planos de Entrega para API';
    }

    public function handle(AgendarEnvioPlanosEntregasService $service): void
    {
        $service->executar($this->tenantId);
    }
}
