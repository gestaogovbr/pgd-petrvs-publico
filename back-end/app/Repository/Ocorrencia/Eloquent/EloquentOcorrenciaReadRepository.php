<?php

declare(strict_types=1);

namespace App\Repository\Ocorrencia\Eloquent;

use App\Models\Ocorrencia;
use App\Repository\Ocorrencia\Contracts\OcorrenciaReadRepositoryContract;

class EloquentOcorrenciaReadRepository implements OcorrenciaReadRepositoryContract
{
    public function __construct(
        private readonly Ocorrencia $ocorrencia,
    ) {
    }

    public function findById(string $id): ?Ocorrencia
    {
        if ($id === '') {
            return null;
        }

        return $this->ocorrencia->newQuery()->find($id);
    }
}
