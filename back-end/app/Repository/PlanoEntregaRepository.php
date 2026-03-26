<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\PlanoEntrega;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaReadRepositoryContract;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaWriteRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class PlanoEntregaRepository
{
    public function __construct(
        private readonly PlanoEntregaReadRepositoryContract $readRepository,
        private readonly PlanoEntregaWriteRepositoryContract $writeRepository
    ) {}

    public function findById(string|int $id): ?PlanoEntrega
    {
        return $this->readRepository->findById($id);
    }

    public function findAllParaEnvio(int $chunkSize, callable $onChunk): void
    {
        $this->readRepository->findAllParaEnvio($chunkSize, $onChunk);
    }

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

}
