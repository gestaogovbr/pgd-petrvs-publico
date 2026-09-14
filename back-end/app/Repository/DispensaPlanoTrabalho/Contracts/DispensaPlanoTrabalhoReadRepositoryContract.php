<?php

declare(strict_types=1);

namespace App\Repository\DispensaPlanoTrabalho\Contracts;

use App\Models\DispensaPlanoTrabalho;
use Illuminate\Database\Eloquent\Collection;

/**
 * @see \App\Repository\DispensaPlanoTrabalho\Eloquent\EloquentDispensaPlanoTrabalhoReadRepository
 */
interface DispensaPlanoTrabalhoReadRepositoryContract
{
    public function findByUsuarioId(string $usuarioId): ?DispensaPlanoTrabalho;

    public function findByUsuarioIdComResponsavel(string $usuarioId): ?DispensaPlanoTrabalho;

    /**
     * @return Collection<int, \App\Models\DispensaPlanoTrabalhoHistorico>
     */
    public function findHistoricosByDispensaId(string $dispensaId): Collection;
}
