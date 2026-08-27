<?php

declare(strict_types=1);

namespace App\Repository\Unidade\Contracts;

use App\Models\Unidade;
use App\V2\PlanoTrabalho\Documento\TCR\DTOs\AssinaturaHierarquiaDTO;
use App\V2\Unidade\DTOs\UnidadeBuscaDTO;
use App\V2\Unidade\DTOs\UnidadeIndexDTO;
use Carbon\CarbonInterface;
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

    public function findByCodigoOrgao(string $codigoOrgao, string $codigo): ?Unidade;

    /**
     * @param list<string> $codigos
     */
    public function findAllByCodigoOrgaoCodigos(string $codigoOrgao, array $codigos): Collection;

    public function findBySigla(string $sigla): ?Unidade;

    public function getUnidadesGerenciadas(string $usuarioId, array $exclude = []): Collection;

    public function findByCodigoOrgaoWithPai(string $codigoOrgao, string $codigo): ?Unidade;

    public function findByIdForUpdate(string|int $id): ?Unidade;

    public function findAllAtivasComCodigoByCodigoOrgao(string $codigoOrgao): Collection;

    public function findAllSemInicioInativacaoByCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): Collection;

    public function findAllPendentesInativacaoByCodigoOrgaoAte(string $codigoOrgao, CarbonInterface $dataLimite): Collection;

    public function getSubordinadas(array $ids): Collection;

    public function getSubordinadasRecursivas(array $ids): Collection;

    public function findById(string|int $id): ?Unidade;

    public function findWithPlanosTrabalhoAtividades(string|int $id): ?Unidade;

    public function existsByCodigoOrgao(string $codigoOrgao, string $codigo): bool;

    public function buscarPorNomeOuCodigo(UnidadeBuscaDTO $dto): Collection;

    public function index(UnidadeIndexDTO $dto): LengthAwarePaginator;

    /** @return string[] */
    public function linhaAscendente(string $unidadeId): array;

    /**
     * @return Collection<int, Unidade>
     */
    public function findAllComCodigo(): Collection;

    /**
     * Busca unidades com dados de localidade (entidade_id, cidade_id, uf).
     *
     * @param array<string> $unidadeIds
     * @return SupportCollection
     */
    public function buscarComLocalidade(array $unidadeIds): SupportCollection;

    public function findAllWhere(array $criteria): SupportCollection;

    /**
     * Retorna a unidade raiz da entidade (unidade sem pai).
     */
    public function findRaiz(): ?Unidade;
}
