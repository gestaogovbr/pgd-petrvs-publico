<?php

namespace App\Services\API_PGD\Builder;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Models\Usuario;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

// classe responsavel por construir o job de envio do usuario
class UsuarioEnvioJobBuilder
{
    public static function make(
        $tenantId,
        Usuario $usuario,
        string $origem = '',
        ?string $codUnidadeAutorizadora = null,
    ): ?ExportarParticipanteJob {
        if (!self::deveAgendarParticipante($usuario)) {
            return null;
        }

        return new ExportarParticipanteJob(
            $tenantId,
            $usuario->id,
            $origem,
            $usuario->matricula,
            $codUnidadeAutorizadora,
        );
    }

    public static function deveAgendarParticipante(Usuario $usuario): bool
    {
        if (!self::possuiPlanoTrabalho($usuario)) {
            Log::info('Participante sem plano de trabalho — envio não agendado', [
                'usuario_id' => $usuario->id,
            ]);

            return false;
        }

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

    public static function possuiPlanoTrabalho(Usuario $usuario): bool
    {
        if ($usuario->relationLoaded('ultimoPlanoTrabalho')) {
            return $usuario->ultimoPlanoTrabalho !== null;
        }

        if ($usuario->relationLoaded('planosTrabalho')) {
            return $usuario->planosTrabalho->isNotEmpty();
        }

        if (!$usuario->getKey()) {
            return false;
        }

        return $usuario->planosTrabalho()->exists();
    }
}
