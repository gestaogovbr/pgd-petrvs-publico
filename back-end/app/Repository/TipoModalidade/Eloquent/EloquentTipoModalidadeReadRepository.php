<?php

declare(strict_types=1);

namespace App\Repository\TipoModalidade\Eloquent;

use App\Models\TipoModalidade;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\TipoModalidade\Contracts\TipoModalidadeReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<TipoModalidade>
 */
class EloquentTipoModalidadeReadRepository extends AbstractEloquentReadRepository implements TipoModalidadeReadRepositoryContract
{
    public function __construct(TipoModalidade $model)
    {
        $this->model = $model;
    }

    public function getDefaultId(): ?string
    {
        return $this->model->whereNull('deleted_at')->value('id');
    }
}
