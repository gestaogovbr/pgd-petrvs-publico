<?php

namespace App\Services\API_PGD\Builder;

use App\Jobs\Envio\ExportarPlanoEntregaJob;
use App\Models\PlanoEntrega;

// classe responsavel por construir o job de envio do PE
class PlanoEntregaEnvioJobBuilder
{
    public static function make($tenantId, PlanoEntrega $planoEntrega)
    {
        // PlanoEntrega precisa ter lotação, plano de trabalho e data de assinatura para exportação
        if ($planoEntrega->programa
            && $planoEntrega->unidade
            && $planoEntrega->programa->unidade
            && $planoEntrega->isEmStatusParaEnvio()
        ) {
            return new ExportarPlanoEntregaJob(
                $tenantId,
                $planoEntrega->id
            );
        }

        return null;
    }
}
