<?php

namespace App\Observers;

use App\Jobs\Envio\ExportarPlanoEntregaJob;
use App\Models\PlanoEntrega;
use Carbon\Carbon;

class PlanoEntregaObserver
{
    public function created(PlanoEntrega $planoEntrega): void
    {
    }

    public function updated(PlanoEntrega $planoEntrega): void
    {
         if ($planoEntrega->programa
            && $planoEntrega->unidade 
            && $planoEntrega->programa->unidade
            && $planoEntrega->isEmStatusParaEnvio()
        ) {
            $planoEntrega->data_agendamento_envio = Carbon::now();
            $planoEntrega->saveQuietly();

            ExportarPlanoEntregaJob::dispatch(
                tenant('id'),
                $planoEntrega->id,
                $planoEntrega->data_agendamento_envio
            )->onConnection('rabbitmq')->onQueue('pgd_queue');
        }
    }
}
