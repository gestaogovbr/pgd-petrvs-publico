<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Usuario;
use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;
use App\Repository\Usuario\Contracts\UsuarioWriteRepositoryContract;

class UsuarioRepository
{
    public function __construct(
        private readonly UsuarioReadRepositoryContract $readRepository,
        private readonly UsuarioWriteRepositoryContract $writeRepository,
    ) {
    }
}