<?php

declare(strict_types=1);

namespace App\Repository\TipoObjetivo\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\TipoObjetivo\Eloquent\EloquentTipoObjetivoWriteRepository
 */
interface TipoObjetivoWriteRepositoryContract
{
    /** @return \App\Models\TipoObjetivo */
    public function create(array $attributes): Model;

    /** @return \App\Models\TipoObjetivo|null */
    public function update(string|int $id, array $attributes): ?Model;

    public function delete(string|int $id): bool;
}
