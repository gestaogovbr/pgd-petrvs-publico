<?php

declare(strict_types=1);

namespace App\Repository\Unidade\Contracts;

/**
 * @see \App\Repository\Unidade\Eloquent\EloquentUnidadeWriteRepository
 */
interface UnidadeWriteRepositoryContract
{
    /**
     * @param array<string, mixed> $attributes
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function create(array $attributes): \Illuminate\Database\Eloquent\Model;

    /**
     * @param array<string, mixed> $attributes
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function update(string|int $id, array $attributes): ?\Illuminate\Database\Eloquent\Model;

    /**
     * Recalcula paths de unidades filhas quando um pai muda de posição.
     */
    public function recalcularPaths(string $pathAntigo, string $pathNovo): int;

    /**
     * Reativa unidades que voltaram a constar em integracao_unidades.
     */
    public function reativarPorIntegracao(): int;
}