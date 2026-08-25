<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho;

use Carbon\Carbon;

/**
 * Calcula a Carga Horária Disponível (CHD) Bruta de um Plano de Trabalho.
 *
 * CHD Bruta = carga horária diária do plano × dias de semana (seg-sex) no período.
 * Não desconta feriados, afastamentos, férias ou quaisquer outras ocorrências.
 */
final class CHDBrutaCalculator
{
    private const DIAS_CORRIDOS_POR_SEMANA = 7;

    /**
     * @param Carbon $inicio Data de início do período (inclusiva)
     * @param Carbon $fim    Data de fim do período (inclusiva)
     * @param float  $cargaHorariaDiaria Carga horária diária do plano de trabalho
     */
    public static function calcular(Carbon $inicio, Carbon $fim, float $cargaHorariaDiaria): float
    {
        $diasDeSemana = self::contarDiasDeSemana($inicio, $fim);

        return $cargaHorariaDiaria * $diasDeSemana;
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
