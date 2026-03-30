<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Ocorrencia;
use App\Repository\Ocorrencia\Contracts\OcorrenciaReadRepositoryContract;

class OcorrenciaRepository
{
    public function __construct(
        private readonly OcorrenciaReadRepositoryContract $readRepository,
    ) {
    }

    public function findById(string $id): ?Ocorrencia
    {
        return $this->readRepository->findById($id);
    }
}
