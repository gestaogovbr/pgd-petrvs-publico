<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Usuario;
use App\Repository\EnvioUsuario\Contracts\EnvioUsuarioReadRepositoryContract;

class EnvioUsuarioRepository
{
    public function __construct(
        private readonly EnvioUsuarioReadRepositoryContract $readRepository
    ) {
    }

    public function query(array $data, Usuario $requestUser): array
    {
        return $this->readRepository->query($data, $requestUser);
    }
}
