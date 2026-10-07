<?php

namespace App\Services\API_PGD\Builder;

use App\Exceptions\EnvioNaoAgendadoException;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class PlanoTrabalhoEnvioJobBuilder
{
    /**
     * Monta os jobs de envio do PT, na ordem: participante, planos de entrega, plano de trabalho.
     * O service despacha cada um em batch e só avança no then após sucesso.
     *
     * @return array<int, ShouldQueue>
     */
    public static function make($tenantId, PlanoTrabalho $planoTrabalho, string $origem = ''): array
    {
        $planoTrabalhoRepository = app()->make(PlanoTrabalhoRepository::class);
        $planoTrabalhoRepository->garantirCodUnidadeAutorizadora($planoTrabalho, (string) $tenantId);

        $jobs = [];

        $jobUsuario = self::makeJobParticipante($tenantId, $planoTrabalho, $origem);
        if ($jobUsuario !== null) {
            $jobs[] = $jobUsuario;
        } else {
            Log::info("{$planoTrabalho->identificacaoEnvio()} participante já enviado e sem alterações pendentes");
        }

        foreach (self::makeJobsPlanosEntrega($tenantId, $planoTrabalho, $origem) as $jobEntrega) {
            $jobs[] = $jobEntrega;
        }

        $jobs[] = self::makeJobPlanoTrabalho($tenantId, $planoTrabalho, $origem, $planoTrabalhoRepository);

        return $jobs;
    }

    private static function makeJobParticipante($tenantId, PlanoTrabalho $planoTrabalho, string $origem)
    {
        return UsuarioEnvioJobBuilder::make(
            $tenantId,
            $planoTrabalho->usuario,
            $origem,
            $planoTrabalho->cod_unidade_autorizadora,
        );
    }

    /**
     * @return array<int, ShouldQueue>
     */
    private static function makeJobsPlanosEntrega($tenantId, PlanoTrabalho $planoTrabalho, string $origem): array
    {
        $planoTrabalho->loadMissing('entregas.planoEntregaEntrega.planoEntrega');

        $jobs = [];
        $planosEntregaIncluidos = [];

        foreach ($planoTrabalho->entregas as $planoTrabalhoEntrega) {
            if (!$planoTrabalhoEntrega->plano_entrega_entrega_id) {
                continue;
            }

            $planoEntrega = $planoTrabalhoEntrega->planoEntregaEntrega?->planoEntrega;
            if ($planoEntrega === null) {
                Log::warning("{$planoTrabalho->identificacaoEnvio()} entrega #{$planoTrabalhoEntrega->id} com plano_entrega_entrega_id inválido ou excluído");
                continue;
            }

            $planoEntregaId = (string) $planoEntrega->id;
            if (isset($planosEntregaIncluidos[$planoEntregaId])) {
                continue;
            }

            $jobEntrega = PlanoEntregaEnvioJobBuilder::make($tenantId, $planoEntrega, $origem);
            if (!empty($jobEntrega)) {
                $jobs[] = $jobEntrega;
                $planosEntregaIncluidos[$planoEntregaId] = true;
            }
        }

        return $jobs;
    }

    private static function makeJobPlanoTrabalho(
        $tenantId,
        PlanoTrabalho $planoTrabalho,
        string $origem,
        PlanoTrabalhoRepository $planoTrabalhoRepository,
    ): ExportarPlanoTrabalhoJob {
        if (!$planoTrabalho->isEmStatusParaEnvio()) {
            $planoTrabalhoRepository->registrarLog($planoTrabalho, 'PT não está em status válido para envio ao PGD.');
            throw new EnvioNaoAgendadoException(
                tenant('id'),
                'PlanoTrabalho',
                $planoTrabalho->id,
                "PT não está em status válido para envio ao PGD.",
                $planoTrabalho->numero
            );
        }

        return new ExportarPlanoTrabalhoJob($tenantId, $planoTrabalho->id, $origem, $planoTrabalho->numero);
    }
}
