<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoEntrega\Eloquent;

use App\Models\PlanoTrabalhoEntrega;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<PlanoTrabalhoEntrega>
 */
class EloquentPlanoTrabalhoEntregaReadRepository extends AbstractEloquentReadRepository implements PlanoTrabalhoEntregaReadRepositoryContract
{
    public function __construct(PlanoTrabalhoEntrega $model)
    {
        $this->model = $model;
    }

    public function existeVinculo(string $planoTrabalhoId, string $planoEntregaEntregaId): bool
    {
        return $this->query()
            ->where('plano_trabalho_id', $planoTrabalhoId)
            ->where('plano_entrega_entrega_id', $planoEntregaEntregaId)
            ->exists();
    }
}