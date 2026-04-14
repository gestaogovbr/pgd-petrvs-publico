<?php

namespace App\Services\API_PGD;

use App\Models\Usuario;
use App\Services\API_PGD\Builder\UsuarioEnvioJobBuilder;

// classe responsavel por enviar o job de usuario
class UsuarioEnvioService
{
    public static function processar($tenantId, Usuario $usuario, string $origem = '')
    {
        $job = UsuarioEnvioJobBuilder::make($tenantId, $usuario, $origem);
        dispatch($job);
    }
}
