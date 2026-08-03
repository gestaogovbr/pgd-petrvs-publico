<?php

declare(strict_types=1);

namespace App\Repository\MuralAviso\Eloquent;

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
        $query = $this->query()->orderBy('data_publicacao', 'desc');

        if ($tenantIds !== []) {
            $query->where(function ($q) use ($tenantIds) {
                $q->whereIn('tenant_id', $tenantIds)
                  ->orWhere('destinatario', 'TODOS');
            });
        }

        return $query->paginate($perPage);
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function findPendentes(string $tenantId, ?\DateTimeInterface $dataConfirmacao): array
    {
        $query = $this->query()
            ->where(function ($q) use ($tenantId) {
                $q->where('destinatario', 'TODOS')
                  ->orWhere('tenant_id', $tenantId);
            })
            ->orderBy('data_publicacao', 'desc');

        if ($dataConfirmacao !== null) {
            $query->where('data_publicacao', '>', $dataConfirmacao);
        }

        return $query->get()->toArray();
    }
}
