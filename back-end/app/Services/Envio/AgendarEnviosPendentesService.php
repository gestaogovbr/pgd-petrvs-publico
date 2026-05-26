<?php

declare(strict_types=1);

namespace App\Services\Envio;

use App\Exceptions\EnvioNaoAgendadoException;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use App\Services\TenantService;
use Illuminate\Support\Facades\Log;

class AgendarEnviosPendentesService
{
    public const CHUNK_SIZE = 100;

    private const ORIGEM_LOG = 'AgendarEnviosPendentesJob';

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly TenantService $tenantService,
    ) {
    }

    public function executar(int|string $tenantId): void
    {
        $this->tenantService->runInTenant($tenantId, function () use ($tenantId): void {
            $this->executarAgendamentoNoTenant($tenantId);
        });
    }

    public function executarAgendamentoNoTenant(int|string $tenantId): void
    {
        Log::info("Iniciando agendamento de envio de PT para tenant {$tenantId}");

        $qtde = 0;

        $this->planoTrabalhoRepository->chunkEnviosPendentes(
            self::CHUNK_SIZE,
            function ($planoTrabalhos) use (&$qtde, $tenantId): void {
                foreach ($planoTrabalhos as $pt) {
                    $qtde++;

                    $model = $this->planoTrabalhoRepository->findById((string) $pt->id);

                    if ($model === null) {
                        continue;
                    }

                    try {
                        PlanoTrabalhoEnvioService::processar($tenantId, $model, self::ORIGEM_LOG);
                    } catch (EnvioNaoAgendadoException $e) {
                        Log::error("Erro ao agendar via Job o PT #{$model->id}: {$e->getMessage()}");
                    }
                }

                Log::info("Chunk processado ({$qtde} planos de trabalho até agora)");
            }
        );

        Log::info("Agendamento finalizado ({$qtde} planos de trabalho)");
    }
}
