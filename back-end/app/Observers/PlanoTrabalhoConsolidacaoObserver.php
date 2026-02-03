<?php

namespace App\Observers;

use App\Models\PlanoTrabalhoConsolidacao;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Log;
use App\Exceptions\EnvioNaoAgendadoException;

class PlanoTrabalhoConsolidacaoObserver
{
    public function created(PlanoTrabalhoConsolidacao $model): void
    {
    }

    public function updated(PlanoTrabalhoConsolidacao $model): void
    {
        if (!tenancy()->initialized) {
            Log::warning('Tentativa de agendar envio de plano de trabalho sem tenant inicializado');
            return;
        }

        Log::info("Agendando envio do plano de trabalho ID {$model->planoTrabalho->id} para o PGD");

        try{
            PlanoTrabalhoEnvioService::processar(tenant('id'), $model->planoTrabalho, 'PlanoTrabalhoConsolidacao');
        }catch(EnvioNaoAgendadoException $e) {
            Log::info("Envio do plano de trabalho ID {$model->planoTrabalho->id} não agendado: " . $e->getMessage());
        }
    }
}
