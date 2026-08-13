<?php

namespace App\Jobs;

use App\Models\Tenant;
use App\Repository\TenantRepository;
use App\Repository\UnidadeRepository;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class MarcarUnidadesAntigasJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 60;
    public int $timeout = 300;

    public function __construct(
        private readonly string $tenantId,
        private readonly string $codigoAnterior,
        private readonly string $codigoNovo,
    ) {
        $this->queue = 'siape_queue';
    }

    public function middleware(): array
    {
        return [
            (new WithoutOverlapping('codigo-orgao:' . $this->tenantId))
                ->expireAfter($this->timeout)
                ->releaseAfter(30),
        ];
    }

    public function handle(): void
    {
        $tenant = app(TenantRepository::class)->findById($this->tenantId);

        if (!$tenant instanceof Tenant) {
            throw new RuntimeException("Tenant {$this->tenantId} não encontrado.");
        }

        $quantidade = 0;
        $tenant->run(function () use (&$quantidade): void {
            $quantidade = app(UnidadeRepository::class)
                ->marcarAntigasPorCodigoOrgao($this->codigoAnterior);
        });

        Log::info('Unidades da estrutura anterior marcadas', [
            'tenant_id' => $this->tenantId,
            'codigo_orgao_anterior' => $this->codigoAnterior,
            'codigo_orgao_novo' => $this->codigoNovo,
            'unidades_atualizadas' => $quantidade,
        ]);
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('Falha ao marcar unidades da estrutura anterior', [
            'tenant_id' => $this->tenantId,
            'codigo_orgao_anterior' => $this->codigoAnterior,
            'codigo_orgao_novo' => $this->codigoNovo,
            'erro' => $exception->getMessage(),
        ]);
    }
}
