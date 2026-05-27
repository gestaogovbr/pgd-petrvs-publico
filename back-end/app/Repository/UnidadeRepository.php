<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use App\Repository\Unidade\Contracts\UnidadeWriteRepositoryContract;
use App\V2\PlanoTrabalho\Documento\TCR\DTOs\AssinaturaHierarquiaDTO;

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

    public function getHierarquiaAssinatura(string $unidadeId, string $participanteId, string $assinanteId): AssinaturaHierarquiaDTO
    {
        return $this->readRepository->getHierarquiaAssinatura($unidadeId, $participanteId, $assinanteId);
    }

    public function getAreasTrabalhoWhereClause(string $usuarioId, bool $subordinadas, string $prefix = ""): string
    {
        return $this->readRepository->getAreasTrabalhoWhereClause($usuarioId, $subordinadas, $prefix);
    }

    public function findByCodigo(string $codigo): ?\App\Models\Unidade
    {
        return $this->readRepository->findByCodigo($codigo);
    }

    public function findBySigla(string $sigla): ?\App\Models\Unidade
    {
        return $this->readRepository->findBySigla($sigla);
    }

    public function findByCodigoWithPai(string $codigo): ?\App\Models\Unidade
    {
        return $this->readRepository->findByCodigoWithPai($codigo);
    }

    public function getUnidadesGerenciadas(string $usuarioId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->readRepository->getUnidadesGerenciadas($usuarioId);
    }

    public function getSubordinadas(array $ids): \Illuminate\Database\Eloquent\Collection
    {
        return $this->readRepository->getSubordinadas($ids);
    }

    public function getSubordinadasRecursivas(array $ids): \Illuminate\Database\Eloquent\Collection
    {
        return $this->readRepository->getSubordinadasRecursivas($ids);
    }

    public function findById(string $id): ?\App\Models\Unidade
    {
        return $this->readRepository->findById($id);
    }

    public function findWithPlanosTrabalhoAtividades(string|int $id): ?\App\Models\Unidade
    {
        return $this->readRepository->findWithPlanosTrabalhoAtividades($id);
    }

    public function existsByCodigo(string $codigo): bool
    {
        return $this->readRepository->existsByCodigo($codigo);
    }

    public function buscarPorNomeOuCodigo(\App\V2\Unidade\DTOs\UnidadeBuscaDTO $dto): \Illuminate\Database\Eloquent\Collection
    {
        return $this->readRepository->buscarPorNomeOuCodigo($dto);
    }

    /** @return string[] IDs das unidades na linha ascendente (da raiz até a unidade informada) */
    public function linhaAscendente(string $unidadeId): array
    {
        return $this->readRepository->linhaAscendente($unidadeId);
    }
}
