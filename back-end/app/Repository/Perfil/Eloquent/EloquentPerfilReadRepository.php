<?php

declare(strict_types=1);

namespace App\Repository\Perfil\Eloquent;

use App\Models\Perfil;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Perfil\Contracts\PerfilReadRepositoryContract;

final class EloquentPerfilReadRepository extends AbstractEloquentReadRepository implements PerfilReadRepositoryContract
{
    public function __construct(Perfil $model)
    {
        $this->model = $model;
    }

    public function find(string|int $id): ?Perfil
    {
        /** @var Perfil|null */
        return $this->model->find($id);
    }
}
