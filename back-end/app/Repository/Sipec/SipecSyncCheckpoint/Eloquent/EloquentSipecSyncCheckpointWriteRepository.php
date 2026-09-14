<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecSyncCheckpoint\Eloquent;

use App\Models\SipecSyncCheckpoint;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Sipec\SipecSyncCheckpoint\Contracts\SipecSyncCheckpointWriteRepositoryContract;
use Illuminate\Database\Eloquent\Model;

final class EloquentSipecSyncCheckpointWriteRepository extends AbstractEloquentWriteRepository implements SipecSyncCheckpointWriteRepositoryContract
{
    public function __construct(SipecSyncCheckpoint $model)
    {
        $this->model = $model;
    }

    /**
     * @return SipecSyncCheckpoint
     */
    public function firstOrCreateByTenantId(?string $tenantId, string $etapa, int $ultimaPagina): Model
    {
        return $this->model->newQuery()->firstOrCreate(
            ['tenant_id' => $tenantId],
            ['etapa' => $etapa, 'ultima_pagina' => $ultimaPagina]
        );
    }

    /**
     * @return SipecSyncCheckpoint|null
     */
    public function updateByTenantId(?string $tenantId, string $etapa, int $ultimaPagina, ?int $totalPaginas): ?Model
    {
        $checkpoint = $this->model->newQuery()->where('tenant_id', $tenantId)->first();

        if ($checkpoint === null) {
            return null;
        }

        $checkpoint->fill([
            'etapa' => $etapa,
            'ultima_pagina' => $ultimaPagina,
            'total_paginas' => $totalPaginas,
        ]);
        $checkpoint->save();

        return $checkpoint;
    }

    public function deleteByTenantId(?string $tenantId): bool
    {
        return (bool) $this->model->newQuery()->where('tenant_id', $tenantId)->delete();
    }
}
