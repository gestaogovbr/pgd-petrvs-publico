<?php

declare(strict_types=1);

namespace App\Jobs\Envio;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\Envio\AgendarEnvioPlanosTrabalhosService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AgendarEnvioPlanosTrabalhosJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 0;
    public int $tries = 1;

    public function __construct(private readonly ?string $tenantId = null)
    {
    }

    public static function getDescricao(): string
    {
        return 'Enviar Planos de Trabalho para API';
    }

    public function handle(AgendarEnvioPlanosTrabalhosService $service): void
    {
        $service->executar($this->tenantId);
    }
}
