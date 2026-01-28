<?php

namespace App\Services\API_PGD\Builder;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Models\Usuario;

class UsuarioEnvioJobBuilder
{
    public static function make($tenantId, Usuario $usuario)
    {
        return new ExportarParticipanteJob($tenantId, $usuario->id);
    }
}
