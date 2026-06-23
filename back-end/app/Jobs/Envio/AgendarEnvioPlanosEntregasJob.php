<?php

namespace App\Jobs\Envio;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\Envio\AgendarEnvioPlanosEntregasService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Illuminate\Queue\SerializesModels;

class AgendarEnvioPlanosEntregasJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private const OVERLAP_KEY = 'agendar-envio-planos-entregas';

    public int $timeout = 60 * 60 * 10; // 10 horas
    public int $tries = 1;

    public function __construct(private readonly ?string $tenantId = null)
    {
        $this->queue = 'pgd_queue';
        $this->connection = 'rabbitmq';
    }

    public static function getDescricao(): string
    {
        return 'Enviar Planos de Entrega para API';
    }

    public function middleware(): array
    {
        return [
            (new WithoutOverlapping(self::OVERLAP_KEY))
                ->expireAfter($this->timeout)
                ->dontRelease(),
        ];
    }

    public function handle(AgendarEnvioPlanosEntregasService $service): void
    {
        $service->executar($this->tenantId);
    }
}
