<?php

namespace App\Observers;

use App\Models\Unidade;
use App\Services\UnidadeExecutoraHistoricoService;
use Carbon\Carbon;

class UnidadeObserver
{
    public function created(Unidade $unidade): void
    {
        if (app()->environment('testing') || ! tenancy()->initialized) {
            return;
        }

        app(UnidadeExecutoraHistoricoService::class)->registrarCriacao($unidade);
    }

    public function updating(Unidade $unidade): void
    {
        if (
            app()->environment('testing')
            || ! tenancy()->initialized
            || ! $unidade->isDirty('executora')
        ) {
            return;
        }

        $dataInicioNovo = Carbon::today()->toDateString();
        $dataFimAnterior = Carbon::today()->subDay()->toDateString();

        app(UnidadeExecutoraHistoricoService::class)->registrarAlteracaoExecutora(
            $unidade,
            (bool) $unidade->getOriginal('executora'),
            $dataInicioNovo,
            $dataFimAnterior,
        );
    }
}
