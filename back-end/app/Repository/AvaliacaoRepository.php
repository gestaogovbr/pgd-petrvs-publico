<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Avaliacao;
use App\Repository\Avaliacao\Contracts\AvaliacaoReadRepositoryContract;
use App\Repository\Avaliacao\Contracts\AvaliacaoWriteRepositoryContract;

class AvaliacaoRepository
{
    public function __construct(
        private readonly AvaliacaoReadRepositoryContract $readRepository,
        private readonly AvaliacaoWriteRepositoryContract $writeRepository,
    ) {}

    public function create(array $attributes): Avaliacao
    {
        /** @var Avaliacao */
        return $this->writeRepository->create($attributes);
    }

    public function findById(string|int $id): ?Avaliacao
    {
        return $this->readRepository->findById($id);
    }

    public function delete(string|int $id): bool
    {
        return $this->writeRepository->delete($id);
    }

    public function findMaisRecenteDaConsolidacao(string $consolidacaoId): ?Avaliacao
    {
        return $this->readRepository->findMaisRecenteDaConsolidacao($consolidacaoId);
    }
}