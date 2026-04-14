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
        $planoTrabalhoRepository = app()->make(PlanoTrabalhoRepository::class);

        // PlanoTrabalho precisa ter lotação, plano de trabalho e data de assinatura para exportação
        if (!$planoTrabalho->isEmStatusParaEnvio()) {
            $planoTrabalhoRepository->registrarLog($planoTrabalho, 'PT não está em status válido para envio ao PGD.');
            throw new EnvioNaoAgendadoException(
                tenant('id'),
                'PlanoTrabalho',
                $planoTrabalho->id,
                "PT não está em status válido para envio ao PGD."
            );
        }

        return new ExportarPlanoTrabalhoJob($tenantId, $planoTrabalho->id, $origem);
    }
}
