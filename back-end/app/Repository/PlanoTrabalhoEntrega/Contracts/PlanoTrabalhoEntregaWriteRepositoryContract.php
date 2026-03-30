<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoEntrega\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\PlanoTrabalhoEntrega\Eloquent\EloquentPlanoTrabalhoEntregaWriteRepository
 */
interface PlanoTrabalhoEntregaWriteRepositoryContract
{
    /** @return \App\Models\PlanoTrabalhoEntrega */
    public function create(array $attributes): Model;

    /** @return \App\Models\PlanoTrabalhoEntrega|null */
    public function update(string $id, array $attributes): ?Model;

    public function delete(string $id): bool;
}
