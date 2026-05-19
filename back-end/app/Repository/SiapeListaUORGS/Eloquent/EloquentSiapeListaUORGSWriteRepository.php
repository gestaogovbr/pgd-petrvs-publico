<?php

declare(strict_types=1);

namespace App\Repository\SiapeListaUORGS\Eloquent;

use App\Models\SiapeListaUORGS;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\SiapeListaUORGS\Contracts\SiapeListaUORGSWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<SiapeListaUORGS>
 */
class EloquentSiapeListaUORGSWriteRepository extends AbstractEloquentWriteRepository implements SiapeListaUORGSWriteRepositoryContract
{
    public function __construct(SiapeListaUORGS $model)
    {
        $this->model = $model;
    }
}