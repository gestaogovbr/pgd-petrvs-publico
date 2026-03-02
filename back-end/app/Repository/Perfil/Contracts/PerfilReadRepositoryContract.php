<?php

declare(strict_types=1);

namespace App\Repository\Perfil\Contracts;

use App\Models\Perfil;

interface PerfilReadRepositoryContract
{
    public function find(string|int $id): ?Perfil;
}
