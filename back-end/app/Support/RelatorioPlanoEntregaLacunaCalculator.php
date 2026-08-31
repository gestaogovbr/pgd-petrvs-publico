<?php

declare(strict_types=1);

namespace App\Support;

use Carbon\Carbon;
use Carbon\CarbonPeriod;

/**
 * Calcula lacunas de cobertura de Plano de Entrega (dias úteis seg–sex).
 */
final class RelatorioPlanoEntregaLacunaCalculator
{
    /**
     * @param list<array{executora: bool, data_inicio: string, data_fim: ?string}> $historicoExecutora
     * @param list<array{data_inicio: string, data_fim: ?string}> $planosCobertura
     * @return list<array{data_inicio: string, data_fim: string, quantidade_dias: int}>
     */
    public function calcular(
        array $historicoExecutora,
        array $planosCobertura,
        ?string $periodoConsultaInicio,
        ?string $periodoConsultaFim,
    ): array {
        $consultaInicio = $periodoConsultaInicio !== null && $periodoConsultaInicio !== ''
            ? Carbon::parse($periodoConsultaInicio)->startOfDay()
            : null;
        $consultaFim = $periodoConsultaFim !== null && $periodoConsultaFim !== ''
            ? Carbon::parse($periodoConsultaFim)->endOfDay()
            : null;

        if ($consultaInicio === null || $consultaFim === null) {
            return [];
        }

        $analiseInicio = $consultaInicio->copy();
        $analiseFim = $consultaFim->copy();

        foreach ($historicoExecutora as $periodo) {
            if (! $periodo['executora']) {
                continue;
            }
            $analiseInicio = $this->minDate($analiseInicio, Carbon::parse($periodo['data_inicio'])->startOfDay());
            $fimPeriodo = $periodo['data_fim'] !== null
                ? Carbon::parse($periodo['data_fim'])->endOfDay()
                : Carbon::today()->endOfDay();
            $analiseFim = $this->maxDate($analiseFim, $fimPeriodo);
        }

        foreach ($planosCobertura as $plano) {
            $analiseInicio = $this->minDate($analiseInicio, Carbon::parse($plano['data_inicio'])->startOfDay());
            $fimPlano = $plano['data_fim'] !== null
                ? Carbon::parse($plano['data_fim'])->endOfDay()
                : Carbon::parse($plano['data_inicio'])->endOfDay();
            $analiseFim = $this->maxDate($analiseFim, $fimPlano);
        }

        $diasLacuna = [];
        $periodo = CarbonPeriod::create($analiseInicio->toDateString(), $analiseFim->toDateString());

        foreach ($periodo as $dia) {
            if (! $dia->isWeekday()) {
                continue;
            }

            if (! $this->isExecutoraNoDia($historicoExecutora, $dia)) {
                continue;
            }

            if ($this->possuiCoberturaNoDia($planosCobertura, $dia)) {
                continue;
            }

            $diasLacuna[] = $dia->toDateString();
        }

        $lacunas = $this->agruparDiasConsecutivos($diasLacuna);

        return array_values(array_filter(
            $lacunas,
            static fn (array $lacuna): bool => self::possuiIntersecao(
                $lacuna['data_inicio'],
                $lacuna['data_fim'],
                $consultaInicio->toDateString(),
                $consultaFim->toDateString(),
            )
        ));
    }

    /**
     * @param list<array{executora: bool, data_inicio: string, data_fim: ?string}> $historicoExecutora
     */
    private function isExecutoraNoDia(array $historicoExecutora, Carbon $dia): bool
    {
        foreach ($historicoExecutora as $periodo) {
            if (! $periodo['executora']) {
                continue;
            }

            $inicio = Carbon::parse($periodo['data_inicio'])->startOfDay();
            $fim = $periodo['data_fim'] !== null
                ? Carbon::parse($periodo['data_fim'])->endOfDay()
                : null;

            if ($dia->greaterThanOrEqualTo($inicio) && ($fim === null || $dia->lessThanOrEqualTo($fim))) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param list<array{data_inicio: string, data_fim: ?string}> $planosCobertura
     */
    private function possuiCoberturaNoDia(array $planosCobertura, Carbon $dia): bool
    {
        foreach ($planosCobertura as $plano) {
            $inicio = Carbon::parse($plano['data_inicio'])->startOfDay();
            $fim = $plano['data_fim'] !== null
                ? Carbon::parse($plano['data_fim'])->endOfDay()
                : $inicio->copy()->endOfDay();

            if ($dia->greaterThanOrEqualTo($inicio) && $dia->lessThanOrEqualTo($fim)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param list<string> $dias
     * @return list<array{data_inicio: string, data_fim: string, quantidade_dias: int}>
     */
    private function agruparDiasConsecutivos(array $dias): array
    {
        if ($dias === []) {
            return [];
        }

        sort($dias);
        $lacunas = [];
        $inicio = $dias[0];
        $anterior = Carbon::parse($dias[0]);

        for ($i = 1, $total = count($dias); $i < $total; $i++) {
            $atual = Carbon::parse($dias[$i]);
            if ($this->proximoDiaUtil($anterior)->toDateString() !== $atual->toDateString()) {
                $lacunas[] = $this->montarLacuna($inicio, $anterior->toDateString());
                $inicio = $atual->toDateString();
            }
            $anterior = $atual;
        }

        $lacunas[] = $this->montarLacuna($inicio, $anterior->toDateString());

        return $lacunas;
    }

    private function montarLacuna(string $inicio, string $fim): array
    {
        return [
            'data_inicio' => $inicio,
            'data_fim' => $fim,
            'quantidade_dias' => $this->contarDiasUteis($inicio, $fim),
        ];
    }

    private function contarDiasUteis(string $inicio, string $fim): int
    {
        $contagem = 0;
        $periodo = CarbonPeriod::create($inicio, $fim);
        foreach ($periodo as $dia) {
            if ($dia->isWeekday()) {
                $contagem++;
            }
        }

        return $contagem;
    }

    private function proximoDiaUtil(Carbon $data): Carbon
    {
        $proximo = $data->copy()->addDay();
        while (! $proximo->isWeekday()) {
            $proximo->addDay();
        }

        return $proximo;
    }

    private static function possuiIntersecao(
        string $lacunaInicio,
        string $lacunaFim,
        string $consultaInicio,
        string $consultaFim,
    ): bool {
        return $lacunaInicio <= $consultaFim && $lacunaFim >= $consultaInicio;
    }

    private function minDate(Carbon $a, Carbon $b): Carbon
    {
        return $a->lessThan($b) ? $a->copy() : $b->copy();
    }

    private function maxDate(Carbon $a, Carbon $b): Carbon
    {
        return $a->greaterThan($b) ? $a->copy() : $b->copy();
    }
}
