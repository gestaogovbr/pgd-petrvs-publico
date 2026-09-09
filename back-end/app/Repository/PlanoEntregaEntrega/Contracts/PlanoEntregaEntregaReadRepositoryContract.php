<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntregaEntrega\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\PlanoEntregaEntrega\Eloquent\EloquentPlanoEntregaEntregaReadRepository
 */
interface PlanoEntregaEntregaReadRepositoryContract
{
    /**
     * @return \App\Models\PlanoEntregaEntrega|null
     */
    public function findById(string|int $id): ?Model;
}
