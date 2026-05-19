<?php

declare(strict_types=1);

namespace App\Repository\Tenant\Eloquent;

use App\Models\Tenant;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Tenant\Contracts\TenantWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<Tenant>
 */
class EloquentTenantWriteRepository extends AbstractEloquentWriteRepository implements TenantWriteRepositoryContract
{
    public function __construct(Tenant $model)
    {
        $this->model = $model;
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): Tenant
    {
        /** @var Tenant $tenant */
        $tenant = parent::create($attributes);

        return $tenant;
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string|int $id, array $attributes): ?Tenant
    {
        /** @var Tenant|null $tenant */
        $tenant = parent::update($id, $attributes);

        return $tenant;
    }

    public function delete(string|int $id): bool
    {
        return parent::delete($id);
    }
}
