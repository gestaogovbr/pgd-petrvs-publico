<?php

declare(strict_types=1);

namespace App\Repository\Avaliacao\Contracts;

use App\Models\Avaliacao;

/**
 * @see \App\Repository\Avaliacao\Eloquent\EloquentAvaliacaoReadRepository
 */
interface AvaliacaoReadRepositoryContract
{
    public function findById(string|int $id): ?Avaliacao;

    public function findMaisRecenteDaConsolidacao(string $consolidacaoId): ?Avaliacao;
}