<?php

namespace App\Observers;

use App\Models\Avaliacao;
use App\Services\API_PGD\PlanoEntregaEnvioService;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use App\Services\API_PGD\UsuarioEnvioService;
use Illuminate\Support\Facades\Log;

class AvaliacaoObserver
{
    public function created(Avaliacao $model): void
    {
        if ($model->isPlanoEntrega()) {
            if (!tenancy()->initialized) {
                Log::warning('Tentativa de agendar envio de plano de entrega sem tenant inicializado');
                return;
            }

            PlanoEntregaEnvioService::processar(tenant('id'), $model->planoEntrega);
        }
    }

    public function updated(Avaliacao $model): void
    {
        if ($model->isPlanoEntrega()) {
            if (!tenancy()->initialized) {
                Log::warning('Tentativa de agendar envio de plano de entrega sem tenant inicializado');
                return;
            }

            PlanoEntregaEnvioService::processar(tenant('id'), $model->planoEntrega);
        }
    }
}
