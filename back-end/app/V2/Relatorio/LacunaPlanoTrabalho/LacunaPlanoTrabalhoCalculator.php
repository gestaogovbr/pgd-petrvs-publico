<?php

declare(strict_types=1);

namespace App\V2\Relatorio\LacunaPlanoTrabalho;

use Carbon\Carbon;
use Carbon\CarbonPeriod;

/**
 * Identifica e agrupa lacunas de Plano de Trabalho (RN02–RN07, RN18–RN19).
 */
final class LacunaPlanoTrabalhoCalculator
{
    public const STATUS_COBERTURA = ['ATIVO', 'CONCLUIDO'];

    /** Limite para extensão do período completo da lacuna além da consulta (RN19). */
    private const EXTENSAO_MAX_ANOS = 2;

    /**
     * @param  list<array{data_inicio: string, data_fim: string|null, status: string, encerrado_at?: string|null}>  $planos
     * @param  list<array{data_inicio: string, data_fim: string|null}>  $dispensas
     * @return list<array{data_inicio: string, data_fim: string, quantidade_dias: int}>
     */
    public function calcular(
        string $periodoConsultaInicio,
        string $periodoConsultaFim,
        array $planos,
        array $dispensas,
    ): array {
        $consultaInicio = Carbon::parse($periodoConsultaInicio)->startOfDay();
        $consultaFim = Carbon::parse($periodoConsultaFim)->startOfDay();
        if ($consultaFim->lt($consultaInicio)) {
            return [];
        }

        $analiseInicio = $consultaInicio->copy()->subYears(self::EXTENSAO_MAX_ANOS);
        $analiseFim = $consultaFim->copy()->addYears(self::EXTENSAO_MAX_ANOS);

        $cobertos = $this->diasCobertos($analiseInicio, $analiseFim, $planos, $dispensas);

        // Dias de lacuna apenas no período consultado (RN18), depois estende bordas (RN19).
        $lacunaDiasConsulta = [];
        foreach (CarbonPeriod::create($consultaInicio, $consultaFim) as $dia) {
            /** @var Carbon $dia */
            if (!$this->isDiaUtil($dia)) {
                continue;
            }
            $key = $dia->toDateString();
            if (!isset($cobertos[$key])) {
                $lacunaDiasConsulta[] = $key;
            }
        }

        $grupos = $this->agruparDiasUteisConsecutivos($lacunaDiasConsulta);
        $resultado = [];
        foreach ($grupos as $grupo) {
            $estendido = $this->estenderGrupo($grupo, $cobertos, $analiseInicio, $analiseFim);
            $resultado[] = [
                'data_inicio' => $estendido[0],
                'data_fim' => $estendido[array_key_last($estendido)],
                'quantidade_dias' => count($estendido),
            ];
        }

        return $resultado;
    }

    /**
     * @param  list<array{data_inicio: string, data_fim: string|null, status: string, encerrado_at?: string|null}>  $planos
     * @param  list<array{data_inicio: string, data_fim: string|null}>  $dispensas
     * @return array<string, true>
     */
    public function diasCobertos(Carbon $inicio, Carbon $fim, array $planos, array $dispensas): array
    {
        $cobertos = [];

        foreach ($planos as $plano) {
            if (!in_array($plano['status'], self::STATUS_COBERTURA, true)) {
                continue;
            }
            if (empty($plano['data_fim'])) {
                continue;
            }
            $planoInicio = Carbon::parse($plano['data_inicio'])->startOfDay();
            $planoFim = Carbon::parse($plano['data_fim'])->startOfDay();
            if (!empty($plano['encerrado_at'])) {
                $encerrado = Carbon::parse($plano['encerrado_at'])->startOfDay();
                if ($encerrado->lt($planoFim)) {
                    $planoFim = $encerrado;
                }
            }
            $this->marcarPeriodo($cobertos, $inicio, $fim, $planoInicio, $planoFim);
        }

        foreach ($dispensas as $dispensa) {
            $dispInicio = Carbon::parse($dispensa['data_inicio'])->startOfDay();
            $dispFim = isset($dispensa['data_fim']) && $dispensa['data_fim'] !== null && $dispensa['data_fim'] !== ''
                ? Carbon::parse($dispensa['data_fim'])->startOfDay()
                : $fim->copy();
            $this->marcarPeriodo($cobertos, $inicio, $fim, $dispInicio, $dispFim);
        }

        return $cobertos;
    }

    /**
     * @param  array<string, true>  $cobertos
     */
    private function marcarPeriodo(
        array &$cobertos,
        Carbon $janelaInicio,
        Carbon $janelaFim,
        Carbon $periodoInicio,
        Carbon $periodoFim,
    ): void {
        $from = $periodoInicio->greaterThan($janelaInicio) ? $periodoInicio->copy() : $janelaInicio->copy();
        $to = $periodoFim->lessThan($janelaFim) ? $periodoFim->copy() : $janelaFim->copy();
        if ($to->lt($from)) {
            return;
        }
        foreach (CarbonPeriod::create($from, $to) as $dia) {
            /** @var Carbon $dia */
            if ($this->isDiaUtil($dia)) {
                $cobertos[$dia->toDateString()] = true;
            }
        }
    }

