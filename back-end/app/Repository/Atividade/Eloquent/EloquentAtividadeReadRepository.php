<?php

declare(strict_types=1);

namespace App\Repository\Atividade\Eloquent;

use App\Models\Atividade;
use App\Repository\Atividade\Contracts\AtividadeReadRepositoryContract;
use App\Repository\Eloquent\AbstractEloquentReadRepository;

class EloquentAtividadeReadRepository extends AbstractEloquentReadRepository implements AtividadeReadRepositoryContract
{
    public function __construct(Atividade $model)
    {
        $this->model = $model;
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
