<?php

namespace App\Repository\TipoModalidade\Eloquent;

use App\Models\TipoModalidade;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\TipoModalidade\Contracts\TipoModalidadeReadRepositoryContract;

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
