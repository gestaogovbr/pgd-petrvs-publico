<?php

namespace App\Services;

use App\Models\Usuario;
use App\Repository\EnvioUsuarioRepository;
use App\Services\ServiceBase;

class EnvioUsuarioService extends ServiceBase
{
    private EnvioUsuarioRepository $envioUsuarioRepository;

    public function __construct()
    {
        parent::__construct();
        $this->envioUsuarioRepository = app(EnvioUsuarioRepository::class);
    }

    public function queryForEnvioList(array $data, Usuario $requestUser): array
    {
        return $this->envioUsuarioRepository->query($data, $requestUser);
    }
}
