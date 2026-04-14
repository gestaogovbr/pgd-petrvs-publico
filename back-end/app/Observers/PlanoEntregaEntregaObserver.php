<?php

namespace App\Observers;

use App\Models\PlanoEntregaEntrega;
use App\Services\API_PGD\PlanoEntregaEnvioService;
use Illuminate\Support\Facades\Log;
use App\Exceptions\EnvioNaoAgendadoException;
class PlanoEntregaEntregaObserver
{
    public $afterCommit = true;

    public function __construct()
    {
        if (app()->environment('testing')) {
            $this->afterCommit = false;
        }
    }

    public function created(PlanoEntregaEntrega $planoEntregaEntrega): void
    {
        $this->scheduleExport($planoEntregaEntrega);
    }

    public function updated(PlanoEntregaEntrega $planoEntregaEntrega): void
    {
        $this->scheduleExport($planoEntregaEntrega);
    }

    public function deleted(PlanoEntregaEntrega $planoEntregaEntrega): void
    {
        $this->scheduleExport($planoEntregaEntrega);
    }

    public function scheduleExport(PlanoEntregaEntrega $planoEntregaEntrega): void
    {
        if (!tenancy()->initialized) {
            Log::warning('Tentativa de agendar envio de plano de entrega sem tenant inicializado');
            return;
        }

        try{
            PlanoEntregaEnvioService::processar(tenant('id'), $planoEntregaEntrega->planoEntrega, 'PlanoEntregaEntrega');
        }catch(EnvioNaoAgendadoException $e) {
            Log::info("Envio do PE #{$planoEntregaEntrega->planoEntrega->id} não agendado: " . $e->getMessage());
        }
    }
}
