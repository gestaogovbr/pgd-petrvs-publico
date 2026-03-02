<?php

namespace App\Repository\PlanoTrabalho\Eloquent;

use App\Models\PlanoTrabalho;
use App\Enums\StatusEnum;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class EloquentPlanoTrabalhoReadRepository implements PlanoTrabalhoReadRepositoryContract
{
    public function getPlanosTrabalhoAssinatura(array $unidadesIds, string $usuarioId): Collection
    {
        return PlanoTrabalho::where('status', StatusEnum::AGUARDANDO_ASSINATURA->value)
            ->whereIn('unidade_id', $unidadesIds)
            ->where('usuario_id', '!=', $usuarioId)
            ->with(['usuario:id,nome,apelido,url_foto'])
            ->get();
    }
}
