<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\PlanoEntregaEntregaProgresso;
use App\Repository\PlanoEntregaEntregaProgresso\Contracts\PlanoEntregaEntregaProgressoReadRepositoryContract;

class PlanoEntregaEntregaProgressoRepository
{
    public function __construct(
        private readonly PlanoEntregaEntregaProgressoReadRepositoryContract $readRepository,
    ) {
    }

    public function findLatestByEntregaId(string $entregaId): ?PlanoEntregaEntregaProgresso
    {
        return $this->readRepository->findLatestByEntregaId($entregaId);
    }
}
