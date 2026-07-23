<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecSyncCheckpoint\Contracts;

use Illuminate\Database\Eloquent\Model;

interface SipecSyncCheckpointWriteRepositoryContract
{
    /**
     * @return Model
     */
    public function firstOrCreateByTenantId(?string $tenantId, string $etapa, int $ultimaPagina): Model;

    /**
     * @return Model|null
     */
    public function updateByTenantId(?string $tenantId, string $etapa, int $ultimaPagina, ?int $totalPaginas): ?Model;

    public function deleteByTenantId(?string $tenantId): bool;
}
