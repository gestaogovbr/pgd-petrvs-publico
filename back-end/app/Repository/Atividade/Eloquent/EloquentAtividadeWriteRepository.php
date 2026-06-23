<?php

declare(strict_types=1);

namespace App\Repository\Atividade\Eloquent;

use App\Models\Atividade;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Atividade\Contracts\AtividadeWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<Atividade>
 */
class EloquentAtividadeWriteRepository extends AbstractEloquentWriteRepository implements AtividadeWriteRepositoryContract
{
    public function __construct(Atividade $model)
    {
        $this->model = $model;
    }
}