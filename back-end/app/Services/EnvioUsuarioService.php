<?php

namespace App\Services;

use App\Models\Usuario;
use App\Repository\EnvioUsuarioRepository;

class EnvioUsuarioService
{
    private EnvioUsuarioRepository $envioUsuarioRepository;

    public function __construct()
    {
        $this->envioUsuarioRepository = app(EnvioUsuarioRepository::class);
    }

    public function query(array $data, Usuario $requestUser): array
    {
        return $this->envioUsuarioRepository->query($data, $requestUser);
    }
}
