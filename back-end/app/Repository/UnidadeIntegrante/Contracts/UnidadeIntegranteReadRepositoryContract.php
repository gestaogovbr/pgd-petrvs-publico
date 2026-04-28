<?php

declare(strict_types=1);

namespace App\Repository\UnidadeIntegrante\Contracts;

use Illuminate\Database\Eloquent\Collection;

/**
 * @see \App\Repository\UnidadeIntegrante\Eloquent\EloquentUnidadeIntegranteReadRepository
 */
interface UnidadeIntegranteReadRepositoryContract
{
    public function findAllCuradoresByUsuario(string $usuarioId): Collection;
    public function findAllColaboracoesByUsuario(string $usuarioId): Collection;
    public function findAllGerenciasSubstitutasByUsuario(string $usuarioId): Collection;
    public function findAllGerenciasDelegadasByUsuario(string $usuarioId): Collection;
    public function findAllGerenciasTitularesByUsuario(string $usuarioId): Collection;
    public function findAllLotacoesByUsuario(string $usuarioId): Collection;
    public function findGestorByUnidade(string $unidadeId): ?\App\Models\UnidadeIntegrante;
    public function findUnidadeIntegrante(string $usuarioId, string $unidadeId): ?\App\Models\UnidadeIntegrante;
    public function findAllByUsuario(string $usuarioId): Collection;
    public function countLotadosByUnidade(string $unidadeId): int;
}
