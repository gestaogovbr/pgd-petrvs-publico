<?php

declare(strict_types=1);

namespace App\Repository\Unidade\Eloquent;

use App\Models\Unidade;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<Unidade>
 */
class EloquentUnidadeReadRepository extends AbstractEloquentReadRepository implements UnidadeReadRepositoryContract
{
    public function __construct(Unidade $model)
    {
        $this->model = $model;
    }
}