<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntregaEntregaProgresso\Contracts;

use App\Models\PlanoEntregaEntregaProgresso;

/**
 * @see \App\Repository\PlanoEntregaEntregaProgresso\Eloquent\EloquentPlanoEntregaEntregaProgressoReadRepository
 */
interface PlanoEntregaEntregaProgressoReadRepositoryContract
{
    public function findLatestByEntregaId(string $entregaId): ?PlanoEntregaEntregaProgresso;
}
