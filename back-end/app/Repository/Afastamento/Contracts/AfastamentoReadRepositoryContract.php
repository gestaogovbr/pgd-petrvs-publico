<?php

declare(strict_types=1);

namespace App\Repository\Afastamento\Contracts;

use App\DTOs\ListResult;
use App\Models\Afastamento;
use Illuminate\Database\Eloquent\Collection;

interface AfastamentoReadRepositoryContract
{
    public function findById(string $id): ?Afastamento;

    /**
     * @return ListResult
     */
    public function findAll($data): ListResult;
}
