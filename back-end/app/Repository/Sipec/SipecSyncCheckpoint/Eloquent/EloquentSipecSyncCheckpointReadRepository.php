<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecSyncCheckpoint\Eloquent;

use App\Models\SipecSyncCheckpoint;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Sipec\SipecSyncCheckpoint\Contracts\SipecSyncCheckpointReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<SipecSyncCheckpoint>
 */
final class EloquentSipecSyncCheckpointReadRepository extends AbstractEloquentReadRepository implements SipecSyncCheckpointReadRepositoryContract
{
    public function __construct(SipecSyncCheckpoint $model)
    {
        $this->model = $model;
    }

    public function findByTenantId(?string $tenantId): ?SipecSyncCheckpoint
    {
        /** @var SipecSyncCheckpoint|null $checkpoint */
        $checkpoint = $this->query()->where('tenant_id', $tenantId)->first();

        return $checkpoint;
    }
}
