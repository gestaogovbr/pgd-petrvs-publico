<?php

declare(strict_types=1);

namespace App\Repository\StatusJustificativa\Eloquent;

use App\Models\StatusJustificativa;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\StatusJustificativa\Contracts\StatusJustificativaWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<StatusJustificativa>
 */
class EloquentStatusJustificativaWriteRepository extends AbstractEloquentWriteRepository implements StatusJustificativaWriteRepositoryContract
{
    public function __construct(StatusJustificativa $model)
    {
        $this->model = $model;
    }
}