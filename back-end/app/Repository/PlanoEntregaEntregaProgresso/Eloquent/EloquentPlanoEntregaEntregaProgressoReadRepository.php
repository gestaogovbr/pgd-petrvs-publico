<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntregaEntregaProgresso\Eloquent;

use App\Models\PlanoEntregaEntregaProgresso;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanoEntregaEntregaProgresso\Contracts\PlanoEntregaEntregaProgressoReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<PlanoEntregaEntregaProgresso>
 */
class EloquentPlanoEntregaEntregaProgressoReadRepository extends AbstractEloquentReadRepository implements PlanoEntregaEntregaProgressoReadRepositoryContract
{
    public function __construct(PlanoEntregaEntregaProgresso $model)
    {
        $this->model = $model;
    }

    public function findLatestByEntregaId(string $entregaId): ?PlanoEntregaEntregaProgresso
    {
        /** @var PlanoEntregaEntregaProgresso|null $progresso */
        $progresso = $this->query()
            ->where('plano_entrega_entrega_id', $entregaId)
            ->orderBy('data_progresso', 'desc')
            ->first();

        return $progresso;
    }
}