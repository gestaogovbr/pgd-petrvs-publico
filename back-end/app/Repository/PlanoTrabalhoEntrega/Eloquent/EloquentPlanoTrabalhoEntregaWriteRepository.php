<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoEntrega\Eloquent;

use App\Models\PlanoTrabalhoEntrega;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<PlanoTrabalhoEntrega>
 */
class EloquentPlanoTrabalhoEntregaWriteRepository extends AbstractEloquentWriteRepository implements PlanoTrabalhoEntregaWriteRepositoryContract
{
    public function __construct(PlanoTrabalhoEntrega $model)
    {
        $this->model = $model;
    }

    /** @return PlanoTrabalhoEntrega */
    public function createForPlano(string $planoTrabalhoId, array $attributes): \Illuminate\Database\Eloquent\Model
    {
        return $this->model->newQuery()->create(array_merge($attributes, [
            'plano_trabalho_id' => $planoTrabalhoId,
        ]));
    }
}