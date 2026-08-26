<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

/**
 * Regras de exibição e cálculo de esforço do painel lateral / modal de entregas.
 */
final class ObjetivoPainelEsforcoSupport
{
    /** CHD (horas/dia) usada quando o PT não possui carga_horaria informada (= 0). */
    private const CHD_FALLBACK_HORAS = 8;

    /** Divisor da jornada semanal para obter a CHD (usado pela Cadeia de Valor). */
    private const JORNADA_DIVISOR = 5.0;

    /** Jornada semanal padrão em horas (usado pela Cadeia de Valor). */
    private const JORNADA_PADRAO = 40;

    /** PTs que contam para esforço planejado (pactuados). */
    private const PT_STATUS_PLANEJADO = ['AGUARDANDO_ASSINATURA', 'ATIVO', 'CONCLUIDO', 'AVALIADO'];

    /** PTs que contam para esforço executado. */
    private const PT_STATUS_EXECUTADO = ['CONCLUIDO'];

    /**
     * Expressão SQL da CHD (carga horária diária) do PT, fonte do cálculo de esforço.
     * Usa a CHD registrada no próprio plano de trabalho (informação do período),
     * com fallback fixo quando o PT tem carga_horaria zerada.
     */
    public static function chdPtSql(): string
    {
        $fallback = self::CHD_FALLBACK_HORAS;

        return "COALESCE(NULLIF(pt.carga_horaria, 0), {$fallback})";
    }

    public static function jornadaDivisor(): float
    {
        return self::JORNADA_DIVISOR;
    }

    public static function jornadaPadrao(): int
    {
        return self::JORNADA_PADRAO;
    }

    public static function ptStatusPlanejadoIn(): string
    {
        return "'" . implode("','", self::PT_STATUS_PLANEJADO) . "'";
    }

    public static function ptStatusExecutadoIn(): string
    {
        return "'" . implode("','", self::PT_STATUS_EXECUTADO) . "'";
    }

    /**
     * @return array{mostrar_disponivel: bool, mostrar_planejado: bool, mostrar_executado: bool}
     */
    public static function visibilidadeEsforco(string $peStatus, bool $temPtPactuado, bool $temPtConcluido): array
    {
        $aguardandoHomologacao = in_array($peStatus, ['INCLUIDO', 'HOMOLOGANDO'], true);
        $emExecucao = in_array($peStatus, ['ATIVO', 'CONCLUIDO', 'AVALIADO'], true);
        $peConcluido = in_array($peStatus, ['CONCLUIDO', 'AVALIADO'], true);

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
}
