<?php

declare(strict_types=1);

namespace App\Repository\Sipec;

use App\Models\SipecSyncCheckpoint;
use App\Repository\Sipec\SipecSyncCheckpoint\Contracts\SipecSyncCheckpointReadRepositoryContract;
use App\Repository\Sipec\SipecSyncCheckpoint\Contracts\SipecSyncCheckpointWriteRepositoryContract;

class SipecSyncCheckpointRepository
{
    public function __construct(
        private readonly SipecSyncCheckpointReadRepositoryContract $readRepository,
        private readonly SipecSyncCheckpointWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findByTenantId(?string $tenantId): ?SipecSyncCheckpoint
    {
        return $this->readRepository->findByTenantId($tenantId);
    }

    public function firstOrCreateByTenantId(?string $tenantId, string $etapa = 'unidades', int $ultimaPagina = 0): SipecSyncCheckpoint
    {
        return $this->writeRepository->firstOrCreateByTenantId($tenantId, $etapa, $ultimaPagina);
    }

    public function updateByTenantId(?string $tenantId, string $etapa, int $ultimaPagina, ?int $totalPaginas = null): ?SipecSyncCheckpoint
    {
        return $this->writeRepository->updateByTenantId($tenantId, $etapa, $ultimaPagina, $totalPaginas);
    }

    public function deleteByTenantId(?string $tenantId): bool
    {
        return $this->writeRepository->deleteByTenantId($tenantId);
    }
}
