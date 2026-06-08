<?php

declare(strict_types=1);

namespace App\Repository\TipoPlanejamentoObjetivo\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\TipoPlanejamentoObjetivo\Eloquent\EloquentTipoPlanejamentoObjetivoWriteRepository
 */
interface TipoPlanejamentoObjetivoWriteRepositoryContract
{
    /** @return \App\Models\TipoPlanejamentoObjetivo */
    public function create(array $attributes): Model;

    /** @return \App\Models\TipoPlanejamentoObjetivo|null */
    public function update(string|int $id, array $attributes): ?Model;

    public function delete(string|int $id): bool;
}
