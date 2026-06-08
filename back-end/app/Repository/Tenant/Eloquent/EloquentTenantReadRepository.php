<?php

declare(strict_types=1);

namespace App\Repository\Tenant\Eloquent;

use App\Models\Tenant;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Tenant\Contracts\TenantReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

/**
 * @extends AbstractEloquentReadRepository<Tenant>
 */
class EloquentTenantReadRepository extends AbstractEloquentReadRepository implements TenantReadRepositoryContract
{
    public function __construct(Tenant $model)
    {
        $this->model = $model;
    }

    public function findById(string|int $id, array $with = []): ?Tenant
    {
        $query = $this->query();
        if ($with !== []) {
            $query->with($with);
        }

        /** @var Tenant|null $tenant */
        $tenant = $query->find($id);

        return $tenant;
    }

    public function findOrFail(string|int $id): Tenant
    {
        /** @var Tenant $tenant */
        $tenant = $this->query()->findOrFail($id);

        return $tenant;
    }

    /**
     * @return Collection<int, Tenant>
     */
    public function findAll(): Collection
    {
        /** @var Collection<int, Tenant> $tenants */
        $tenants = $this->query()->get();

        return $tenants;
    }
}
