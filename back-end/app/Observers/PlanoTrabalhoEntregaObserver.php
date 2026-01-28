<?php

namespace App\Observers;

use App\Models\PlanoTrabalhoEntrega;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Log;

class PlanoTrabalhoEntregaObserver
{
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

        PlanoTrabalhoEnvioService::processar(tenant('id'), $planoTrabalhoEntrega->planoEntrega);
    }
}
