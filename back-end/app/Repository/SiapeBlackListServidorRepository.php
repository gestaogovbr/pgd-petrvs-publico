<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\SiapeBlackListServidor;
use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorReadRepositoryContract;
use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorWriteRepositoryContract;

class SiapeBlackListServidorRepository
{
    public function __construct(
        private readonly SiapeBlackListServidorReadRepositoryContract $readRepository,
        private readonly SiapeBlackListServidorWriteRepositoryContract $writeRepository,
    ) {
    }

    public function exists(string $cpf, string $matricula): bool
    {
        return $this->readRepository->exists($cpf, $matricula);
    }

    public function findByCpfAndOptionalMatricula(string $cpf, ?string $matricula = null): ?SiapeBlackListServidor
    {
        return $this->readRepository->findByCpfAndOptionalMatricula($cpf, $matricula);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): SiapeBlackListServidor
    {
        return $this->writeRepository->create($attributes);
    }

    public function forceDelete(string $id): bool
    {
        return $this->writeRepository->forceDelete($id);
    }
}
