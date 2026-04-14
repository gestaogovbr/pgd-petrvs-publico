<?php

namespace App\Observers;

use App\Models\PlanoTrabalhoEntrega;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Log;
use App\Exceptions\EnvioNaoAgendadoException;
class PlanoTrabalhoEntregaObserver
{
    public $afterCommit = true;

    public function __construct()
    {
        if (app()->environment('testing')) {
            $this->afterCommit = false;
        }
    }

    public function created(PlanoTrabalhoEntrega $planoTrabalhoEntrega): void
    {
        $this->scheduleExport($planoTrabalhoEntrega);
    }

    public function updated(PlanoTrabalhoEntrega $planoTrabalhoEntrega): void
    {
        $this->scheduleExport($planoTrabalhoEntrega);
    }

    public function deleted(PlanoTrabalhoEntrega $planoTrabalhoEntrega): void
    {
        $this->scheduleExport($planoTrabalhoEntrega);
    }

    public function scheduleExport(PlanoTrabalhoEntrega $planoTrabalhoEntrega): void
    {
        if (!tenancy()->initialized) {
            Log::warning('Tentativa de agendar envio de plano de trabalho sem tenant inicializado');
            return;
        }

        try{
            PlanoTrabalhoEnvioService::processar(tenant('id'), $planoTrabalhoEntrega->planoTrabalho, 'PlanoTrabalhoEntrega');
        }catch(EnvioNaoAgendadoException $e) {
            Log::info("Envio do plano de trabalho ID {$planoTrabalhoEntrega->planoTrabalho->id} não agendado: " . $e->getMessage());
        }
    }
}
