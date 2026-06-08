<?php

namespace App\Observers;

use App\Models\PlanoTrabalho;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Log;
use App\Exceptions\EnvioNaoAgendadoException;

class PlanoTrabalhoObserver
{
    public $afterCommit = true;

    public function __construct()
    {
        if (app()->environment('testing')) {
            $this->afterCommit = false;
        }
    }

    public function created(PlanoTrabalho $planoTrabalho): void
    {
    }

    public function updated(PlanoTrabalho $planoTrabalho)
    {
        if (!tenancy()->initialized) {
            Log::warning('Tentativa de agendar envio de plano de trabalho sem tenant inicializado');
            return true;
        }

        try{
            PlanoTrabalhoEnvioService::processar(tenant('id'), $planoTrabalho, 'PlanoTrabalho');
        }catch(EnvioNaoAgendadoException $e) {
            Log::info("Envio do plano de trabalho ID {$planoTrabalho->id} não agendado: " . $e->getMessage());
        }

        return true;
    }
}
