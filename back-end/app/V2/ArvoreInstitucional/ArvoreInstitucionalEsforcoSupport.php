<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional;

use App\Enums\StatusEnum;

/**
 * Regras de exibição e cálculo de esforço do painel lateral / modal de entregas.
 * Compartilhado entre Planejamento Institucional e Cadeia de Valor.
 */
final class ArvoreInstitucionalEsforcoSupport
{
    /** CHD (horas/dia) usada quando o PT não possui carga_horaria informada (= 0). */
    private const CHD_FALLBACK_HORAS = 8;

    /** PTs que contam para esforço planejado (pactuados). */
    private const PT_STATUS_PLANEJADO = [
        StatusEnum::AGUARDANDO_ASSINATURA,
        StatusEnum::ATIVO,
        StatusEnum::CONCLUIDO,
        StatusEnum::AVALIADO,
    ];

    /** PTs que contam para esforço executado. */
    private const PT_STATUS_EXECUTADO = [
        StatusEnum::CONCLUIDO,
    ];

    /** PEs aguardando homologação (não exibem esforço planejado/executado). */
    private const PE_STATUS_AGUARDANDO_HOMOLOGACAO = [
        StatusEnum::INCLUIDO,
        StatusEnum::HOMOLOGANDO,
    ];

    /** PEs em execução (exibem esforço planejado). */
    private const PE_STATUS_EM_EXECUCAO = [
        StatusEnum::ATIVO,
        StatusEnum::CONCLUIDO,
        StatusEnum::AVALIADO,
    ];

    /** PEs concluídos (exibem esforço executado). */
    private const PE_STATUS_CONCLUIDO = [
        StatusEnum::CONCLUIDO,
        StatusEnum::AVALIADO,
    ];

    /**
     * Expressão SQL de dias úteis (segunda a sexta, sem feriados) do período do PT.
     * Equivalente a NETWORKDAYS(pt.data_inicio, pt.data_fim) sem feriados.
     */
    public static function diasPeriodoPtSql(): string
    {
        return "(5 * (DATEDIFF(pt.data_fim, pt.data_inicio) DIV 7) + SUBSTRING('1234555512344445123333451222234511112345001234550', 7 * WEEKDAY(pt.data_inicio) + WEEKDAY(pt.data_fim) + 1, 1))";
    }

    /**
     * Expressão SQL da CHD (carga horária diária) do PT, fonte do cálculo de esforço.
     */
    public static function chdPtSql(): string
    {
        $fallback = self::CHD_FALLBACK_HORAS;

        return "COALESCE(NULLIF(pt.carga_horaria, 0), {$fallback})";
    }

    /**
     * Percentual de esforço executado de uma entrega planejada (pte), por período.
     * A execução passou a viver em planos_trabalhos_consolidacoes_contribuicoes
     * (uma linha por período avaliativo). Usa a média das contribuições registradas
     * da entrega (via join agregado `pte_exec`); na ausência de registros, cai para
     * a força de trabalho planejada.
     */
    public static function esforcoExecutadoPteSql(): string
    {
        return 'COALESCE(pte_exec.media_executado, pte.forca_trabalho)';
    }

    /**
     * JOIN agregado que calcula a média do esforço executado por entrega planejada,
     * considerando apenas contribuições registradas e períodos não excluídos.
     * Expõe o alias `pte_exec` com a coluna `media_executado`.
     */
    public static function esforcoExecutadoPteJoinSql(): string
    {
        return "LEFT JOIN (
            SELECT ptcc.plano_trabalho_entrega_id, AVG(ptcc.esforco_executado) AS media_executado
            FROM planos_trabalhos_consolidacoes_contribuicoes ptcc
            INNER JOIN planos_trabalhos_consolidacoes ptc
                ON ptc.id = ptcc.plano_trabalho_consolidacao_id AND ptc.deleted_at IS NULL
            WHERE ptcc.deleted_at IS NULL
              AND ptcc.registrado_at IS NOT NULL
            GROUP BY ptcc.plano_trabalho_entrega_id
        ) pte_exec ON pte_exec.plano_trabalho_entrega_id = pte.id";
    }

    public static function ptStatusPlanejadoIn(): string
    {
        return self::enumListToSqlIn(self::PT_STATUS_PLANEJADO);
    }

    public static function ptStatusExecutadoIn(): string
    {
        return self::enumListToSqlIn(self::PT_STATUS_EXECUTADO);
    }

    /**
     * @return array{mostrar_disponivel: bool, mostrar_planejado: bool, mostrar_executado: bool}
     */
    public static function visibilidadeEsforco(string $peStatus, bool $temPtPactuado, bool $temPtConcluido): array
    {
        $aguardandoHomologacao = self::statusIn($peStatus, self::PE_STATUS_AGUARDANDO_HOMOLOGACAO);
        $emExecucao = self::statusIn($peStatus, self::PE_STATUS_EM_EXECUCAO);
        $peConcluido = self::statusIn($peStatus, self::PE_STATUS_CONCLUIDO);

        return [
            'mostrar_disponivel' => true,
            'mostrar_planejado' => !$aguardandoHomologacao && $emExecucao && $temPtPactuado,
            'mostrar_executado' => !$aguardandoHomologacao && ($peConcluido || ($emExecucao && $temPtConcluido)),
        ];
    }

    public static function percentual(float $parte, float $total): float
    {
        if ($total <= 0) {
            return 0.0;
        }

        return round(($parte / $total) * 100, 2);
    }

    /**
     * @param list<StatusEnum> $enumList
     */
    private static function enumListToSqlIn(array $enumList): string
    {
        $values = array_map(static fn (StatusEnum $s): string => $s->value, $enumList);

        return "'" . implode("','", $values) . "'";
    }

    /**
     * @param list<StatusEnum> $enumList
     */
    private static function statusIn(string $status, array $enumList): bool
    {
        $values = array_map(static fn (StatusEnum $s): string => $s->value, $enumList);

        return in_array($status, $values, true);
    }
}
