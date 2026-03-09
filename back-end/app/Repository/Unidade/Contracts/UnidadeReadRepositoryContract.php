<?php

declare(strict_types=1);

namespace App\Repository\Unidade\Contracts;

/**
 * @see \App\Repository\Unidade\Eloquent\EloquentUnidadeReadRepository
 */
interface UnidadeReadRepositoryContract
{
    public function hasUsuarioLotacao(string $unidadeId, string $usuarioId, bool $subordinadas = true): bool;

    public function isUsuarioGestorRecursivo(string $unidadeId, string $usuarioId): bool;

    public function getAreasTrabalhoWhereClause(string $usuarioId, bool $subordinadas, string $prefix = ""): string;

    public function findByCodigo(string $codigo): ?\App\Models\Unidade;

    public function getUnidadesGerenciadas(string $usuarioId): \Illuminate\Database\Eloquent\Collection;

    public function getSubordinadas(array $ids): \Illuminate\Database\Eloquent\Collection;

    public function findById(string|int $id): ?\App\Models\Unidade;
}
