<?php

namespace App\Listeners;

use App\Events\UnidadeAutorizadoraAlteradaEvent;
use App\Jobs\AtualizarCodUnidadeAutorizadoraJob;

class EnfileirarMudancaUnidadeAutorizadora
{
    public function handle(UnidadeAutorizadoraAlteradaEvent $event): void
    {
        AtualizarCodUnidadeAutorizadoraJob::dispatch(
            $event->tenantId,
            $event->codUnidadeAutorizadora,
            $event->somenteSemCodigo,
        );
    }
}
