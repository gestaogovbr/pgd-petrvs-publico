<?php

declare(strict_types=1);

namespace App\Repository\Atividade\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\Atividade\Eloquent\EloquentAtividadeWriteRepository
 */
interface AtividadeWriteRepositoryContract
{
    /**
     * @param array<string, mixed> $attributes
     * @return \App\Models\Atividade
     */
    public function create(array $attributes): Model;

    /**
     * @param array<string, mixed> $attributes
     * @return \App\Models\Atividade|null
     */
    public function update(string|int $id, array $attributes): ?Model;

    public function delete(string|int $id): bool;
}
