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

    /**
     * Períodos avaliativos (consolidações) cujo esforço executado é contabilizado:
     * a partir de "Aguardando Avaliação" (status CONCLUIDO ou AVALIADO).
     */
    private const PA_STATUS_EXECUCAO_CONTABILIZADA = [
        StatusEnum::CONCLUIDO,
        StatusEnum::AVALIADO,
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
        return self::diasPeriodoSql('pt.data_fim', 'pt.data_inicio');
    }

    /**
     * Expressão SQL de dias úteis (segunda a sexta, sem feriados) entre duas colunas de data.
     */
    public static function diasPeriodoSql(string $dataFim, string $dataInicio): string
    {
        return "(5 * (DATEDIFF({$dataFim}, {$dataInicio}) DIV 7) + SUBSTRING('1234555512344445123333451222234511112345001234550', 7 * WEEKDAY({$dataInicio}) + WEEKDAY({$dataFim}) + 1, 1))";
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
     * Horas de esforço executado de uma entrega planejada (pte), somadas por período
     * avaliativo (PA) totalmente preenchido:
     *   Σ_PA ( esforco_executado% / 100 × dias úteis do PA ) × CH diária do PT.
     *
     * O fator por PA (sem CH) vem do join `pte_exec`; a CH é multiplicada aqui pois é
     * constante por PT. Entregas sem execução registrada contribuem com 0.
     */
    public static function esforcoExecutadoHorasSql(): string
    {
        return '(' . self::chdPtSql() . ' * COALESCE(pte_exec.fator_horas, 0))';
    }

    /**
     * JOIN agregado do esforço executado por entrega planejada. Considera apenas PAs
     * (consolidações) a partir de "Aguardando Avaliação" — status CONCLUIDO ou AVALIADO.
     * O filtro por registrado_at é redundante nesse estado (a conclusão do PA exige
     * todas as contribuições registradas), mantido como salvaguarda.
     * Para cada PA elegível, soma esforco_executado% × dias úteis do PA; multiplicar
     * por CH diária (feito fora) resulta nas horas executadas.
     * Expõe o alias `pte_exec` com a coluna `fator_horas`.
     */
    public static function esforcoExecutadoPteJoinSql(): string
    {
        $diasPeriodoPa = self::diasPeriodoSql('ptc.data_fim', 'ptc.data_inicio');
        $statusElegivel = self::enumListToSqlIn(self::PA_STATUS_EXECUCAO_CONTABILIZADA);

        return "LEFT JOIN (
            SELECT
                ptcc.plano_trabalho_entrega_id,
                SUM((ptcc.esforco_executado / 100.0) * {$diasPeriodoPa}) AS fator_horas
            FROM planos_trabalhos_consolidacoes_contribuicoes ptcc
            INNER JOIN planos_trabalhos_consolidacoes ptc
                ON ptc.id = ptcc.plano_trabalho_consolidacao_id AND ptc.deleted_at IS NULL
            WHERE ptcc.deleted_at IS NULL
              AND ptcc.registrado_at IS NOT NULL
              AND ptc.status IN ({$statusElegivel})
            GROUP BY ptcc.plano_trabalho_entrega_id
        ) pte_exec ON pte_exec.plano_trabalho_entrega_id = pte.id";
    }

    public static function ptStatusPlanejadoIn(): string
    {
        return self::enumListToSqlIn(self::PT_STATUS_PLANEJADO);
    }

    /**
     * @return array{mostrar_disponivel: bool, mostrar_planejado: bool, mostrar_executado: bool}
     */
    public static function visibilidadeEsforco(string $peStatus, bool $temPtPactuado, bool $temExecucaoRegistrada): array
    {
        $aguardandoHomologacao = self::statusIn($peStatus, self::PE_STATUS_AGUARDANDO_HOMOLOGACAO);
        $emExecucao = self::statusIn($peStatus, self::PE_STATUS_EM_EXECUCAO);
        $peConcluido = self::statusIn($peStatus, self::PE_STATUS_CONCLUIDO);

        return [
            'mostrar_disponivel' => true,
            'mostrar_planejado' => !$aguardandoHomologacao && $emExecucao && $temPtPactuado,
            'mostrar_executado' => !$aguardandoHomologacao && ($peConcluido || $temExecucaoRegistrada),
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
