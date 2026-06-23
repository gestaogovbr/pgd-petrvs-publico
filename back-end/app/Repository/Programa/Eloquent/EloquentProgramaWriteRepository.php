<?php

declare(strict_types=1);

namespace App\Repository\Programa\Eloquent;

use App\Models\Programa;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Programa\Contracts\ProgramaWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<Programa>
 */
class EloquentProgramaWriteRepository extends AbstractEloquentWriteRepository implements ProgramaWriteRepositoryContract
{
    public function __construct(Programa $model)
    {
        $this->model = $model;
    }
}