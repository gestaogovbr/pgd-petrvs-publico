<?php

namespace App\Services\API_PGD\Builder;

use App\Exceptions\EnvioNaoAgendadoException;
use App\Jobs\Envio\ExportarPlanoEntregaJob;
use App\Models\PlanoEntrega;

// classe responsavel por construir o job de envio do PE
class PlanoEntregaEnvioJobBuilder
{
    public static function make($tenantId, PlanoEntrega $planoEntrega, string $origem = '')
    {
        // PlanoEntrega precisa ter lotação, plano de trabalho e data de assinatura para exportação
        if ($planoEntrega->programa
            && $planoEntrega->unidade
            && $planoEntrega->programa->unidade
            && $planoEntrega->isEmStatusParaEnvio()
        ) {
            return new ExportarPlanoEntregaJob(
                $tenantId,
                $planoEntrega->id,
                $origem
            );
        }

        $planoEntrega->log_envio = 'PE não está em status válido para envio ao PGD.';
        $planoEntrega->saveQuietly();
        throw new EnvioNaoAgendadoException(
            tenant('id'),
            'PlanoEntrega',
            $planoEntrega->id,
            "PE não está em status válido para envio ao PGD."
        );
    }
}
