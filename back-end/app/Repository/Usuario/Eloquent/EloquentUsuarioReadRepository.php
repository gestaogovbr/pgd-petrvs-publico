<?php

declare(strict_types=1);

namespace App\Repository\Usuario\Eloquent;

use App\Models\Usuario;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<Usuario>
 */
class EloquentUsuarioReadRepository extends AbstractEloquentReadRepository implements UsuarioReadRepositoryContract
{
    public function __construct(Usuario $model)
    {
        $this->model = $model;
    }
}