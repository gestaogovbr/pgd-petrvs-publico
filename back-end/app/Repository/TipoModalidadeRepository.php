<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\TipoModalidade\Contracts\TipoModalidadeReadRepositoryContract;

class TipoModalidadeRepository
{
    public function __construct(
        private readonly TipoModalidadeReadRepositoryContract $readRepository
    ) {
    }

    public function getDefaultId(): ?string
    {
        return $this->readRepository->getDefaultId();
    }

    public function findById(string|int $id): ?\App\Models\TipoModalidade
    {
        return $this->readRepository->findById($id);
    }

    public function findByNome(string $name): ?object
    {
        return $this->readRepository->findOneBy(['nome' => $name]);
    }
}
