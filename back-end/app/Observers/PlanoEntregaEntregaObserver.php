<?php

namespace App\Observers;

use App\Models\PlanoEntregaEntrega;
use App\Services\API_PGD\PlanoEntregaEnvioService;
use Illuminate\Support\Facades\Log;

class PlanoEntregaEntregaObserver
{
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

        PlanoEntregaEnvioService::processar(tenant('id'), $planoEntregaEntrega->planoEntrega);
    }
}
