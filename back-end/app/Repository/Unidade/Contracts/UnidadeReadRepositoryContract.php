<?php

declare(strict_types=1);

namespace App\Repository\Unidade\Contracts;

use App\Models\Unidade;
use App\V2\PlanoTrabalho\Documento\TCR\DTOs\AssinaturaHierarquiaDTO;
use App\V2\Unidade\DTOs\UnidadeBuscaDTO;
use App\V2\Unidade\DTOs\UnidadeIndexDTO;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection as SupportCollection;

/**
 * @see \App\Repository\Unidade\Eloquent\EloquentUnidadeReadRepository
 */
interface UnidadeReadRepositoryContract
{
    public function hasUsuarioLotacao(string $unidadeId, string $usuarioId, bool $subordinadas = true): bool;

    public function isUsuarioGestorRecursivo(string $unidadeId, string $usuarioId, bool $incluirDelegado = true): bool;

    public function isUsuarioGestorDaUnidade(string $unidadeId, string $usuarioId): bool;

    public function isUsuarioGestorTitularDaUnidade(string $unidadeId, string $usuarioId): bool;

    public function isUsuarioGestorSubstitutoDaUnidade(string $unidadeId, string $usuarioId): bool;

    public function isUsuarioGestorDelegadoDaUnidade(string $unidadeId, string $usuarioId): bool;

    public function isUsuarioChefiaDaUnidade(string $unidadeId, string $usuarioId): bool;

    public function getHierarquiaAssinatura(string $unidadeId, string $participanteId, string $assinanteId): AssinaturaHierarquiaDTO;

    public function getAreasTrabalhoWhereClause(string $usuarioId, bool $subordinadas, string $prefix = ""): string;

    public function findByCodigo(string $codigo): ?Unidade;

    public function findBySigla(string $sigla): ?Unidade;

    public function getUnidadesGerenciadas(string $usuarioId, array $exclude = []): Collection;

    public function findByCodigoWithPai(string $codigo): ?Unidade;

    public function getSubordinadas(array $ids): Collection;

    public function getSubordinadasRecursivas(array $ids): Collection;

    /** @return list<string> IDs das unidades gerenciadas pelo usuário + suas subordinadas recursivas */
    public function getGerenciadasComSubordinadasIds(string $usuarioId): array;

    public function findById(string|int $id): ?Unidade;

    public function findWithPlanosTrabalhoAtividades(string|int $id): ?Unidade;

    public function existsByCodigo(string $codigo): bool;

    public function buscarPorNomeOuCodigo(UnidadeBuscaDTO $dto): Collection;

    public function index(UnidadeIndexDTO $dto): LengthAwarePaginator;

    /** @return string[] */
    public function linhaAscendente(string $unidadeId): array;

    public function findAllWhere(array $criteria): SupportCollection;
    /**
     * Busca unidades com dados de localidade (entidade_id, cidade_id, uf).
     *
     * @param array<string> $unidadeIds
     * @return SupportCollection
     */
    public function buscarComLocalidade(array $unidadeIds): SupportCollection;

    /**
     * Retorna a unidade raiz da entidade (unidade sem pai).
     */
    public function findRaiz(): ?Unidade;
}
