<?php

declare(strict_types=1);

namespace App\Services\Envio;

use App\Models\Tenant;
use App\Repository\EnvioParticipanteRepository;
use App\Repository\UsuarioRepository;
use App\Services\API_PGD\UsuarioEnvioService;
use Illuminate\Support\Facades\Log;

class AgendarEnvioParticipantesService
{
    public const CHUNK_SIZE = 100;

    private const ORIGEM_LOG = 'AgendarEnvioParticipantesJob';

    public function __construct(
        private readonly UsuarioRepository $usuarioRepository,
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
        Log::info("Iniciando agendamento PGD para tenant {$tenant->id}");

        $qtde = 0;

        $this->usuarioRepository->findAllParaEnvio(
            self::CHUNK_SIZE,
            function ($usuarios) use (&$qtde, $tenant): void {
                foreach ($usuarios as $usuario) {
                    $qtde++;

                    $model = $this->usuarioRepository->findById((string) $usuario->id);

                    UsuarioEnvioService::processar(
                        $tenant->id,
                        $model,
                        self::ORIGEM_LOG
                    );
                }

                Log::info("Chunk processado ({$qtde} usuários até agora)");
            }
        );

        Log::info("Agendamento finalizado ({$qtde} usuários)");
    }
}
