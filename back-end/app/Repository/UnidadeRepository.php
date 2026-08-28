<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Unidade;
use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use App\Repository\Unidade\Contracts\UnidadeWriteRepositoryContract;
use App\V2\PlanoTrabalho\Documento\TCR\DTOs\AssinaturaHierarquiaDTO;
use App\V2\Unidade\DTOs\UnidadeBuscaDTO;
use Carbon\CarbonInterface;
use App\V2\Unidade\DTOs\UnidadeIndexDTO;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Collection;

class UnidadeRepository
{
    public function __construct(
        private readonly UnidadeReadRepositoryContract $readRepository,
        private readonly UnidadeWriteRepositoryContract $writeRepository,
    ) {
    }

    public function hasUsuarioLotacao(string $unidadeId, string $usuarioId, bool $subordinadas = true): bool
    {
        return $this->readRepository->hasUsuarioLotacao($unidadeId, $usuarioId, $subordinadas);
    }

    public function isUsuarioGestorRecursivo(string $unidadeId, string $usuarioId, bool $incluirDelegado = true): bool
    {
        return $this->readRepository->isUsuarioGestorRecursivo($unidadeId, $usuarioId, $incluirDelegado);
    }

    public function isUsuarioGestorDaUnidade(string $unidadeId, string $usuarioId): bool
    {
        return $this->readRepository->isUsuarioGestorDaUnidade($unidadeId, $usuarioId);
    }

    public function isUsuarioGestorTitularDaUnidade(string $unidadeId, string $usuarioId): bool
    {
        return $this->readRepository->isUsuarioGestorTitularDaUnidade($unidadeId, $usuarioId);
    }

    public function isUsuarioGestorSubstitutoDaUnidade(string $unidadeId, string $usuarioId): bool
    {
        return $this->readRepository->isUsuarioGestorSubstitutoDaUnidade($unidadeId, $usuarioId);
    }

    public function isUsuarioGestorDelegadoDaUnidade(string $unidadeId, string $usuarioId): bool
    {
        return $this->readRepository->isUsuarioGestorDelegadoDaUnidade($unidadeId, $usuarioId);
    }

    public function isUsuarioChefiaDaUnidade(string $unidadeId, string $usuarioId): bool
    {
        return $this->readRepository->isUsuarioChefiaDaUnidade($unidadeId, $usuarioId);
    }

    public function getHierarquiaAssinatura(string $unidadeId, string $participanteId, string $assinanteId): AssinaturaHierarquiaDTO
    {
        return $this->readRepository->getHierarquiaAssinatura($unidadeId, $participanteId, $assinanteId);
    }

    public function getAreasTrabalhoWhereClause(string $usuarioId, bool $subordinadas, string $prefix = ""): string
    {
        return $this->readRepository->getAreasTrabalhoWhereClause($usuarioId, $subordinadas, $prefix);
    }

    public function findByCodigoOrgao(string $codigoOrgao, string $codigo): ?Unidade
    {
        return $this->readRepository->findByCodigoOrgao($codigoOrgao, $codigo);
    }

    /**
     * @param list<string> $codigos
     */
    public function findAllByCodigoOrgaoCodigos(string $codigoOrgao, array $codigos): EloquentCollection
    {
        return $this->readRepository->findAllByCodigoOrgaoCodigos($codigoOrgao, $codigos);
    }

    public function findBySigla(string $sigla): ?Unidade
    {
        return $this->readRepository->findBySigla($sigla);
    }

    public function findByCodigoOrgaoWithPai(string $codigoOrgao, string $codigo): ?Unidade
    {
        return $this->readRepository->findByCodigoOrgaoWithPai($codigoOrgao, $codigo);
    }

    public function findByIdForUpdate(string|int $id): ?Unidade
    {
        return $this->readRepository->findByIdForUpdate($id);
    }

    public function findAllAtivasComCodigoByCodigoOrgao(string $codigoOrgao): EloquentCollection
    {
        return $this->readRepository->findAllAtivasComCodigoByCodigoOrgao($codigoOrgao);
    }

    public function findAllSemInicioInativacaoByCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): EloquentCollection
    {
        return $this->readRepository->findAllSemInicioInativacaoByCodigoOrgaoCodigo($codigoOrgao, $codigo);
    }

    public function findAllPendentesInativacaoByCodigoOrgaoAte(string $codigoOrgao, CarbonInterface $dataLimite): EloquentCollection
    {
        return $this->readRepository->findAllPendentesInativacaoByCodigoOrgaoAte($codigoOrgao, $dataLimite);
    }

    public function cancelarInicioInativacaoPorCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): int
    {
        return $this->writeRepository->cancelarInicioInativacaoPorCodigoOrgaoCodigo($codigoOrgao, $codigo);
    }

    public function reativarPorCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): int
    {
        return $this->writeRepository->reativarPorCodigoOrgaoCodigo($codigoOrgao, $codigo);
    }

    public function marcarAntigasPorCodigoOrgao(string $codigoOrgao): int
    {
        return $this->writeRepository->marcarAntigasPorCodigoOrgao($codigoOrgao);
    }

    public function iniciarInativacao(string|int $id): bool
    {
        return $this->writeRepository->iniciarInativacao($id);
    }

    public function efetivarInativacao(string|int $id): bool
    {
        return $this->writeRepository->efetivarInativacao($id);
    }

    public function getUnidadesGerenciadas(string $usuarioId, array $exclude = []): EloquentCollection
    {
        return $this->readRepository->getUnidadesGerenciadas($usuarioId, $exclude);
    }

    public function getSubordinadas(array $ids): EloquentCollection
    {
        return $this->readRepository->getSubordinadas($ids);
    }

    public function getSubordinadasRecursivas(array $ids): EloquentCollection
    {
        return $this->readRepository->getSubordinadasRecursivas($ids);
    }

    /** @return list<string> */
    public function getGerenciadasComSubordinadasIds(string $usuarioId): array
    {
        return $this->readRepository->getGerenciadasComSubordinadasIds($usuarioId);
    }

    public function findById(string $id): ?Unidade
    {
        return $this->readRepository->findById($id);
    }

    public function findWithPlanosTrabalhoAtividades(string|int $id): ?Unidade
    {
        return $this->readRepository->findWithPlanosTrabalhoAtividades($id);
    }

    public function existsByCodigoOrgao(string $codigoOrgao, string $codigo): bool
    {
        return $this->readRepository->existsByCodigoOrgao($codigoOrgao, $codigo);
    }

    public function buscarPorNomeOuCodigo(UnidadeBuscaDTO $dto): EloquentCollection
    {
        return $this->readRepository->buscarPorNomeOuCodigo($dto);
    }

    public function index(UnidadeIndexDTO $dto): LengthAwarePaginator
    {
        return $this->readRepository->index($dto);
    }

    /** @return string[] IDs das unidades na linha ascendente (da raiz até a unidade informada) */
    public function linhaAscendente(string $unidadeId): array
    {
        return $this->readRepository->linhaAscendente($unidadeId);
    }

    /**
     * @param array<string> $unidadeIds
     * @return Collection
     */
    public function buscarComLocalidade(array $unidadeIds): Collection
    {
        return $this->readRepository->buscarComLocalidade($unidadeIds);
    }

    public function findRaiz(): ?Unidade
    {
        return $this->readRepository->findRaiz();
    }

    public function findAll(): EloquentCollection
    {
        return $this->readRepository->findAllWhere([]);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): Unidade
    {
        /** @var Unidade */
        return $this->writeRepository->create($attributes);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string $id, array $attributes): ?Unidade
    {
        /** @var Unidade|null */
        return $this->writeRepository->update($id, $attributes);
    }

    /**
     * @return EloquentCollection<int, Unidade>
     */
    public function findAllComCodigo(): EloquentCollection
    {
        return $this->readRepository->findAllComCodigo();
    }

    public function recalcularPaths(string $pathAntigo, string $pathNovo): int
    {
        return $this->writeRepository->recalcularPaths($pathAntigo, $pathNovo);
    }

    public function reativarPorIntegracao(): int
    {
        return $this->writeRepository->reativarPorIntegracao();
    }
}
