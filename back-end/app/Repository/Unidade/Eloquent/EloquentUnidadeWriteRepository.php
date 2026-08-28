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

    public function cancelarInicioInativacaoPorCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): int
    {
        return $this->model->newQuery()
            ->where('codigo_orgao', $codigoOrgao)
            ->where('codigo', $codigo)
            ->whereNotNull('data_inicio_inativacao')
            ->update([
                'data_inicio_inativacao' => null,
                'updated_at' => now(),
            ]);
    }

    public function reativarPorCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): int
    {
        return $this->model->newQuery()
            ->where('codigo_orgao', $codigoOrgao)
            ->where('codigo', $codigo)
            ->where(function ($query): void {
                $query->whereNotNull('data_inicio_inativacao')
                    ->orWhereNotNull('data_inativacao');
            })
            ->update([
                'data_inicio_inativacao' => null,
                'data_inativacao' => null,
                'updated_at' => now(),
            ]);
    }

    public function marcarAntigasPorCodigoOrgao(string $codigoOrgao): int
    {
        return $this->model->newQuery()
            ->where('codigo_orgao', $codigoOrgao)
            ->where('unidade_antiga', false)
            ->update([
                'unidade_antiga' => true,
                'updated_at' => now(),
            ]);
    }

    public function iniciarInativacao(string|int $id): bool
    {
        return $this->model->newQuery()
            ->whereKey($id)
            ->whereNull('data_inicio_inativacao')
            ->whereNull('data_inativacao')
            ->update([
                'data_inicio_inativacao' => now(),
                'updated_at' => now(),
            ]) > 0;
    }

    public function efetivarInativacao(string|int $id): bool
    {
        return $this->model->newQuery()
            ->whereKey($id)
            ->whereNull('data_inativacao')
            ->update([
                'data_inativacao' => now(),
                'updated_at' => now(),
            ]) > 0;
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
