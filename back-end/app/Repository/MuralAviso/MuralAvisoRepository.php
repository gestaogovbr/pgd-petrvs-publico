<?php

declare(strict_types=1);

namespace App\Repository\MuralAviso;

use App\Models\MuralAviso;
use App\Repository\MuralAviso\Contracts\MuralAvisoReadRepositoryContract;
use App\Repository\MuralAviso\Contracts\MuralAvisoWriteRepositoryContract;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MuralAvisoRepository
{
    public function __construct(
        private readonly MuralAvisoReadRepositoryContract $readRepository,
        private readonly MuralAvisoWriteRepositoryContract $writeRepository,
    ) {}

    public function findById(string $id): ?MuralAviso
    {
        return $this->readRepository->findById($id);
    }

    /**
     * @param list<string> $tenantIds
     */
    public function paginateForPainel(array $tenantIds, int $perPage): LengthAwarePaginator
    {
        return $this->readRepository->paginateForPainel($tenantIds, $perPage);
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function findPendentes(string $tenantId, ?\DateTimeInterface $dataConfirmacao): array
    {
        return $this->readRepository->findPendentes($tenantId, $dataConfirmacao);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): MuralAviso
    {
        return $this->writeRepository->create($attributes);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string $id, array $attributes): ?MuralAviso
    {
        return $this->writeRepository->update($id, $attributes);
    }

    public function delete(string $id): bool
    {
        return $this->writeRepository->delete($id);
    }
}
