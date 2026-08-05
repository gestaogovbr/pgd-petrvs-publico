<?php

declare(strict_types=1);

namespace App\Repository\Unidade\Eloquent;

use App\Models\Unidade;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Unidade\Contracts\UnidadeWriteRepositoryContract;
use Illuminate\Support\Facades\DB;

/**
 * @extends AbstractEloquentWriteRepository<Unidade>
 */
class EloquentUnidadeWriteRepository extends AbstractEloquentWriteRepository implements UnidadeWriteRepositoryContract
{
    public function __construct(Unidade $model)
    {
        $this->model = $model;
    }

    public function recalcularPaths(string $pathAntigo, string $pathNovo): int
    {
        return DB::update(
            "UPDATE unidades SET path = REPLACE(path, ?, ?) WHERE path LIKE ?",
            [$pathAntigo, $pathNovo, $pathAntigo . '%']
        );
    }

    public function reativarPorIntegracao(): int
    {
        return DB::update(
            "UPDATE unidades u SET data_inativacao = NULL
             WHERE data_inativacao IS NOT NULL
             AND EXISTS (
                SELECT 1 FROM integracao_unidades iu
                WHERE iu.id_servo = u.codigo
                AND iu.deleted_at IS NULL
                AND iu.ativa = 'true'
             )"
        );
    }
}