<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Atividade;
use App\Repository\Atividade\Contracts\AtividadeReadRepositoryContract;

class AtividadeRepository
{
    public function __construct(
        private readonly AtividadeReadRepositoryContract $readRepository,
    ) {
    }

    public function findWithPlanoTrabalho(string|int $id): ?Atividade
    {
        return $this->readRepository->findWithPlanoTrabalho($id);
    }
}
