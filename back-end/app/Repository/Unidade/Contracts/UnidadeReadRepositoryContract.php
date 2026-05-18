<?php

declare(strict_types=1);

namespace App\Repository\Unidade\Contracts;

use App\Models\Unidade;
use App\V2\Unidade\DTOs\UnidadeBuscaDTO;
use Illuminate\Database\Eloquent\Collection;

/**
 * @see \App\Repository\Unidade\Eloquent\EloquentUnidadeReadRepository
 */
interface UnidadeReadRepositoryContract
{
    public function hasUsuarioLotacao(string $unidadeId, string $usuarioId, bool $subordinadas = true): bool;

    public function isUsuarioGestorRecursivo(string $unidadeId, string $usuarioId): bool;

    public function isUsuarioGestorDaUnidade(string $unidadeId, string $usuarioId): bool;

    public function getAreasTrabalhoWhereClause(string $usuarioId, bool $subordinadas, string $prefix = ""): string;

    public function findByCodigo(string $codigo): ?Unidade;

    public function findBySigla(string $sigla): ?Unidade;

    public function getUnidadesGerenciadas(string $usuarioId): Collection;

    public function findByCodigoWithPai(string $codigo): ?\App\Models\Unidade;

    public function getSubordinadas(array $ids): Collection;

    public function getSubordinadasRecursivas(array $ids): Collection;

    public function findById(string|int $id): ?Unidade;

    public function findWithPlanosTrabalhoAtividades(string|int $id): ?\App\Models\Unidade;

    public function existsByCodigo(string $codigo): bool;

    public function buscarPorNomeOuCodigoNaHierarquia(UnidadeBuscaDTO $dto, string $usuarioId): Collection;

    /** @return string[] */
    public function linhaAscendente(string $unidadeId): array;
}
