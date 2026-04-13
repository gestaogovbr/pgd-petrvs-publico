<?php

declare(strict_types=1);

namespace App\Repository\Ocorrencia\Eloquent;

use App\Models\Afastamento;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Ocorrencia\Contracts\OcorrenciaWriteRepositoryContract;

class EloquentOcorrenciaWriteRepository extends AbstractEloquentWriteRepository implements OcorrenciaWriteRepositoryContract
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
