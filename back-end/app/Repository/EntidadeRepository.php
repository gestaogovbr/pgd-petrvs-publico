<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Entidade;
use App\Repository\Entidade\Contracts\EntidadeReadRepositoryContract;
use App\Repository\Entidade\Contracts\EntidadeWriteRepositoryContract;

class EntidadeRepository
{
    public function __construct(
        private readonly EntidadeReadRepositoryContract $readRepository,
        private readonly EntidadeWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findById(string $id, array $with = []): ?Entidade
    {
        return $this->readRepository->findById($id, $with);
    }

    public function findBySigla(string $sigla, array $with = []): ?Entidade
    {
        return $this->readRepository->findBySigla($sigla, $with);
    }
}