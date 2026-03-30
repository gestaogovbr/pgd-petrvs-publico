<?php

declare(strict_types=1);

namespace App\Repository\Ocorrencia\Contracts;

use App\Models\Ocorrencia;

interface OcorrenciaReadRepositoryContract
{
    public function findById(string $id): ?Ocorrencia;
}
