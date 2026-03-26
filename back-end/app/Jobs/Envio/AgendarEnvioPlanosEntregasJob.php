<?php

namespace App\Jobs\Envio;

use App\Services\Envio\AgendarEnvioPlanosEntregasService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AgendarEnvioPlanosEntregasJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int|string $tenantId;

    public int $timeout = 0;
    public int $tries = 1;

    public function __construct(int|string $tenantId)
    {
        $this->tenantId = $tenantId;
    }

    public function handle(AgendarEnvioPlanosEntregasService $service): void
    {
        $service->executar($this->tenantId);
    }
}
