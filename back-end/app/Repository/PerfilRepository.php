<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Perfil;
use App\Repository\Perfil\Contracts\PerfilReadRepositoryContract;

class PerfilRepository
{
    public function __construct(
        private readonly PerfilReadRepositoryContract $readRepository
    ) {
    }

    public function find(string|int $id): ?Perfil
    {
        return $this->readRepository->find($id);
    }
}
