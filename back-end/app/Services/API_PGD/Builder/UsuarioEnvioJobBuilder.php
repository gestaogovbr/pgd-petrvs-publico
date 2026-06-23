<?php

namespace App\Services\API_PGD\Builder;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Models\Usuario;
use Carbon\Carbon;

// classe responsavel por construir o job de envio do usuario
class UsuarioEnvioJobBuilder
{
    public static function make($tenantId, Usuario $usuario, string $origem = ''): ?ExportarParticipanteJob
    {
        if (!self::deveAgendarParticipante($usuario)) {
            return null;
        }

        return new ExportarParticipanteJob($tenantId, $usuario->id, $origem, $usuario->matricula);
    }

    public static function deveAgendarParticipante(Usuario $usuario): bool
    {
        $dataEnvio = $usuario->data_envio_api_pgd;
        if (!$dataEnvio instanceof Carbon) {
            return true;
        }

        $dataUltimaAlteracao = $usuario->updated_at;
        if (!$dataUltimaAlteracao instanceof Carbon) {
            return true;
        }

        return $dataEnvio->lt($dataUltimaAlteracao);
    }
}
