<?php

declare(strict_types=1);

namespace App\Repository\Ocorrencia\Contracts;

use App\DTOs\ListResult;
use App\Models\Afastamento;
use Illuminate\Database\Eloquent\Collection;

interface OcorrenciaReadRepositoryContract
{
    public function findById(string $id): ?Afastamento;

    /**
     * @return ListResult
     */
    public function findAll($data): ListResult;
}
