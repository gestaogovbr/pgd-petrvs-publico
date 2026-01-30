<?php

namespace App\Observers;

use App\Models\PlanoEntrega;
use App\Services\API_PGD\PlanoEntregaEnvioService;
use Illuminate\Support\Facades\Log;

class PlanoEntregaObserver
{
    public function updated(PlanoEntrega $planoEntrega): void
    {
        if (!tenancy()->initialized) {
            Log::warning('Tentativa de agendar envio de plano de entrega sem tenant inicializado');
            return;
        }

        PlanoEntregaEnvioService::processar(tenant('id'), $planoEntrega, 'PlanoEntrega');
    }
}
