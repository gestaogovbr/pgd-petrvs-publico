<?php

namespace App\Observers;

use App\Models\StatusJustificativa;
use App\Services\API_PGD\PlanoEntregaEnvioService;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Log;

class StatusJustificativaObserver
{
    public function created(StatusJustificativa $model): void
    {
        if ($model->isPlanoTrabalho() && $model->isAtivo()) {
            if (!tenancy()->initialized) {
                Log::warning('Tentativa de agendar envio de plano de trabalho sem tenant inicializado');
                return;
            }

            PlanoTrabalhoEnvioService::processar(tenant('id'), $model->planoTrabalho);
        }

        if ($model->isPlanoEntrega() && $model->isAtivo()) {
            if (!tenancy()->initialized) {
                Log::warning('Tentativa de agendar envio de plano de entrega sem tenant inicializado');
                return;
            }

            PlanoEntregaEnvioService::processar(tenant('id'), $model->planoEntrega, 'StatusJustificativa');
        }
    }
}
