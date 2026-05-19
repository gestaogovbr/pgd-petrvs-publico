<?php

declare(strict_types=1);

namespace App\Repository\Atividade\Eloquent;

use App\Models\Atividade;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Atividade\Contracts\AtividadeReadRepositoryContract;
use Illuminate\Support\Collection;

class EloquentAtividadeReadRepository extends AbstractEloquentReadRepository implements AtividadeReadRepositoryContract
{
    public function __construct(Atividade $model)
    {
        $this->model = $model;
    }

    public function entregaIdsComAtividade(string $consolidacaoId): Collection
    {
        return $this->query()
            ->where('plano_trabalho_consolidacao_id', $consolidacaoId)
            ->distinct()
            ->pluck('plano_trabalho_entrega_id');
    }

    public function findWithPlanoTrabalho(string|int $id): ?Atividade
    {
        /** @var Atividade|null $atividade */
        $atividade = $this->query()
            ->with(['planoTrabalho'])
            ->where('id', $id)
            ->first();

        return $atividade;
    }
}
