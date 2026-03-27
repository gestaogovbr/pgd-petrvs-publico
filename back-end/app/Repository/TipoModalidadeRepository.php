<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\TipoModalidade\Contracts\TipoModalidadeReadRepositoryContract;
use Illuminate\Support\Collection;

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

    public function findByNome(string $name): ?object
    {
        return $this->readRepository->findOneBy(['nome' => $name]);
    }

    public function getAll(): Collection
    {
        return $this->readRepository->getAll();
    }
}
