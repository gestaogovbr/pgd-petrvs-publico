<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntregaEntrega\Eloquent;

use App\Models\PlanoEntregaEntrega;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\PlanoEntregaEntrega\Contracts\PlanoEntregaEntregaWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<PlanoEntregaEntrega>
 */
class EloquentPlanoEntregaEntregaWriteRepository extends AbstractEloquentWriteRepository implements PlanoEntregaEntregaWriteRepositoryContract
{
    public function __construct(PlanoEntregaEntrega $model)
    {
        $this->model = $model;
    }
}