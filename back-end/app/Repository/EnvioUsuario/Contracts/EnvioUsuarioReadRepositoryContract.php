<?php

declare(strict_types=1);

namespace App\Repository\EnvioUsuario\Contracts;

use App\Models\Usuario;

interface EnvioUsuarioReadRepositoryContract
{
    public function query(array $data, Usuario $requestUser): array;
}
