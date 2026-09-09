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

        $historico = $this->normalizarHistorico($historicoExecutora);
        $planos = $this->normalizarPlanos($planosCobertura, $consultaFim);
        [$limiteInicio, $limiteFim] = $this->resolverLimitesAnalise(
            $historico,
            $planos,
            $consultaInicio,
            $consultaFim,
        );

        $diasLacuna = [];
        $periodo = CarbonPeriod::create($consultaInicio->toDateString(), $consultaFim->toDateString());

        foreach ($periodo as $dia) {
            if (! $dia->isWeekday()) {
                continue;
            }

            if (! $this->isExecutoraNoDia($historico, $dia)) {
                continue;
            }

            if ($this->possuiCoberturaNoDia($planos, $dia)) {
                continue;
            }

            $diasLacuna[] = $dia->toDateString();
        }

        $lacunas = $this->agruparDiasConsecutivos($diasLacuna);

        return array_map(
            fn (array $lacuna): array => $this->expandirLacuna(
                $lacuna,
                $historico,
                $planos,
                $limiteInicio,
                $limiteFim,
            ),
            $lacunas,
        );
    }

    /**
     * @param list<array{executora: bool, data_inicio: string, data_fim: ?string}> $historicoExecutora
     * @return list<array{executora: bool, inicio: Carbon, fim: ?Carbon}>
     */
    private function normalizarHistorico(array $historicoExecutora): array
    {
        $historico = [];
        foreach ($historicoExecutora as $periodo) {
            $historico[] = [
                'executora' => $periodo['executora'],
                'inicio' => Carbon::parse($periodo['data_inicio'])->startOfDay(),
                'fim' => $periodo['data_fim'] !== null
                    ? Carbon::parse($periodo['data_fim'])->endOfDay()
                    : null,
            ];
        }

        return $historico;
    }

    /**
     * @param list<array{data_inicio: string, data_fim: ?string}> $planosCobertura
     * @return list<array{inicio: Carbon, fim: Carbon}>
     */
    private function normalizarPlanos(array $planosCobertura, Carbon $consultaFim): array
    {
        $planos = [];
        foreach ($planosCobertura as $plano) {
            $planos[] = [
                'inicio' => Carbon::parse($plano['data_inicio'])->startOfDay(),
                'fim' => $this->resolverFimCobertura($plano['data_fim'], $consultaFim),
            ];
        }

        return $planos;
    }

    /**
     * @param list<array{executora: bool, inicio: Carbon, fim: ?Carbon}> $historico
     * @param list<array{inicio: Carbon, fim: Carbon}> $planos
     * @return array{0: Carbon, 1: Carbon}
     */
    private function resolverLimitesAnalise(
        array $historico,
        array $planos,
        Carbon $consultaInicio,
        Carbon $consultaFim,
    ): array {
        $limiteInicio = $consultaInicio->copy();
        $limiteFim = $consultaFim->copy();

        foreach ($historico as $periodo) {
            if (! $periodo['executora']) {
                continue;
            }
            $limiteInicio = $this->minDate($limiteInicio, $periodo['inicio']);
            $fimPeriodo = $periodo['fim'] ?? Carbon::today()->endOfDay();
            $limiteFim = $this->maxDate($limiteFim, $fimPeriodo);
        }

        foreach ($planos as $plano) {
            $limiteInicio = $this->minDate($limiteInicio, $plano['inicio']);
            $limiteFim = $this->maxDate($limiteFim, $plano['fim']);
        }

        return [$limiteInicio, $limiteFim];
    }

    /**
     * @param array{data_inicio: string, data_fim: string, quantidade_dias: int} $lacuna
     * @param list<array{executora: bool, inicio: Carbon, fim: ?Carbon}> $historico
     * @param list<array{inicio: Carbon, fim: Carbon}> $planos
     * @return array{data_inicio: string, data_fim: string, quantidade_dias: int}
     */
    private function expandirLacuna(
        array $lacuna,
        array $historico,
        array $planos,
        Carbon $limiteInicio,
        Carbon $limiteFim,
    ): array {
        $inicio = Carbon::parse($lacuna['data_inicio'])->startOfDay();
        $fim = Carbon::parse($lacuna['data_fim'])->startOfDay();

        $anterior = $this->diaUtilAnterior($inicio);
        while (
            $anterior->greaterThanOrEqualTo($limiteInicio)
            && $this->isDiaDeLacuna($historico, $planos, $anterior)
        ) {
            $inicio = $anterior->copy();
            $anterior = $this->diaUtilAnterior($inicio);
        }

        $proximo = $this->proximoDiaUtil($fim);
        while (
            $proximo->lessThanOrEqualTo($limiteFim)
            && $this->isDiaDeLacuna($historico, $planos, $proximo)
        ) {
            $fim = $proximo->copy();
            $proximo = $this->proximoDiaUtil($fim);
        }

        return $this->montarLacuna($inicio->toDateString(), $fim->toDateString());
    }

    /**
     * @param list<array{executora: bool, inicio: Carbon, fim: ?Carbon}> $historico
     * @param list<array{inicio: Carbon, fim: Carbon}> $planos
     */
    private function isDiaDeLacuna(array $historico, array $planos, Carbon $dia): bool
    {
        return $this->isExecutoraNoDia($historico, $dia)
            && ! $this->possuiCoberturaNoDia($planos, $dia);
    }

    /**
     * @param list<array{executora: bool, inicio: Carbon, fim: ?Carbon}> $historico
     */
    private function isExecutoraNoDia(array $historico, Carbon $dia): bool
    {
        foreach ($historico as $periodo) {
            if (! $periodo['executora']) {
                continue;
            }

            if ($dia->greaterThanOrEqualTo($periodo['inicio'])
                && ($periodo['fim'] === null || $dia->lessThanOrEqualTo($periodo['fim']))
            ) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param list<array{inicio: Carbon, fim: Carbon}> $planos
     */
    private function possuiCoberturaNoDia(array $planos, Carbon $dia): bool
    {
        foreach ($planos as $plano) {
            if ($dia->greaterThanOrEqualTo($plano['inicio']) && $dia->lessThanOrEqualTo($plano['fim'])) {
                return true;
            }
        }

        return false;
    }

    /**
     * Plano vigente sem data_fim cobre até o fim da consulta ou até hoje, o que for posterior.
     */
    private function resolverFimCobertura(?string $dataFim, Carbon $consultaFim): Carbon
    {
        if ($dataFim !== null) {
            return Carbon::parse($dataFim)->endOfDay();
        }

        return $this->maxDate($consultaFim, Carbon::today()->endOfDay());
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

    /**
     * @return array{data_inicio: string, data_fim: string, quantidade_dias: int}
     */
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

    private function diaUtilAnterior(Carbon $data): Carbon
    {
        $anterior = $data->copy()->subDay();
        while (! $anterior->isWeekday()) {
            $anterior->subDay();
        }

        return $anterior;
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
