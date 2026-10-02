<?php

declare(strict_types=1);

namespace App\Repository\SiapeListaUORGS\Eloquent;

use App\Models\SiapeListaUORGS;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SiapeListaUORGS\Contracts\SiapeListaUORGSReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<SiapeListaUORGS>
 */
class EloquentSiapeListaUORGSReadRepository extends AbstractEloquentReadRepository implements SiapeListaUORGSReadRepositoryContract
{
    public function __construct(SiapeListaUORGS $model)
    {
        $this->model = $model;
    }

    public function findUnprocessed(string $codigoOrgao): ?SiapeListaUORGS
    {
        /** @var SiapeListaUORGS|null $model */
        $model = $this->model->newQuery()
            ->where('codigo_orgao', $codigoOrgao)
            ->where('processado', 0)
            ->orderBy('updated_at', 'desc')
            ->first();
            
        return $model;
    }

    public function findLatestProcessed(string $codigoOrgao): ?SiapeListaUORGS
    {
        return $this->model->newQuery()
            ->where('codigo_orgao', $codigoOrgao)
            ->where('processado', true)
            ->orderByDesc('updated_at')
            ->first();
    }
}
