<?php

declare(strict_types=1);

namespace App\Repository\TipoObjetivo\Contracts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @see \App\Repository\TipoObjetivo\Eloquent\EloquentTipoObjetivoReadRepository
 */
interface TipoObjetivoReadRepositoryContract
{
    /** @return \App\Models\TipoObjetivo|null */
    public function findById(string|int $id): ?Model;

    /** @return Collection<int, \App\Models\TipoObjetivo> */
    public function getAll(): Collection;
}
