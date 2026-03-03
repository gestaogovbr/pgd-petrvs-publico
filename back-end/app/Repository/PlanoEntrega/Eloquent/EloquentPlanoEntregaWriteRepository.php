<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntrega\Eloquent;

use App\Models\PlanoEntrega;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<PlanoEntrega>
 */
class EloquentPlanoEntregaWriteRepository extends AbstractEloquentWriteRepository implements PlanoEntregaWriteRepositoryContract
{
    public function __construct(PlanoEntrega $model)
    {
        $this->model = $model;
    }
}
