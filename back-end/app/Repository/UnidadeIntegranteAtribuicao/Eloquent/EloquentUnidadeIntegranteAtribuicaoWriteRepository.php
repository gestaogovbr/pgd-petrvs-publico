<?php

declare(strict_types=1);

namespace App\Repository\UnidadeIntegranteAtribuicao\Eloquent;

use App\Models\UnidadeIntegranteAtribuicao;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\UnidadeIntegranteAtribuicao\Contracts\UnidadeIntegranteAtribuicaoWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<UnidadeIntegranteAtribuicao>
 */
class EloquentUnidadeIntegranteAtribuicaoWriteRepository extends AbstractEloquentWriteRepository implements UnidadeIntegranteAtribuicaoWriteRepositoryContract
{
    public function __construct(UnidadeIntegranteAtribuicao $model)
    {
        $this->model = $model;
    }

    public function delete(string|int $id): bool
    {
        $model = $this->model->newQuery()->find($id);

        if ($model === null) {
            return false;
        }

        return (bool) $model->delete();
    }

    public function deleteAtivasByUnidadeIntegranteIds(array $unidadeIntegranteIds): int
    {
        if ($unidadeIntegranteIds === []) {
            return 0;
        }

        return $this->model->newQuery()
            ->whereIn('unidade_integrante_id', $unidadeIntegranteIds)
            ->whereNull('deleted_at')
            ->delete();
    }
}
