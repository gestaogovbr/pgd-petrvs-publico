<?php

declare(strict_types=1);

namespace App\Repository\Entidade\Eloquent;

use App\Models\Entidade;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Entidade\Contracts\EntidadeWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<Entidade>
 */
class EloquentEntidadeWriteRepository extends AbstractEloquentWriteRepository implements EntidadeWriteRepositoryContract
{
    public function __construct(Entidade $model)
    {
        $this->model = $model;
    }
}