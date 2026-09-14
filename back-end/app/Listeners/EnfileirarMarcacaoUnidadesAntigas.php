<?php

namespace App\Listeners;

use App\Events\CodigoOrgaoAlterado;
use App\Jobs\MarcarUnidadesAntigasJob;

class EnfileirarMarcacaoUnidadesAntigas
{
    public function handle(CodigoOrgaoAlterado $event): void
    {
        MarcarUnidadesAntigasJob::dispatch(
            $event->tenantId,
            $event->codigoAnterior,
            $event->codigoNovo,
        );
    }
}
