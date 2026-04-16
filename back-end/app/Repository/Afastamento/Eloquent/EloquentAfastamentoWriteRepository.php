<?php

declare(strict_types=1);

namespace App\Repository\Afastamento\Eloquent;

use App\Models\Afastamento;
use App\Repository\Afastamento\Contracts\AfastamentoWriteRepositoryContract;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;

class EloquentAfastamentoWriteRepository extends AbstractEloquentWriteRepository implements AfastamentoWriteRepositoryContract
{
    public function __construct(Afastamento $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): Afastamento
    {
        /** @var Afastamento */
        return parent::create($attributes);
    }

    public function update(string|int $id, array $attributes): ?Afastamento
    {
        /** @var Afastamento|null */
        return parent::update($id, $attributes);
    }
}
