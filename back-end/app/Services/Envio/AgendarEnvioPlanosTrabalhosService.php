<?php

declare(strict_types=1);

namespace App\Services\Envio;

use App\Exceptions\EnvioNaoAgendadoException;
use App\Models\Tenant;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Log;

class AgendarEnvioPlanosTrabalhosService
{
    public const CHUNK_SIZE = 100;

    private const ORIGEM_LOG = 'AgendarEnvioPlanosTrabalhosJob';

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
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
        Log::info("Iniciando agendamento de envio de PT para tenant {$tenant->id}");

        $qtde = 0;

        $this->planoTrabalhoRepository->findAllParaEnvio(
            self::CHUNK_SIZE,
            function ($planosTrabalho) use (&$qtde, $tenant): void {
                foreach ($planosTrabalho as $planoTrabalho) {
                    $qtde++;

                    $model = $this->planoTrabalhoRepository->findById((string) $planoTrabalho->id);

                    if ($model === null) {
                        continue;
                    }

                    try {
                        PlanoTrabalhoEnvioService::processar($tenant->id, $model, self::ORIGEM_LOG);
                    } catch (EnvioNaoAgendadoException $e) {
                        Log::error("Erro ao agendar via Job o PT #{$planoTrabalho->id}: {$e->getMessage()}");
                    }
                }

                Log::info("Chunk processado ({$qtde} planos de trabalho até agora)");
            }
        );

        Log::info("Agendamento finalizado ({$qtde} planos de trabalho)");
    }
}
