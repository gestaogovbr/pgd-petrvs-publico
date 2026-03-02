<?php

namespace App\Repository\PlanoEntrega\Eloquent;

use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Enums\StatusEnum;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class EloquentPlanoEntregaReadRepository implements PlanoEntregaReadRepositoryContract
{
    public function getPlanosEntregaAvaliacao(array $unidadesIds): Collection
    {
        return PlanoEntrega::where('status', StatusEnum::CONCLUIDO->value)
            ->whereIn('unidade_id', $unidadesIds)
            ->with(['unidade:id,sigla,nome'])
            ->get();
    }

    public function getPlanosEntregaHomologacao(array $unidadesIds): Collection
    {
        return PlanoEntrega::where('status', StatusEnum::HOMOLOGANDO->value)
            ->whereIn('unidade_id', $unidadesIds)
            ->with(['unidade:id,sigla,nome'])
            ->get();
    }

    public function getEntregasPlanoEntregaHomologacao(array $unidadesIds): Collection
    {
        return PlanoEntregaEntrega::where('homologado', false)
            ->where('realizado', '>', 0)
            ->whereHas('planoEntrega', function($q) use ($unidadesIds) {
                $q->whereIn('unidade_id', $unidadesIds)
                  ->where('status', StatusEnum::ATIVO->value);
            })
            ->with(['planoEntrega.unidade:id,sigla,nome', 'entrega:id,nome'])
            ->get();
    }
}
