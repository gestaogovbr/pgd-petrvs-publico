<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntregaEntrega\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\PlanoEntregaEntrega\Eloquent\EloquentPlanoEntregaEntregaWriteRepository
 */
interface PlanoEntregaEntregaWriteRepositoryContract
{
    /**
     * @param array<string, mixed> $attributes
     * @return \App\Models\PlanoEntregaEntrega|null
     */
    public function update(string|int $id, array $attributes): ?Model;
}
