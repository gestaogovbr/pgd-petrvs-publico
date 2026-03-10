<?php

declare(strict_types=1);

namespace App\Repository\Entidade\Contracts;

/**
 * @see \App\Repository\Entidade\Eloquent\EloquentEntidadeReadRepository
 */
interface EntidadeReadRepositoryContract
{
    public function findById(string|int $id, array $with = []): ?\App\Models\Entidade;
    public function findBySigla(string $sigla, array $with = []): ?\App\Models\Entidade;
    public function findAll(): \Illuminate\Database\Eloquent\Collection;
}