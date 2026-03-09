<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use App\Repository\Unidade\Contracts\UnidadeWriteRepositoryContract;

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

    public function getAreasTrabalhoWhereClause(string $usuarioId, bool $subordinadas, string $prefix = ""): string
    {
        return $this->readRepository->getAreasTrabalhoWhereClause($usuarioId, $subordinadas, $prefix);
    }

    public function findByCodigo(string $codigo): ?\App\Models\Unidade
    {
        return $this->readRepository->findByCodigo($codigo);
    }

    public function getUnidadesGerenciadas(string $usuarioId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->readRepository->getUnidadesGerenciadas($usuarioId);
    }

    public function getSubordinadas(array $ids): \Illuminate\Database\Eloquent\Collection
    {
        return $this->readRepository->getSubordinadas($ids);
    }

    public function findById(string $id): ?\App\Models\Unidade
    {
        return $this->readRepository->findById($id);
    }
}
