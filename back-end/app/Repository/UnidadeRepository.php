<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Unidade;
use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use App\Repository\Unidade\Contracts\UnidadeWriteRepositoryContract;
use App\V2\PlanoTrabalho\Documento\TCR\DTOs\AssinaturaHierarquiaDTO;
use App\V2\Unidade\DTOs\UnidadeBuscaDTO;
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

    public function isUsuarioGestorRecursivo(string $unidadeId, string $usuarioId): bool
    {
        return $this->readRepository->isUsuarioGestorRecursivo($unidadeId, $usuarioId);
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

    public function findByCodigo(string $codigo): ?Unidade
    {
        return $this->readRepository->findByCodigo($codigo);
    }

    public function findBySigla(string $sigla): ?Unidade
    {
        return $this->readRepository->findBySigla($sigla);
    }

    public function findByCodigoWithPai(string $codigo): ?Unidade
    {
        return $this->readRepository->findByCodigoWithPai($codigo);
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

    public function findById(string $id): ?Unidade
    {
        return $this->readRepository->findById($id);
    }

    public function findWithPlanosTrabalhoAtividades(string|int $id): ?Unidade
    {
        return $this->readRepository->findWithPlanosTrabalhoAtividades($id);
    }

    public function existsByCodigo(string $codigo): bool
    {
        return $this->readRepository->existsByCodigo($codigo);
    }

    public function buscarPorNomeOuCodigo(UnidadeBuscaDTO $dto): EloquentCollection
    {
        return $this->readRepository->buscarPorNomeOuCodigo($dto);
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

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): \App\Models\Unidade
    {
        /** @var \App\Models\Unidade */
        return $this->writeRepository->create($attributes);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string $id, array $attributes): ?\App\Models\Unidade
    {
        /** @var \App\Models\Unidade|null */
        return $this->writeRepository->update($id, $attributes);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\Unidade>
     */
    public function findAllComCodigo(): \Illuminate\Database\Eloquent\Collection
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
