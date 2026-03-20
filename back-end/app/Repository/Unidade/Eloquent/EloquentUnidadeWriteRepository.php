<?php

declare(strict_types=1);

namespace App\Repository\Unidade\Eloquent;

use App\Models\Unidade;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Unidade\Contracts\UnidadeWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<Unidade>
 */
class EloquentUnidadeWriteRepository extends AbstractEloquentWriteRepository implements UnidadeWriteRepositoryContract
{
    public function __construct(Unidade $model)
    {
        $this->model = $model;
    }
}