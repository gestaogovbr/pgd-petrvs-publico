<?php

declare(strict_types=1);

namespace App\Repository\Avaliacao\Eloquent;

use App\Models\Avaliacao;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Avaliacao\Contracts\AvaliacaoReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<Avaliacao>
 */
class EloquentAvaliacaoReadRepository extends AbstractEloquentReadRepository implements AvaliacaoReadRepositoryContract
{
    public function __construct(Avaliacao $model)
    {
        $this->model = $model;
    }
}