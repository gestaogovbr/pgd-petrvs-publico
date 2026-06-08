<?php

namespace App\Observers;

use App\Models\PlanoTrabalhoConsolidacao;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Log;
use App\Exceptions\EnvioNaoAgendadoException;

class PlanoTrabalhoConsolidacaoObserver
{
    public $afterCommit = true;

    public function __construct()
    {
        if (app()->environment('testing')) {
            $this->afterCommit = false;
        }
    }

    public function created(PlanoTrabalhoConsolidacao $model): void
    {
    }

    public function updated(PlanoTrabalhoConsolidacao $model): void
    {
        if (!tenancy()->initialized) {
            Log::warning('Tentativa de agendar envio de plano de trabalho sem tenant inicializado');
            return;
        }

        try{
            PlanoTrabalhoEnvioService::processar(tenant('id'), $model->planoTrabalho, 'PlanoTrabalhoConsolidacao');
        }catch(EnvioNaoAgendadoException $e) {
            Log::info("Envio do plano de trabalho ID {$model->planoTrabalho->id} não agendado: " . $e->getMessage());
        }
    }
}
