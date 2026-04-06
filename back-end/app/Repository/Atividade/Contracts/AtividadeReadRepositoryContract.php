<?php

declare(strict_types=1);

namespace App\Repository\Atividade\Contracts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @see \App\Repository\Atividade\Eloquent\EloquentAtividadeReadRepository
 */
interface AtividadeReadRepositoryContract
{
    /**
     * @return \App\Models\Atividade|null
     */
    public function findById(string|int $id): ?Model;

    /**
     * @return Collection<int, string>
     */
    public function entregaIdsComAtividade(string $consolidacaoId): Collection;
}
