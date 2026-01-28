<?php

namespace App\Services\API_PGD\Builder;

use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use Carbon\Carbon;

// classe responsavel por construir o job de envio do PT
class PlanoTrabalhoEnvioJobBuilder
{
    public static function make($tenantId, PlanoTrabalho $planoTrabalho)
    {
        // PlanoTrabalho precisa ter lotação, plano de trabalho e data de assinatura para exportação
        if ($planoTrabalho->programa
            && $planoTrabalho->unidade
            && $planoTrabalho->programa->unidade
            && $planoTrabalho->isEmStatusParaEnvio()
        ) {
            $planoTrabalho->data_agendamento_envio = Carbon::now();
            $planoTrabalho->saveQuietly();

            return new ExportarPlanoTrabalhoJob(
                $tenantId,
                $planoTrabalho->id
            );
        }

        return null;
    }
}
