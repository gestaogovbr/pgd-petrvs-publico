<?php

declare(strict_types=1);

namespace App\Repository\UnidadeIntegranteAtribuicao\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\UnidadeIntegranteAtribuicao\Eloquent\EloquentUnidadeIntegranteAtribuicaoWriteRepository
 */
interface UnidadeIntegranteAtribuicaoWriteRepositoryContract
{
    public function create(array $attributes): Model;
    public function delete(string $id): bool;

    /**
     * @param list<string> $unidadeIntegranteIds
     */
    public function deleteAtivasByUnidadeIntegranteIds(array $unidadeIntegranteIds): int;

    /**
     * Remove todas as atribuições GESTOR de um usuario em todas as unidades (exceto informais).
     */
    public function deleteGestorByUsuario(string $usuarioId, bool $ignorarInformais = true): int;
}
