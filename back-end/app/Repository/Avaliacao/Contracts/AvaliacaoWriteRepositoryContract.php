<?php

declare(strict_types=1);

namespace App\Repository\Avaliacao\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\Avaliacao\Eloquent\EloquentAvaliacaoWriteRepository
 */
interface AvaliacaoWriteRepositoryContract
{
    public function create(array $attributes): Model;

    public function delete(string|int $id): bool;
}