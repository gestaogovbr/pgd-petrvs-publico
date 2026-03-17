<?php

namespace App\Jobs\Envio;

use App\Exceptions\EnvioNaoAgendadoException;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class AgendarEnviosPendentesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int|string $tenantId;

    public int $timeout = 0;
    public int $tries = 1;

    public function __construct(int|string $tenantId)
    {
        $this->tenantId = $tenantId;
    }

    public function handle(PlanoTrabalhoRepository $planoTrabalhoRepository): void
    {
        $tenantId = $this->tenantId;
        tenancy()->initialize($tenantId);

        try {
            Log::info("Iniciando agendamento de envio de PT para tenant {$tenantId}");
            $qtde = 0;
            $planoTrabalhoRepository->chunkEnviosPendentes(100, function ($planoTrabalhos) use ($planoTrabalhoRepository, &$qtde, $tenantId) {
                foreach ($planoTrabalhos as $pt) {
                    $qtde++;
                    $planoTrabalho = $planoTrabalhoRepository->findById($pt->id);
                    try{
                        PlanoTrabalhoEnvioService::processar($tenantId, $planoTrabalho, 'AgendarEnviosPendentesJob');
                    }catch(EnvioNaoAgendadoException $e) {
                        Log::error("Erro ao agendar via Job o PT #{$planoTrabalho->id}: {$e->getMessage()}");
                    }
                }
                Log::info("Chunk processado ({$qtde} planos de trabalho até agora)");
            });
        } finally {
            tenancy()->end();
        }

        Log::info("Agendamento finalizado ({$qtde} planos de trabalho)");
    }
}
