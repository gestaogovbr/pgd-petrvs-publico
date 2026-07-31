<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho;

use Carbon\Carbon;

/**
 * Calcula a Carga Horária Disponível (CHD) Bruta de um Plano de Trabalho.
 *
 * CHD Bruta = jornada diária do participante × dias de semana (seg-sex) no período.
 * Não desconta feriados, afastamentos, férias ou quaisquer outras ocorrências.
 */
final class CHDBrutaCalculator
{
    private const DIAS_POR_SEMANA = 5;
    private const DIAS_CORRIDOS_POR_SEMANA = 7;
    private const JORNADA_SEMANAL_PADRAO = 40;

    /**
     * @param Carbon $inicio Data de início do período (inclusiva)
     * @param Carbon $fim    Data de fim do período (inclusiva)
     * @param int|null $codJornada Jornada semanal SIAPE (40, 30, 20). Assume 40 se null.
     */
    public static function calcular(Carbon $inicio, Carbon $fim, ?int $codJornada): float
    {
        $jornadaDiaria = self::jornadaDiaria($codJornada);
        $diasDeSemana = self::contarDiasDeSemana($inicio, $fim);

        return $jornadaDiaria * $diasDeSemana;
    }

    /**
     * Converte a jornada semanal SIAPE em jornada diária.
     * Ex: 40h/semana → 8h/dia, 30h → 6h, 20h → 4h.
     */
    public static function jornadaDiaria(?int $codJornada): float
    {
        $jornadaSemanal = $codJornada ?? self::JORNADA_SEMANAL_PADRAO;

        return $jornadaSemanal / self::DIAS_POR_SEMANA;
    }

    /**
     * Conta os dias de segunda a sexta-feira no intervalo [inicio, fim] (ambos inclusivos).
     * Algoritmo O(1): total de dias corridos menos a quantidade de sábados e domingos no período.
     */
    public static function contarDiasDeSemana(Carbon $inicio, Carbon $fim): int
    {
        if ($fim->lt($inicio)) {
            return 0;
        }

        $totalDias = $inicio->diffInDays($fim) + 1;

        $primeiroSabado = $inicio->copy()->isSaturday() ? $inicio->copy() : $inicio->copy()->next(Carbon::SATURDAY);
        $primeiroDomingo = $inicio->copy()->isSunday() ? $inicio->copy() : $inicio->copy()->next(Carbon::SUNDAY);

        $sabados = $primeiroSabado->lte($fim)
            ? intdiv($primeiroSabado->diffInDays($fim), self::DIAS_CORRIDOS_POR_SEMANA) + 1
            : 0;

        $domingos = $primeiroDomingo->lte($fim)
            ? intdiv($primeiroDomingo->diffInDays($fim), self::DIAS_CORRIDOS_POR_SEMANA) + 1
            : 0;

        return $totalDias - $sabados - $domingos;
    }
}
