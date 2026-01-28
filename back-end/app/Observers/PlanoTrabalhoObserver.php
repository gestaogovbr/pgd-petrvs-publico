<?php

namespace App\Observers;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Jobs\Envio\ExportarPlanoEntregaJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Log;

class PlanoTrabalhoObserver
{
    public function created(PlanoTrabalho $planoTrabalho): void
    {
    }

    public function updated(PlanoTrabalho $planoTrabalho): void
    {
        if (!tenancy()->initialized) {
            Log::warning('Tentativa de agendar envio de plano de trabalho sem tenant inicializado');
            return;
        }

        PlanoTrabalhoEnvioService::processar(tenant('id'), $planoTrabalho);
    }
}
