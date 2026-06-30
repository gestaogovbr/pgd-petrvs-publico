<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\SipecSyncCheckpoint\Contracts\SipecSyncCheckpointReadRepositoryContract;
use App\Repository\SipecSyncCheckpoint\Contracts\SipecSyncCheckpointWriteRepositoryContract;
use Illuminate\Database\Eloquent\Model;

class SipecSyncCheckpointRepository
{
    public function __construct(
        private readonly SipecSyncCheckpointReadRepositoryContract $readRepository,
        private readonly SipecSyncCheckpointWriteRepositoryContract $writeRepository,
    ) {
    }

    /**
     * @return Model|null
     */
    public function findByTenantId(?string $tenantId): ?Model
    {
        return $this->readRepository->findByTenantId($tenantId);
    }

    /**
     * @return Model
     */
    public function firstOrCreateByTenantId(?string $tenantId, string $etapa = 'unidades', int $ultimaPagina = 0): Model
    {
        return $this->writeRepository->firstOrCreateByTenantId($tenantId, $etapa, $ultimaPagina);
    }

    /**
     * @return Model|null
     */
    public function updateByTenantId(?string $tenantId, string $etapa, int $ultimaPagina, ?int $totalPaginas = null): ?Model
    {
        return $this->writeRepository->updateByTenantId($tenantId, $etapa, $ultimaPagina, $totalPaginas);
    }

    public function deleteByTenantId(?string $tenantId): bool
    {
        return $this->writeRepository->deleteByTenantId($tenantId);
    }
}
