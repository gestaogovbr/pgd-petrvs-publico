<?php

declare(strict_types=1);

namespace App\Repository\Avaliacao\Eloquent;

use App\Models\Avaliacao;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Avaliacao\Contracts\AvaliacaoWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<Avaliacao>
 */
class EloquentAvaliacaoWriteRepository extends AbstractEloquentWriteRepository implements AvaliacaoWriteRepositoryContract
{
    public function __construct(Avaliacao $model)
    {
        $this->model = $model;
    }
}