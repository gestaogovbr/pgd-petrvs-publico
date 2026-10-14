<?php

declare(strict_types=1);

namespace App\Repository\MuralAviso\Eloquent;

use App\Enums\MuralAvisoDestinatario;
use App\Enums\MuralAvisoRemetenteTipo;
use App\Models\MuralAviso;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\MuralAviso\Contracts\MuralAvisoReadRepositoryContract;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EloquentMuralAvisoReadRepository extends AbstractEloquentReadRepository implements MuralAvisoReadRepositoryContract
{
    public function __construct(MuralAviso $model)
    {
        $this->model = $model;
    }

    public function findById(string|int $id): ?MuralAviso
    {
        /** @var MuralAviso|null */
        return parent::findById($id);
    }

    /**
     * @param list<string> $tenantIds
     */
    public function paginateForPainel(array $tenantIds, int $perPage): LengthAwarePaginator
    {
        $query = $this->query()
            ->with(['tenant', 'publicadoPor'])
            ->orderBy('data_publicacao', 'desc');

        if ($tenantIds !== []) {
            $query->whereIn('tenant_id', $tenantIds)
                  ->where('remetente_tipo', MuralAvisoRemetenteTipo::TENANT->value);
        }

        return $query->paginate($perPage);
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function findVigentes(string $tenantId): array
    {
        return $this->query()
            ->where(function ($q) use ($tenantId) {
                $q->where('destinatario', MuralAvisoDestinatario::TODOS->value)
                  ->orWhere('tenant_id', $tenantId);
            })
            ->where('data_publicacao', '<=', now())
            ->where('data_expiracao', '>=', now())
            ->orderByRaw("remetente_tipo = ? desc", [MuralAvisoRemetenteTipo::ORGAO_CENTRAL->value])
            ->orderBy('data_publicacao', 'desc')
            ->get()
            ->toArray();
    }

    public function countByEmissorNoMes(
        string $remetenteTipo,
        ?string $remetenteTenantId,
        int $ano,
        int $mes,
        ?string $ignorarAvisoId = null,
    ): int {
        $query = $this->query()
            ->where('remetente_tipo', $remetenteTipo)
            ->whereYear('data_publicacao', $ano)
            ->whereMonth('data_publicacao', $mes);

        if ($remetenteTenantId === null) {
            $query->whereNull('remetente_tenant_id');
        }

        if ($remetenteTenantId !== null) {
            $query->where('remetente_tenant_id', $remetenteTenantId);
        }

        if ($ignorarAvisoId !== null) {
            $query->where('id', '!=', $ignorarAvisoId);
        }

        return $query->count();
    }
}
