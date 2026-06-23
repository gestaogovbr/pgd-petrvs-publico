<?php

declare(strict_types=1);

namespace App\Services\Envio;

use App\Exceptions\EnvioNaoAgendadoException;
use App\Models\Tenant;
use App\Repository\PlanoEntregaRepository;
use App\Services\API_PGD\PlanoEntregaEnvioService;
use Illuminate\Support\Facades\Log;

class AgendarEnvioPlanosEntregasService
{
    public const CHUNK_SIZE = 100;

    private const ORIGEM_LOG = 'AgendarEnvioPlanosEntregasJob';

    public function __construct(
        private readonly PlanoEntregaRepository $planoEntregaRepository,
    ) {
    }

    public function executar(int|string $tenantId): void
    {
        $tenant = Tenant::findOrFail($tenantId);

        tenancy()->initialize($tenant);

        try {
            $this->executarAgendamentoNoTenant($tenant);
        } finally {
            tenancy()->end();
        }
    }

    public function executarAgendamentoNoTenant(Tenant $tenant): void
    {
        Log::info("Iniciando agendamento de envio de planos de entrega para tenant {$tenant->id}");

        $qtde = 0;

        $this->planoEntregaRepository->findAllParaEnvio(
            self::CHUNK_SIZE,
            function ($planosEntrega) use (&$qtde, $tenant): void {
                foreach ($planosEntrega as $planoEntrega) {
                    $qtde++;

                    $model = $this->planoEntregaRepository->findById((string) $planoEntrega->id);

                    if ($model === null) {
                        continue;
                    }

                    try {
                        PlanoEntregaEnvioService::processar($tenant->id, $model, self::ORIGEM_LOG);
                    } catch (EnvioNaoAgendadoException $e) {
                        Log::error("Erro ao agendar via Job o PE #{$planoEntrega->id}: {$e->getMessage()}");
                    }
                }

                Log::info("Chunk processado ({$qtde} planos de entrega até agora)");
            }
        );

        Log::info("Agendamento finalizado ({$qtde} planos de entrega)");
    }
}
