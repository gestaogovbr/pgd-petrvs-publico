<?php

declare(strict_types=1);

namespace App\Repository\Atividade\Eloquent;

use App\Models\Atividade;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Atividade\Contracts\AtividadeReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<Atividade>
 */
class EloquentAtividadeReadRepository extends AbstractEloquentReadRepository implements AtividadeReadRepositoryContract
{
    public function __construct(Atividade $model)
    {
        $this->model = $model;
    }
}