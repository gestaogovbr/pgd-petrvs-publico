<?php

declare(strict_types=1);

namespace App\Repository\Unidade\Eloquent;

use App\Models\Unidade;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Unidade\Contracts\UnidadeWriteRepositoryContract;

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
}
