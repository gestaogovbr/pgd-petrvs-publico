<?php

namespace App\Observers;

use App\Models\PlanoEntrega;
use App\Services\API_PGD\PlanoEntregaEnvioService;
use Illuminate\Support\Facades\Log;
use App\Exceptions\EnvioNaoAgendadoException;

class PlanoEntregaObserver
{
    public $afterCommit = true;

    public function __construct()
    {
        if (app()->environment('testing')) {
            $this->afterCommit = false;
        }
    }

    public function updated(PlanoEntrega $planoEntrega): void
    {
        if (!tenancy()->initialized) {
            Log::warning('Tentativa de agendar envio de PE sem tenant inicializado');
            return;
        }

        try{
            PlanoEntregaEnvioService::processar(tenant('id'), $planoEntrega, 'PlanoEntrega');
        }catch(EnvioNaoAgendadoException $e) {
            Log::info("Envio do PE #{$planoEntrega->id} não agendado: " . $e->getMessage());
        }

    }
}
