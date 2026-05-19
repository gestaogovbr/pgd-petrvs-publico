<?php

declare(strict_types=1);

namespace App\Repository\UnidadeIntegrante\Eloquent;

use App\Models\UnidadeIntegrante;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<UnidadeIntegrante>
 */
class EloquentUnidadeIntegranteWriteRepository extends AbstractEloquentWriteRepository implements UnidadeIntegranteWriteRepositoryContract
{
    public function __construct(UnidadeIntegrante $model)
    {
        $this->model = $model;
    }
}