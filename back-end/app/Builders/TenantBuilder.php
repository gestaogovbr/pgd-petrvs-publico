<?php

namespace App\Builders;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;
use Stancl\Tenancy\Resolvers\RequestDataTenantResolver;

class TenantBuilder extends Builder
{

    public function where($column, $operator = null, $value = null, $boolean = 'and'): static
    {
        return parent::where($column, $operator, $value, $boolean);
    }

    /**
     * @param array<int, string>|string $columns
     */
    public function first($columns = ['*']): ?Tenant
    {
        $wheres = $this->getQuery()->wheres;

        if (count($wheres) === 1 && $this->isTenantKeyWhere($wheres[0])) {
            $tenantId = $wheres[0]['value'];
            $cached   = $this->getFromCache((string) $tenantId);

            if ($cached instanceof Tenant) {
                return $cached;
            }

            $tenant = parent::first($columns);

            if ($tenant instanceof Tenant) {
                $this->putInCache((string) $tenantId, $tenant);

                return $tenant;
            }

            return null;
        }

        $tenant = parent::first($columns);

        return $tenant instanceof Tenant ? $tenant : null;
    }

    private function isTenantKeyWhere(array $where): bool
    {
        $model = $this->getModel();
        if (!$model instanceof Tenant) {
            return false;
        }

        $key = $model->getTenantKeyName();

        return ($where['type'] ?? '') === 'Basic'
            && (($where['column'] ?? '') === $key || ($where['column'] ?? '') === $model->getTable() . '.' . $key)
            && ($where['operator'] ?? '') === '=';
    }

    private function getFromCache(string $tenantId): mixed
    {
        return Cache::store(RequestDataTenantResolver::$cacheStore)->get($this->cacheKey($tenantId));
    }

    private function putInCache(string $tenantId, mixed $tenant): void
    {
        Cache::store(RequestDataTenantResolver::$cacheStore)->put(
            $this->cacheKey($tenantId),
            $tenant,
            RequestDataTenantResolver::$cacheTTL
        );
    }

    private function cacheKey(string $tenantId): string
    {
        return app(RequestDataTenantResolver::class)->getCacheKey($tenantId);
    }
}