    public function isDiaUtil(Carbon $dia): bool
    {
        return !$dia->isWeekend();
    }

    /**
     * Agrupa dias úteis consecutivos (pula fins de semana entre eles — RN07).
     *
     * @param  list<string>  $diasYmd  ordenados
     * @return list<list<string>>
     */
    public function agruparDiasUteisConsecutivos(array $diasYmd): array
    {
        if ($diasYmd === []) {
            return [];
        }
        sort($diasYmd);
        $grupos = [];
        $atual = [$diasYmd[0]];
        for ($i = 1, $n = count($diasYmd); $i < $n; $i++) {
            $prev = Carbon::parse($diasYmd[$i - 1]);
            $curr = Carbon::parse($diasYmd[$i]);
            $esperado = $this->proximoDiaUtil($prev);
            if ($curr->equalTo($esperado)) {
                $atual[] = $diasYmd[$i];
            } else {
                $grupos[] = $atual;
                $atual = [$diasYmd[$i]];
            }
        }
        $grupos[] = $atual;

        return $grupos;
    }

    public function proximoDiaUtil(Carbon $dia): Carbon
    {
        $next = $dia->copy()->addDay();
        while ($next->isWeekend()) {
            $next->addDay();
        }

        return $next->startOfDay();
    }

    public function diaUtilAnterior(Carbon $dia): Carbon
    {
        $prev = $dia->copy()->subDay();
        while ($prev->isWeekend()) {
            $prev->subDay();
        }

        return $prev->startOfDay();
    }

    /**
     * Estende o grupo para o período completo da lacuna (RN19).
     * Só estende uma borda quando encontra cobertura delimitando a lacuna;
     * caso contrário, preserva o limite do período consultado.
     *
     * @param  list<string>  $grupo  dias úteis da lacuna dentro do período consultado
     * @param  array<string, true>  $cobertos
     * @return list<string>
     */
    private function estenderGrupo(array $grupo, array $cobertos, Carbon $limiteInicio, Carbon $limiteFim): array
    {
        $origemInicio = $grupo[0];
        $origemFim = $grupo[array_key_last($grupo)];

        $inicio = Carbon::parse($origemInicio)->startOfDay();
        $prefixo = [];
        $encontrouCoberturaInicio = false;
        while (true) {
            $prev = $this->diaUtilAnterior($inicio);
            if ($prev->lt($limiteInicio)) {
                break;
            }
            if (isset($cobertos[$prev->toDateString()])) {
                $encontrouCoberturaInicio = true;
                break;
            }
            $prefixo[] = $prev->toDateString();
            $inicio = $prev;
        }
        if ($encontrouCoberturaInicio && $prefixo !== []) {
            $grupo = array_merge(array_reverse($prefixo), $grupo);
        }

        $fim = Carbon::parse($origemFim)->startOfDay();
        $sufixo = [];
        $encontrouCoberturaFim = false;
        while (true) {
            $next = $this->proximoDiaUtil($fim);
            if ($next->gt($limiteFim)) {
                break;
            }
            if (isset($cobertos[$next->toDateString()])) {
                $encontrouCoberturaFim = true;
                break;
            }
            $sufixo[] = $next->toDateString();
            $fim = $next;
        }
        if ($encontrouCoberturaFim && $sufixo !== []) {
            $grupo = array_merge($grupo, $sufixo);
        }

        return $grupo;
    }

    /**
     * @param  list<array{tipo: string, data_inicio: string, data_fim: string|null}>  $ocorrencias
     * @return list<array{tipo: string, data_inicio: string, data_fim: string|null}>
     */
    public function ocorrenciasComIntersecao(
        string $lacunaInicio,
        string $lacunaFim,
        array $ocorrencias,
    ): array {
        $inicioLacuna = Carbon::parse($lacunaInicio)->startOfDay();
        $fimLacuna = Carbon::parse($lacunaFim)->startOfDay();
        $result = [];
        foreach ($ocorrencias as $oc) {
            $inicioOcorrencia = Carbon::parse($oc['data_inicio'])->startOfDay();
            $fimOcorrencia = isset($oc['data_fim']) && $oc['data_fim'] !== null && $oc['data_fim'] !== ''
                ? Carbon::parse($oc['data_fim'])->startOfDay()
                : $inicioOcorrencia->copy();
            if ($fimOcorrencia->lt($inicioLacuna) || $inicioOcorrencia->gt($fimLacuna)) {
                continue;
            }
            $result[] = $oc;
        }

        return $result;
    }
}
