<?php

declare(strict_types=1);

namespace App\Repository\SipecSyncCheckpoint\Eloquent;

use App\Models\SipecSyncCheckpoint;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SipecSyncCheckpoint\Contracts\SipecSyncCheckpointReadRepositoryContract;
use Illuminate\Database\Eloquent\Model;

final class EloquentSipecSyncCheckpointReadRepository extends AbstractEloquentReadRepository implements SipecSyncCheckpointReadRepositoryContract
{
    public function __construct(SipecSyncCheckpoint $model)
    {
        $this->model = $model;
    }

    /**
     * @return SipecSyncCheckpoint|null
     */
    public function findByTenantId(?string $tenantId): ?Model
    {
        return $this->query()->where('tenant_id', $tenantId)->first();
    }
}
