<?php

declare(strict_types=1);

namespace App\Repository\TipoPlanejamentoObjetivo\Contracts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @see \App\Repository\TipoPlanejamentoObjetivo\Eloquent\EloquentTipoPlanejamentoObjetivoReadRepository
 */
interface TipoPlanejamentoObjetivoReadRepositoryContract
{
    /** @return \App\Models\TipoPlanejamentoObjetivo|null */
    public function findById(string|int $id): ?Model;

    /** @return Collection<int, \App\Models\TipoPlanejamentoObjetivo> */
    public function getAll(): Collection;
}
