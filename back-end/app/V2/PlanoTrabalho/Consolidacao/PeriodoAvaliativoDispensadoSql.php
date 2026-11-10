<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao;

use Illuminate\Database\Eloquent\Builder;

/**
 * Espelha DispensaAvaliacaoPolicy no SQL, via fn_periodo_avaliativo_dispensado.
 * Um período está dispensado quando ocorrências que não são acréscimo cobrem todos os seus dias.
 */
final class PeriodoAvaliativoDispensadoSql
{
    public const FUNCAO = 'fn_periodo_avaliativo_dispensado';

    public const SITUACAO_RELATORIO = 'Dispensado';

    /**
     * Exclui consolidações dispensadas de avaliação da query de consolidação.
     *
     * @param Builder<\Illuminate\Database\Eloquent\Model> $query
     */
    public static function excluirDispensados(Builder $query): void
    {
        $query->whereRaw(self::FUNCAO . '(
            (SELECT pt_disp.usuario_id FROM planos_trabalhos pt_disp WHERE pt_disp.id = planos_trabalhos_consolidacoes.plano_trabalho_id),
            planos_trabalhos_consolidacoes.data_inicio,
            planos_trabalhos_consolidacoes.data_fim
        ) = 0');
    }
}
