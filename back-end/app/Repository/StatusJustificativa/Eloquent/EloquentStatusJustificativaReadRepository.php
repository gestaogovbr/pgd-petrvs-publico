<?php

declare(strict_types=1);

namespace App\Repository\StatusJustificativa\Eloquent;

use App\Models\StatusJustificativa;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\StatusJustificativa\Contracts\StatusJustificativaReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<StatusJustificativa>
 */
class EloquentStatusJustificativaReadRepository extends AbstractEloquentReadRepository implements StatusJustificativaReadRepositoryContract
{
    public function __construct(StatusJustificativa $model)
    {
        $this->model = $model;
    }
}