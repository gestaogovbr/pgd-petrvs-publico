<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoEntrega\Contracts;

use App\V2\PlanoTrabalho\Entrega\DTOs\ResumoForcaTrabalhoDTO;
use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\PlanoTrabalhoEntrega\Eloquent\EloquentPlanoTrabalhoEntregaReadRepository
 */
interface PlanoTrabalhoEntregaReadRepositoryContract
{
    /** @return \App\Models\PlanoTrabalhoEntrega|null */
    public function findById(string|int $id): ?Model;

    /** @return \App\Models\PlanoTrabalhoEntrega|null */
    public function find(string|int $id): ?Model;

    public function existeVinculo(string $planoTrabalhoId, string $planoEntregaEntregaId): bool;

    public function resumoForcaTrabalhoPorPlano(string $planoTrabalhoId): ResumoForcaTrabalhoDTO;
}
