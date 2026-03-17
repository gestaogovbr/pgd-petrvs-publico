<?php

declare(strict_types=1);

namespace App\Repository\UnidadeIntegranteAtribuicao\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\UnidadeIntegranteAtribuicao\Eloquent\EloquentUnidadeIntegranteAtribuicaoWriteRepository
 */
interface UnidadeIntegranteAtribuicaoWriteRepositoryContract
{
    public function create(array $attributes): Model;
    public function delete(string $id): bool;
}