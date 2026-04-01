<?php

namespace App\Services\API_PGD\Builder;

use App\Exceptions\EnvioNaoAgendadoException;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use Carbon\Carbon;

class PlanoTrabalhoEnvioJobBuilder
{
    public static function make($tenantId, PlanoTrabalho $planoTrabalho, string $origem = '')
    {
        // PlanoTrabalho precisa ter lotação, plano de trabalho e data de assinatura para exportação
        if (!$planoTrabalho->isEmStatusParaEnvio()) {
            $planoTrabalho->log_envio = 'PT não está em status válido para envio ao PGD.';
            $planoTrabalho->saveQuietly();
            throw new EnvioNaoAgendadoException(
                tenant('id'),
                'PlanoTrabalho',
                $planoTrabalho->id,
                "PT não está em status válido para envio ao PGD."
            );
        }

        /* @var PlanoTrabalho $planoTrabalho */
        $planoTrabalhoRepository = app()->make(PlanoTrabalhoRepository::class);
        $planoTrabalhoRepository->agendarEnvio($planoTrabalho, Carbon::now());

        return new ExportarPlanoTrabalhoJob($tenantId, $planoTrabalho->id, $origem);
    }
}
