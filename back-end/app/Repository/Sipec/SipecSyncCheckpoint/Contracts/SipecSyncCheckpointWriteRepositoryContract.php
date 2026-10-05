<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecSyncCheckpoint\Contracts;

use App\Models\SipecSyncCheckpoint;

interface SipecSyncCheckpointWriteRepositoryContract
{
    public function firstOrCreateByTenantId(?string $tenantId, string $etapa, int $ultimaPagina): SipecSyncCheckpoint;

    public function updateByTenantId(?string $tenantId, string $etapa, int $ultimaPagina, ?int $totalPaginas): ?SipecSyncCheckpoint;

    public function deleteByTenantId(?string $tenantId): bool;
}
