<?php

namespace App\Observers;

use App\Models\PlanoEntregaEntregaProgresso;
use App\Services\API_PGD\PlanoEntregaEnvioService;
use Illuminate\Support\Facades\Log;

class PlanoEntregaEntregaProgressoObserver
{
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

        PlanoEntregaEnvioService::processar(tenant('id'), $progresso->planoEntregaEntrega->planoEntrega, 'PlanoEntregaEntregaProgresso');
    }
}
