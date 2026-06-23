<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\TipoPlanejamentoObjetivo;
use App\Repository\TipoPlanejamentoObjetivo\Contracts\TipoPlanejamentoObjetivoReadRepositoryContract;
use App\Repository\TipoPlanejamentoObjetivo\Contracts\TipoPlanejamentoObjetivoWriteRepositoryContract;
use Illuminate\Support\Collection;

class TipoPlanejamentoObjetivoRepository
{
    public function __construct(
        private readonly TipoPlanejamentoObjetivoReadRepositoryContract $readRepository,
        private readonly TipoPlanejamentoObjetivoWriteRepositoryContract $writeRepository,
    ) {}

    public function findById(string $id): ?TipoPlanejamentoObjetivo
    {
        /** @var TipoPlanejamentoObjetivo|null */
        return $this->readRepository->findById($id);
    }

    /** @return Collection<int, TipoPlanejamentoObjetivo> */
    public function getAll(): Collection
    {
        return $this->readRepository->getAll();
    }

    public function create(array $attributes): TipoPlanejamentoObjetivo
    {
        /** @var TipoPlanejamentoObjetivo */
        return $this->writeRepository->create($attributes);
    }

    public function update(string $id, array $attributes): ?TipoPlanejamentoObjetivo
    {
        /** @var TipoPlanejamentoObjetivo|null */
        return $this->writeRepository->update($id, $attributes);
    }

    public function delete(string $id): bool
    {
        return $this->writeRepository->delete($id);
    }
}
