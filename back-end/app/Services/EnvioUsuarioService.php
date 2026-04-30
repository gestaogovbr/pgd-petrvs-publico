<?php

namespace App\Services;

use App\Models\Usuario;
use App\Repository\EnvioUsuarioRepository;
use App\Services\ServiceBase;

class EnvioUsuarioService
{
    private EnvioUsuarioRepository $envioUsuarioRepository;

    public function __construct()
    {
        $this->envioUsuarioRepository = app(EnvioUsuarioRepository::class);
    }

    public function queryForEnvioList(array $data, Usuario $requestUser): array
    {
        return $this->envioUsuarioRepository->query($data, $requestUser);
    }
}
