<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Eloquent;

use App\Models\PlanoTrabalho;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoWriteRepositoryContract;

class EloquentPlanoTrabalhoWriteRepository extends AbstractEloquentWriteRepository implements PlanoTrabalhoWriteRepositoryContract
{
    public function __construct(PlanoTrabalho $model)
    {
        $this->model = $model;
    }
}
