<?php

declare(strict_types=1);

namespace App\Jobs;

use App\V2\PainelGerencial\Adesao\SerieAdesaoService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ConsolidarSerieAdesao implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private readonly ?string $tenantId = null,
        private readonly ?string $periodo = null,
    ) {
        $this->queue = 'default';
    }

    public function handle(SerieAdesaoService $service): void
    {
        if ($this->tenantId) {
            $tenant = tenancy()->find($this->tenantId);
            tenancy()->initialize($tenant);
        }

        $service->consolidar($this->periodo ?? now()->format('Y-m'));
    }
}
