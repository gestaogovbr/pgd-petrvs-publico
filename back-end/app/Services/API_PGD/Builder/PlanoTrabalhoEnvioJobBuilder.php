<?php

namespace App\Services\API_PGD\Builder;

use App\Exceptions\EnvioNaoAgendadoException;
use App\Jobs\Envio\ExportarPlanoEntregaJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use Illuminate\Foundation\Bus\PendingChain;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Log;

class PlanoTrabalhoEnvioJobBuilder
{
    /**
     * Monta a cadeia de envio do plano de trabalho.
     * Ordem: Participante (se necessário) → Planos de Entrega relacionados → Plano de Trabalho.
     * Com Bus::chain, o próximo job só executa se o anterior concluir sem falha/insucesso.
     */
    public static function make($tenantId, PlanoTrabalho $planoTrabalho, string $origem = ''): PendingChain
    {
        self::validarPlanoTrabalhoParaEnvio($planoTrabalho);

        $jobChain = [];

        $jobUsuario = UsuarioEnvioJobBuilder::make($tenantId, $planoTrabalho->usuario, $origem);
        if ($jobUsuario !== null) {
            $jobChain[] = $jobUsuario;
        } else {
            Log::info("{$planoTrabalho->identificacaoEnvio()} participante já enviado e sem alterações pendentes");
        }

        foreach (self::makePlanosEntregaJobs($tenantId, $planoTrabalho, $origem) as $jobEntrega) {
            $jobChain[] = $jobEntrega;
        }

        $jobChain[] = self::makeExportJob($tenantId, $planoTrabalho, $origem);

        return Bus::chain($jobChain);
    }

    public static function makeExportJob($tenantId, PlanoTrabalho $planoTrabalho, string $origem = ''): ExportarPlanoTrabalhoJob
    {
        self::validarPlanoTrabalhoParaEnvio($planoTrabalho);

        return new ExportarPlanoTrabalhoJob($tenantId, $planoTrabalho->id, $origem, $planoTrabalho->numero);
    }

    /**
     * @return list<ExportarPlanoEntregaJob>
     */
    public static function makePlanosEntregaJobs($tenantId, PlanoTrabalho $planoTrabalho, string $origem = ''): array
    {
        $jobs = [];

        foreach ($planoTrabalho->entregas as $planoTrabalhoEntrega) {
            if (!$planoTrabalhoEntrega->plano_entrega_entrega_id) {
                continue;
            }

            $planoEntrega = $planoTrabalhoEntrega->planoEntregaEntrega?->planoEntrega;
            if ($planoEntrega === null) {
                Log::warning(
                    "{$planoTrabalho->identificacaoEnvio()} entrega #{$planoTrabalhoEntrega->id} com plano_entrega_entrega_id inválido ou excluído"
                );
                continue;
            }

            $jobs[] = PlanoEntregaEnvioJobBuilder::make($tenantId, $planoEntrega, $origem);
        }

        return $jobs;
    }

    private static function validarPlanoTrabalhoParaEnvio(PlanoTrabalho $planoTrabalho): void
    {
        $planoTrabalhoRepository = app()->make(PlanoTrabalhoRepository::class);

        if (!$planoTrabalho->isEmStatusParaEnvio()) {
            $planoTrabalhoRepository->registrarLog($planoTrabalho, 'PT não está em status válido para envio ao PGD.');
            throw new EnvioNaoAgendadoException(
                tenant('id'),
                'PlanoTrabalho',
                $planoTrabalho->id,
                'PT não está em status válido para envio ao PGD.',
                $planoTrabalho->numero
            );
        }
    }
}
