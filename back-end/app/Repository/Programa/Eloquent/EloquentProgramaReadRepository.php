<?php

declare(strict_types=1);

namespace App\Repository\Programa\Eloquent;

use App\Models\Programa;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Programa\Contracts\ProgramaReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<Programa>
 */
class EloquentProgramaReadRepository extends AbstractEloquentReadRepository implements ProgramaReadRepositoryContract
{
    public function __construct(Programa $model)
    {
        $this->model = $model;
    }
}