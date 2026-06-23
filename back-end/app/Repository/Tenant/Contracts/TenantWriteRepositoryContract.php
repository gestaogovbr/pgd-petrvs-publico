<?php

declare(strict_types=1);

namespace App\Repository\Tenant\Contracts;

use App\Models\Tenant;

/**
 * @see \App\Repository\Tenant\Eloquent\EloquentTenantWriteRepository
 */
interface TenantWriteRepositoryContract
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): Tenant;

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string|int $id, array $attributes): ?Tenant;

    public function delete(string|int $id): bool;
}
