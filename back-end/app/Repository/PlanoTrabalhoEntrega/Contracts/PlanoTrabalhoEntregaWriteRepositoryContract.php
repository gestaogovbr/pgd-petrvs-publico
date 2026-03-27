<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoEntrega\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\PlanoTrabalhoEntrega\Eloquent\EloquentPlanoTrabalhoEntregaWriteRepository
 */
interface PlanoTrabalhoEntregaWriteRepositoryContract
{
    /** @return \App\Models\PlanoTrabalhoEntrega */
    public function create(array $attributes): Model;
}
