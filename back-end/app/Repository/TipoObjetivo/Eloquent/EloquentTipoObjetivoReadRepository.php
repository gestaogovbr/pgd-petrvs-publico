<?php

declare(strict_types=1);

namespace App\Repository\TipoObjetivo\Eloquent;

use App\Models\TipoObjetivo;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\TipoObjetivo\Contracts\TipoObjetivoReadRepositoryContract;
use Illuminate\Support\Collection;

/**
 * @extends AbstractEloquentReadRepository<TipoObjetivo>
 */
class EloquentTipoObjetivoReadRepository extends AbstractEloquentReadRepository implements TipoObjetivoReadRepositoryContract
{
    public function __construct(TipoObjetivo $model)
    {
        $this->model = $model;
    }

    /** @return Collection<int, TipoObjetivo> */
    public function getAll(): Collection
    {
        /** @var Collection<int, TipoObjetivo> */
        return $this->query()->orderBy('nome')->get();
    }
}
