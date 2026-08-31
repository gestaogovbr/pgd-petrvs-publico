<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntregaEntrega\Eloquent;

use App\Models\PlanoEntregaEntrega;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanoEntregaEntrega\Contracts\PlanoEntregaEntregaReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<PlanoEntregaEntrega>
 */
class EloquentPlanoEntregaEntregaReadRepository extends AbstractEloquentReadRepository implements PlanoEntregaEntregaReadRepositoryContract
{
    public function __construct(PlanoEntregaEntrega $model)
    {
        $this->model = $model;
    }
}