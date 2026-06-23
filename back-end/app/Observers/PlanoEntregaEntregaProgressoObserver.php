<?php

namespace App\Observers;

use App\Models\PlanoEntregaEntregaProgresso;
use App\Services\API_PGD\PlanoEntregaEnvioService;
use Illuminate\Support\Facades\Log;
use App\Exceptions\EnvioNaoAgendadoException;
class PlanoEntregaEntregaProgressoObserver
{
    public $afterCommit = true;

    public function __construct()
    {
        if (app()->environment('testing')) {
            $this->afterCommit = false;
        }
    }

    public function created(PlanoEntregaEntregaProgresso $progresso): void
    {
        $this->scheduleExport($progresso);
    }

    public function updated(PlanoEntregaEntregaProgresso $progresso): void
    {
        $this->scheduleExport($progresso);
    }

    public function deleted(PlanoEntregaEntregaProgresso $progresso): void
    {
        $this->scheduleExport($progresso);
    }

    public function scheduleExport(PlanoEntregaEntregaProgresso $progresso): void
    {
        Log::info('Agendamento de exportação para PlanoEntregaEntregaProgresso ID '.$progresso->id);
        if (!tenancy()->initialized) {
            Log::warning('Tentativa de agendar envio de plano de entrega sem tenant inicializado');
            return;
        }

        try{
            PlanoEntregaEnvioService::processar(tenant('id'), $progresso->planoEntregaEntrega->planoEntrega, 'PlanoEntregaEntregaProgresso');
        }catch(EnvioNaoAgendadoException $e) {
            Log::info("Envio do PE #{$progresso->planoEntregaEntrega->planoEntrega->id} não agendado: " . $e->getMessage());
        }

    }
}
