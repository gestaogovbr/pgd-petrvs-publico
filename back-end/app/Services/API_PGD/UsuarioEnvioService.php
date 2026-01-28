<?php

namespace App\Services\API_PGD;

use App\Models\Usuario;
use App\Services\API_PGD\Builder\UsuarioEnvioJobBuilder;

class UsuarioEnvioService
{
    public static function processar($tenantId, Usuario $usuario)
    {
        $job = UsuarioEnvioJobBuilder::make($tenantId, $usuario);
        dispatch($job)->onConnection('rabbitmq')->onQueue('pgd_queue');
    }
}
