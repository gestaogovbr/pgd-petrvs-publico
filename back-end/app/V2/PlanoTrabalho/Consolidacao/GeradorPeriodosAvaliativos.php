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
        $existentes = $this->consolidacaoRepository->findAllByPlanoTrabalhoId($plano->id);

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
        $date = Carbon::parse($data);

        return match ($programa->periodicidade_consolidacao) {
            'DIAS' => $date->addDays($programa->periodicidade_valor)->format('Y-m-d'),
            'SEMANAL' => $this->calcularSemanal($date, $programa->periodicidade_valor),
            'QUINZENAL' => $this->calcularQuinzenal($date, $programa->periodicidade_valor),
            default => $this->calcularPorMes($date, $programa),
        };
    }

    private function calcularSemanal(Carbon $date, int $valor): string
    {
        $dayWeek = $date->dayOfWeek;
        $offset = $dayWeek < $valor
            ? $valor - $dayWeek
            : 6 - $dayWeek + $valor;

        return $date->copy()->addDays($offset)->format('Y-m-d');
    }

    private function calcularQuinzenal(Carbon $date, int $valor): string
    {
        $dayWeek = $date->dayOfWeek;
        $offset = $dayWeek < $valor
            ? 7 + $valor - $dayWeek
            : 7 + 6 - $dayWeek + $valor;

        return $date->copy()->addDays($offset)->format('Y-m-d');
    }

    private function calcularPorMes(Carbon $date, Programa $programa): string
    {
        $incMonth = match ($programa->periodicidade_consolidacao) {
            'BIMESTRAL' => 1,
            'TRIMESTRAL' => 2,
            'SEMESTRAL' => 5,
            default => 0,
        };

        if ($date->day >= $programa->periodicidade_valor) {
            $incMonth++;
        }

        $primeiroDia = $date->copy()->startOfMonth()->addMonths($incMonth);
        $diasNoMes = $primeiroDia->daysInMonth;
        $dia = min($diasNoMes, $programa->periodicidade_valor) - 1;

        return $primeiroDia->addDays($dia)->format('Y-m-d');
    }
}
