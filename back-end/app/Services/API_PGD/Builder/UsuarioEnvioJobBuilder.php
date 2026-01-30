<?php

namespace App\Services\API_PGD\Builder;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Models\Usuario;

// classe responsavel por construir o job de envio do usuario
class UsuarioEnvioJobBuilder
{
    public static function make($tenantId, Usuario $usuario, string $origem = '')
    {
        return new ExportarParticipanteJob($tenantId, $usuario->id, $origem);
    }
}
