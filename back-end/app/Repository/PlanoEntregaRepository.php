<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\PlanoEntregaEntrega;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaReadRepositoryContract;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaWriteRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class PlanoEntregaRepository
{
    public function __construct(
        private readonly PlanoEntregaReadRepositoryContract $readRepository,
        private readonly PlanoEntregaWriteRepositoryContract $writeRepository
    ) {}

    public function getPlanosEntregaAvaliacao(array $unidadesIds): Collection
    {
        return $this->readRepository->getPlanosEntregaAvaliacao($unidadesIds);
    }

    public function getPlanosEntregaHomologacao(array $unidadesIds): Collection
    {
        return $this->readRepository->getPlanosEntregaHomologacao($unidadesIds);
    }

    public function getEntregasPlanoEntregaHomologacao(array $unidadesIds): Collection
    {
        return $this->readRepository->getEntregasPlanoEntregaHomologacao($unidadesIds);
    }

    public function getEntregasPlanoEntregaExecucao(array $unidadesIds): Collection
    {
        return $this->readRepository->getEntregasPlanoEntregaExecucao($unidadesIds);
    }

    public function findByUnidadeId(string $unidadeId): Collection
    {
        return $this->readRepository->findByUnidadeId($unidadeId);
    }

    public function findEntregasByPlanoId(string $planoEntregaId): Collection
    {
        return $this->readRepository->findEntregasByPlanoId($planoEntregaId);
    }

    public function findEntregaById(string $entregaId): ?PlanoEntregaEntrega
    {
        return $this->readRepository->findEntregaById($entregaId);
    }
}
