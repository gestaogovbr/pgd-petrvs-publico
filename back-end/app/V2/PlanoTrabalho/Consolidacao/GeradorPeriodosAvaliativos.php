<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao;

use App\Enums\StatusEnum;
use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class GeradorPeriodosAvaliativos
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {}

    public function gerar(PlanoTrabalho $plano): void
    {
        $existentes = $this->consolidacaoRepository->findByPlanoTrabalhoId($plano->id);

        if ($existentes->isNotEmpty()) {
            return;
        }

        DB::transaction(function () use ($plano) {
            $dataInicio = Carbon::parse($plano->data_inicio)->startOfDay();
            $limite = Carbon::parse($plano->data_fim)->startOfDay();

            while ($dataInicio->lessThanOrEqualTo($limite)) {
                $proximoFim = Carbon::parse($this->calcularProximaData($dataInicio->toDateString(), $plano->programa));
                $dataFim = $proximoFim->greaterThan($limite) ? $limite->copy() : $proximoFim;

                $this->consolidacaoRepository->create([
                    'data_inicio' => $dataInicio->toDateString(),
                    'data_fim' => $dataFim->toDateString(),
                    'plano_trabalho_id' => $plano->id,
                    'status' => StatusEnum::INCLUIDO->value,
                ]);

                $dataInicio = $dataFim->copy()->addDay();
            }
        });
    }

    private function calcularProximaData(string $data, Programa $programa): string
    {
        $dayWeek = (int) date('w', strtotime($data));

        return match ($programa->periodicidade_consolidacao) {
            'DIAS' => date('Y-m-d', strtotime($data . ' + ' . $programa->periodicidade_valor . ' days')),
            'SEMANAL' => $this->calcularSemanal($data, $dayWeek, $programa->periodicidade_valor),
            'QUINZENAL' => $this->calcularQuinzenal($data, $dayWeek, $programa->periodicidade_valor),
            default => $this->calcularPorMes($data, $programa),
        };
    }

    private function calcularSemanal(string $data, int $dayWeek, int $valor): string
    {
        $offset = $dayWeek < $valor
            ? $valor - $dayWeek
            : 6 - $dayWeek + $valor;

        return date('Y-m-d', strtotime($data . ' + ' . $offset . ' days'));
    }

    private function calcularQuinzenal(string $data, int $dayWeek, int $valor): string
    {
        $offset = $dayWeek < $valor
            ? 7 + $valor - $dayWeek
            : 7 + 6 - $dayWeek + $valor;

        return date('Y-m-d', strtotime($data . ' + ' . $offset . ' days'));
    }

    private function calcularPorMes(string $data, Programa $programa): string
    {
        $incMonth = match ($programa->periodicidade_consolidacao) {
            'BIMESTRAL' => 1,
            'TRIMESTRAL' => 2,
            'SEMESTRAL' => 5,
            default => 0,
        };

        $ano = date('Y', strtotime($data));
        $mes = date('m', strtotime($data));
        $dia = date('d', strtotime($data));

        if ($dia >= $programa->periodicidade_valor) {
            $incMonth++;
        }

        $anoMesDia = date('Y-m-d', strtotime($ano . '-' . $mes . '-01 + ' . $incMonth . ' month'));
        $days = min(date('t', strtotime($anoMesDia)), $programa->periodicidade_valor) - 1;

        return date('Y-m-d', strtotime($anoMesDia . ' + ' . $days . ' days'));
    }
}
