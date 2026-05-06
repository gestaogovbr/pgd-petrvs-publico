<?php

declare(strict_types=1);

namespace App\Repository\TipoObjetivo\Eloquent;

use App\Models\TipoObjetivo;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\TipoObjetivo\Contracts\TipoObjetivoWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<TipoObjetivo>
 */
class EloquentTipoObjetivoWriteRepository extends AbstractEloquentWriteRepository implements TipoObjetivoWriteRepositoryContract
{
    public function __construct(TipoObjetivo $model)
    {
        $this->model = $model;
    }
}
