<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Tenant;
use App\Repository\Tenant\Contracts\TenantReadRepositoryContract;
use App\Repository\Tenant\Contracts\TenantWriteRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class TenantRepository
{
    public function __construct(
        private readonly TenantReadRepositoryContract $readRepository,
        private readonly TenantWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findById(string|int $id, array $with = []): ?Tenant
    {
        return $this->readRepository->findById($id, $with);
    }

    public function findOrFail(string|int $id): Tenant
    {
        return $this->readRepository->findOrFail($id);
    }

    /**
     * @return Collection<int, Tenant>
     */
    public function findAll(): Collection
    {
        return $this->readRepository->findAll();
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): Tenant
    {
        return $this->writeRepository->create($attributes);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string|int $id, array $attributes): ?Tenant
    {
        return $this->writeRepository->update($id, $attributes);
    }

    public function delete(string|int $id): bool
    {
        return $this->writeRepository->delete($id);
    }
}
