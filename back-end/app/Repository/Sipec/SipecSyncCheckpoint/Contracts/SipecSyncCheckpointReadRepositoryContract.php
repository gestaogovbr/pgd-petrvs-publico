<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecSyncCheckpoint\Contracts;

use App\Models\SipecSyncCheckpoint;

interface SipecSyncCheckpointReadRepositoryContract
{
    public function findByTenantId(?string $tenantId): ?SipecSyncCheckpoint;
}
