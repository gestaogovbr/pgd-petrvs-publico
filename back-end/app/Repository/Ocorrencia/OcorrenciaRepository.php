<?php

declare(strict_types=1);

namespace App\Repository\Ocorrencia;

use App\DTOs\ListResult;
use App\Models\Ocorrencia;
use App\Repository\Ocorrencia\Contracts\OcorrenciaReadRepositoryContract;
use App\Repository\Ocorrencia\Contracts\OcorrenciaWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<Ocorrencia>
 */
class OcorrenciaRepository
{
    public function __construct(
        private readonly OcorrenciaReadRepositoryContract $readRepository,
        private readonly OcorrenciaWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findById(string $id): ?Ocorrencia
    {
        return $this->readRepository->findById($id);
    }

    /**
     * @return ListResult
     */
    public function findAll($data): ListResult
    {
        return $this->readRepository->findAll($data);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function insert(array $attributes): Ocorrencia
    {
        return $this->writeRepository->create($attributes);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string $id, array $attributes): ?Ocorrencia
    {
        return $this->writeRepository->update($id, $attributes);
    }

    public function destroy(string $id): bool
    {
        return $this->writeRepository->delete($id);
    }
}
