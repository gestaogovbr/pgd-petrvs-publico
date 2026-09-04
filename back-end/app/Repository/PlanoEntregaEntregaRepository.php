<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\PlanoEntregaEntrega;
use App\Repository\PlanoEntregaEntrega\Contracts\PlanoEntregaEntregaReadRepositoryContract;
use App\Repository\PlanoEntregaEntrega\Contracts\PlanoEntregaEntregaWriteRepositoryContract;

class PlanoEntregaEntregaRepository
{
    public function __construct(
        private readonly PlanoEntregaEntregaReadRepositoryContract $readRepository,
        private readonly PlanoEntregaEntregaWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findById(string $id): ?PlanoEntregaEntrega
    {
        /** @var PlanoEntregaEntrega|null */
        return $this->readRepository->findById($id);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string $id, array $attributes): ?PlanoEntregaEntrega
    {
        /** @var PlanoEntregaEntrega|null */
        return $this->writeRepository->update($id, $attributes);
    }
}
