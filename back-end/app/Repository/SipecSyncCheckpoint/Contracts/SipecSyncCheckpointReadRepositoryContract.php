<?php

declare(strict_types=1);

namespace App\Repository\SipecSyncCheckpoint\Contracts;

use Illuminate\Database\Eloquent\Model;

interface SipecSyncCheckpointReadRepositoryContract
{
    /**
     * @return Model|null
     */
    public function findByTenantId(?string $tenantId): ?Model;
}
