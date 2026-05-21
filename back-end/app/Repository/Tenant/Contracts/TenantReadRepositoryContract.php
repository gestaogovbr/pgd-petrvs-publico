<?php

declare(strict_types=1);

namespace App\Repository\Tenant\Contracts;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Collection;

/**
 * @see \App\Repository\Tenant\Eloquent\EloquentTenantReadRepository
 */
interface TenantReadRepositoryContract
{
    public function findById(string|int $id, array $with = []): ?Tenant;

    public function findOrFail(string|int $id): Tenant;

    /**
     * @return Collection<int, Tenant>
     */
    public function findAll(): Collection;
}
