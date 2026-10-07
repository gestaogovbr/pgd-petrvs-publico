<?php

namespace App\Jobs;

use App\Models\Tenant;
use App\Repository\TenantRepository;
use App\Services\PlanoEntregaService;
use App\Services\PlanoTrabalhoService;
use App\Services\UsuarioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use RuntimeException;
use Throwable;

class AtualizarCodUnidadeAutorizadoraJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 60;
    public int $timeout = 300;

    public function __construct(
        private readonly string $tenantId,
        private readonly string $codUnidadeAutorizadora,
        private readonly bool $somenteSemCodigo = false,
    ) {
        $this->connection = 'redis';
        $this->queue = 'default';
    }

    public function middleware(): array
    {
        return [
            (new WithoutOverlapping('cod-unidade-autorizadora:'.$this->tenantId))
                ->expireAfter($this->timeout)
                ->releaseAfter(30),
        ];
    }

    public function handle(
        UsuarioService $usuarioService,
        PlanoTrabalhoService $planoTrabalhoService,
        PlanoEntregaService $planoEntregaService,
    ): void {
        $tenant = app(TenantRepository::class)->findById($this->tenantId);

        if (!$tenant instanceof Tenant) {
            throw new RuntimeException("Tenant {$this->tenantId} não encontrado.");
        }

        $atualizados = [];
        $tenant->run(function () use ($usuarioService, $planoTrabalhoService, $planoEntregaService, &$atualizados): void {
            $atualizados = [
                'usuarios' => $usuarioService->atualizarCodUnidadeAutorizadora(
                    $this->codUnidadeAutorizadora,
                    $this->somenteSemCodigo,
                ),
                'planos_trabalhos' => $planoTrabalhoService->atualizarCodUnidadeAutorizadora(
                    $this->codUnidadeAutorizadora,
                    $this->somenteSemCodigo,
                ),
                'planos_entregas' => $planoEntregaService->atualizarCodUnidadeAutorizadora(
                    $this->codUnidadeAutorizadora,
                    $this->somenteSemCodigo,
                ),
            ];
        });

        Log::info('Rotina de atualização de cod_unidade_autorizadora concluída', [
            'tenant_id' => $this->tenantId,
            'cod_unidade_autorizadora' => $this->codUnidadeAutorizadora,
            'somente_sem_codigo' => $this->somenteSemCodigo,
            'atualizados' => $atualizados,
        ]);
    }

    public function failed(Throwable $exception): void
    {
        Log::error('Falha ao atualizar cod_unidade_autorizadora a partir do tenant', [
            'tenant_id' => $this->tenantId,
            'cod_unidade_autorizadora' => $this->codUnidadeAutorizadora,
            'somente_sem_codigo' => $this->somenteSemCodigo,
            'erro' => $exception->getMessage(),
        ]);
    }
}
