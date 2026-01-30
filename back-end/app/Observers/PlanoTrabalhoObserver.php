<?php

namespace App\Observers;

use App\Models\PlanoTrabalho;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
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

        PlanoTrabalhoEnvioService::processar(tenant('id'), $planoTrabalho, 'PlanoTrabalho');
    }
}
