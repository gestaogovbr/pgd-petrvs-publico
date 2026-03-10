<?php

declare(strict_types=1);

namespace App\Repository\UnidadeIntegrante\Contracts;

use Illuminate\Database\Eloquent\Collection;

/**
 * @see \App\Repository\UnidadeIntegrante\Eloquent\EloquentUnidadeIntegranteReadRepository
 */
interface UnidadeIntegranteReadRepositoryContract
{
    public function findCuradoresByUsuario(string $usuarioId): Collection;
    public function findColaboracoesByUsuario(string $usuarioId): Collection;
    public function findGerenciasSubstitutasByUsuario(string $usuarioId): Collection;
    public function findGerenciasDelegadasByUsuario(string $usuarioId): Collection;
    public function findGerenciasTitularesByUsuario(string $usuarioId): Collection;
    public function findLotacoesByUsuario(string $usuarioId): Collection;
    public function findGestorByUnidade(string $unidadeId): ?\App\Models\UnidadeIntegrante;
    public function findUnidadeIntegrante(string $usuarioId, string $unidadeId): ?\App\Models\UnidadeIntegrante;
}