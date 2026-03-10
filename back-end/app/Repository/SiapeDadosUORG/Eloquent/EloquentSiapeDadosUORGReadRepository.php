<?php

declare(strict_types=1);

namespace App\Repository\SiapeDadosUORG\Eloquent;

use App\Models\SiapeDadosUORG;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SiapeDadosUORG\Contracts\SiapeDadosUORGReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<SiapeDadosUORG>
 */
class EloquentSiapeDadosUORGReadRepository extends AbstractEloquentReadRepository implements SiapeDadosUORGReadRepositoryContract
{
    public function __construct(SiapeDadosUORG $model)
    {
        $this->model = $model;
    }
}