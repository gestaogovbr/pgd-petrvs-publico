<?php

declare(strict_types=1);

namespace App\Repository\Programa\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\Programa\Eloquent\EloquentProgramaReadRepository
 */
interface ProgramaReadRepositoryContract
{
    /** @return \App\Models\Programa|null */
    public function findById(string|int $id): ?Model;

    public function findAllNotasAvaliacao(string $tipoAvaliacaoId): Collection;

    public function isVigenteParaUnidade(string $programaId, string $unidadeId): bool;
}