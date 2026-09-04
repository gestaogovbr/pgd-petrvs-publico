<?php

declare(strict_types=1);

namespace App\Repository\MuralAviso\Eloquent;

use App\Models\MuralAviso;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\MuralAviso\Contracts\MuralAvisoWriteRepositoryContract;

class EloquentMuralAvisoWriteRepository extends AbstractEloquentWriteRepository implements MuralAvisoWriteRepositoryContract
{
    public function __construct(MuralAviso $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): MuralAviso
    {
        /** @var MuralAviso */
        return parent::create($attributes);
    }

    public function update(string|int $id, array $attributes): ?MuralAviso
    {
        /** @var MuralAviso|null */
        return parent::update($id, $attributes);
    }
}
