<?php

namespace App\Observers;

use App\Models\StatusJustificativa;
use App\Services\API_PGD\PlanoEntregaEnvioService;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Log;
use App\Exceptions\EnvioNaoAgendadoException;

class StatusJustificativaObserver
{
    public function created(StatusJustificativa $model)
    {
        if ($model->isPlanoTrabalho() && $model->isAtivo()) {
            if (!tenancy()->initialized) {
                Log::warning('Tentativa de agendar envio de plano de trabalho sem tenant inicializado');
                return true;
            }

            try{
                PlanoTrabalhoEnvioService::processar(tenant('id'), $model->planoTrabalho);
            }catch(EnvioNaoAgendadoException $e) {
                Log::info("Envio do plano de trabalho ID {$model->planoTrabalho->id} não agendado: " . $e->getMessage());
            }
        }

        if ($model->isPlanoEntrega() && $model->isAtivo()) {
            if (!tenancy()->initialized) {
                Log::warning('Tentativa de agendar envio de plano de entrega sem tenant inicializado');
                return true;
            }

            PlanoEntregaEnvioService::processar(tenant('id'), $model->planoEntrega, 'StatusJustificativa');
        }

        return true;
    }
}
