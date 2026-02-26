<?php

declare(strict_types=1);

namespace App\Repository\Usuario\Eloquent;

use App\Models\Usuario;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Usuario\Contracts\UsuarioWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<Usuario>
 */
class EloquentUsuarioWriteRepository extends AbstractEloquentWriteRepository implements UsuarioWriteRepositoryContract
{
    public function __construct(Usuario $model)
    {
        $this->model = $model;
    }
}