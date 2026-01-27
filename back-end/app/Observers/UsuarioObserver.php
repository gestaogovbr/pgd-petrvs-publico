<?php

namespace App\Observers;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Models\Usuario;
use Carbon\Carbon;
use Illuminate\Support\Facades\Request;

class UsuarioObserver
{
    /**
     * Handle the Usuario "created" event.
     */
    public function created(Usuario $usuario): void
    {
    }

    /**
     * Handle the Usuario "updated" event.
     */
    public function updated(Usuario $usuario): void
    {
        $changes = $usuario->getChanges();

        foreach ($changes as $field => $newValue) {
            $originalValue = $usuario->getOriginal($field);
        }

        // Usuario precisa ter lotação, plano de trabalho e data de assinatura para exportação
        if ($usuario->lotacao  && $usuario->ultimoPlanoTrabalho && $usuario->ultimaAssinatura->data_assinatura) {
            $usuario->data_agendamento_envio = Carbon::now();
            $usuario->saveQuietly();

            ExportarParticipanteJob::dispatch(
                tenant('id'),
                $usuario->id
            )->onConnection('rabbitmq')->onQueue('pgd_queue');
        }
    }
}
