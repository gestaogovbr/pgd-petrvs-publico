<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\TipoObjetivo;
use App\Repository\TipoObjetivo\Contracts\TipoObjetivoReadRepositoryContract;
use App\Repository\TipoObjetivo\Contracts\TipoObjetivoWriteRepositoryContract;
use Illuminate\Support\Collection;

class TipoObjetivoRepository
{
    public function __construct(
        private readonly TipoObjetivoReadRepositoryContract $readRepository,
        private readonly TipoObjetivoWriteRepositoryContract $writeRepository,
    ) {}

    public function findById(string $id): ?TipoObjetivo
    {
        /** @var TipoObjetivo|null */
        return $this->readRepository->findById($id);
    }

    /** @return Collection<int, TipoObjetivo> */
    public function getAll(): Collection
    {
        return $this->readRepository->getAll();
    }

    public function create(array $attributes): TipoObjetivo
    {
        /** @var TipoObjetivo */
        return $this->writeRepository->create($attributes);
    }

    public function update(string $id, array $attributes): ?TipoObjetivo
    {
        /** @var TipoObjetivo|null */
        return $this->writeRepository->update($id, $attributes);
    }

    public function delete(string $id): bool
    {
        return $this->writeRepository->delete($id);
    }
}
