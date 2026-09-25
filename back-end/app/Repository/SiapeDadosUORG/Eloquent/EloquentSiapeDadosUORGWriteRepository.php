<?php

declare(strict_types=1);

namespace App\Repository\SiapeDadosUORG\Eloquent;

use App\Models\SiapeDadosUORG;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\SiapeDadosUORG\Contracts\SiapeDadosUORGWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<SiapeDadosUORG>
 */
class EloquentSiapeDadosUORGWriteRepository extends AbstractEloquentWriteRepository implements SiapeDadosUORGWriteRepositoryContract
{
    public function __construct(SiapeDadosUORG $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): SiapeDadosUORG
    {
        /** @var SiapeDadosUORG $model */
        $model = parent::create($attributes);
        return $model;
    }

    public function forceDeleteProcessados(string $codigoOrgao): void
    {
        $this->model->newQuery()
            ->withTrashed()
            ->where('codigo_orgao', $codigoOrgao)
            ->where('processado', SiapeDadosUORG::PROCESSADO)
            ->forceDelete();
    }

    public function markProcessado(string $id): bool
    {
        return $this->model->newQuery()->whereKey($id)->update(['processado' => true]) === 1;
    }
}
