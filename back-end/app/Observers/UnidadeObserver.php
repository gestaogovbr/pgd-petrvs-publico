<?php

namespace App\Observers;

use App\Models\Unidade;
use App\Services\UnidadeExecutoraHistoricoService;

class UnidadeObserver
{
    public function created(Unidade $unidade): void
    {
        if (! tenancy()->initialized) {
            return;
        }

        app(UnidadeExecutoraHistoricoService::class)->registrarCriacao($unidade);
    }

    public function updating(Unidade $unidade): void
    {
        if (! tenancy()->initialized || ! $unidade->isDirty('executora')) {
            return;
        }

        app(UnidadeExecutoraHistoricoService::class)->registrarAlteracaoExecutora(
            $unidade,
            (bool) $unidade->getOriginal('executora')
        );
    }
}
