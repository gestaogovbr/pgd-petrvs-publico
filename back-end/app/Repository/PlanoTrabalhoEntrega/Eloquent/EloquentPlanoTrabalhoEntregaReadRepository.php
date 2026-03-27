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
}