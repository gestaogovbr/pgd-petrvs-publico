<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoEntrega\Contracts;

/**
 * @see \App\Repository\PlanoTrabalhoEntrega\Eloquent\EloquentPlanoTrabalhoEntregaReadRepository
 */
interface PlanoTrabalhoEntregaReadRepositoryContract
{
    /** @return \App\Models\PlanoTrabalhoEntrega|null */
    public function findById(string|int $id): ?\Illuminate\Database\Eloquent\Model;

    /** @return \App\Models\PlanoTrabalhoEntrega|null */
    public function find(string|int $id): ?\Illuminate\Database\Eloquent\Model;
}