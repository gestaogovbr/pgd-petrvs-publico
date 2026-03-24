<?php

namespace App\V2;

use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Programa;
use App\Enums\StatusEnum;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CalculadoraPeriodosAvaliativos
{
    public function calcularProximaData(string $data, Programa $programa): string
    {
        $dayWeek = date('w', strtotime($data));
        switch ($programa->periodicidade_consolidacao) {
            case 'DIAS':
                return date("Y-m-d", strtotime($data . " + " . $programa->periodicidade_valor . " days"));
            case 'SEMANAL':
                $offset = $dayWeek < $programa->periodicidade_valor
                    ? $programa->periodicidade_valor - $dayWeek
                    : 6 - $dayWeek + $programa->periodicidade_valor;
                return date("Y-m-d", strtotime($data . " + " . $offset . " days"));
            case 'QUINZENAL':
                $offset = $dayWeek < $programa->periodicidade_valor
                    ? 7 + $programa->periodicidade_valor - $dayWeek
                    : 7 + 6 - $dayWeek + $programa->periodicidade_valor;
                return date("Y-m-d", strtotime($data . " + " . $offset . " days"));
            default:
                return $this->calcularPorMes($data, $programa);
        }
    }

    protected function calcularPorMes(string $data, Programa $programa): string
    {
        $incMonth = match ($programa->periodicidade_consolidacao) {
            'BIMESTRAL' => 1,
            'TRIMESTRAL' => 2,
            'SEMESTRAL' => 5,
            default => 0, // MENSAL
        };

        $ano = date('Y', strtotime($data));
        $mes = date('m', strtotime($data));
        $dia = date('d', strtotime($data));

        if ($dia >= $programa->periodicidade_valor) {
            $incMonth++;
        }

        $anoMesDia = date("Y-m-d", strtotime($ano . "-" . $mes . "-01 + " . $incMonth . " month"));
        $days = min(date('t', strtotime($anoMesDia)), $programa->periodicidade_valor) - 1;

        return date("Y-m-d", strtotime($anoMesDia . " + " . $days . " days"));
    }

    public function gerarPeriodos(PlanoTrabalho $plano): void
    {
        DB::transaction(function () use ($plano) {
            $existentes = $plano->consolidacoes->sortBy('data_inicio')->values();
            $merged = [];
            $dataInicio = Carbon::parse($plano->data_inicio)->startOfDay();
            $limite = Carbon::parse($plano->data_fim)->startOfDay();

            while ($dataInicio->lessThanOrEqualTo($limite)) {
                $proximoFim = Carbon::parse($this->calcularProximaData($dataInicio->toDateString(), $plano->programa));
                $dataFim = $proximoFim->greaterThan($limite) ? $limite->copy() : $proximoFim;

                $igual = $existentes->first(fn($c) =>
                    $c->data_inicio === $dataInicio->toDateString() && $c->data_fim === $dataFim->toDateString()
                );

                $intersecao = $existentes->first(fn($c) =>
                    $c->status !== StatusEnum::INCLUIDO->value &&
                    $dataInicio->lessThanOrEqualTo(Carbon::parse($c->data_fim)) &&
                    $dataFim->greaterThanOrEqualTo(Carbon::parse($c->data_inicio))
                );

                if (!empty($igual)) {
                    $merged[] = $igual;
                    $existentes = $existentes->reject(fn($e) => $e->id === $igual->id)->values();
                    $dataInicio = Carbon::parse($igual->data_fim)->addDay();
                } elseif (!empty($intersecao)) {
                    $existentes = $existentes->reject(fn($e) => $e->id === $intersecao->id)->values();
                    if ($intersecao->data_inicio === $dataInicio->toDateString()) {
                        $dataInicio = Carbon::parse($intersecao->data_fim)->addDay();
                    } else {
                        $novo = PlanoTrabalhoConsolidacao::create([
                            'data_inicio' => $dataInicio->toDateString(),
                            'data_fim' => Carbon::parse($intersecao->data_inicio)->subDay()->toDateString(),
                            'plano_trabalho_id' => $plano->id,
                            'status' => StatusEnum::INCLUIDO->value,
                        ]);
                        $merged[] = $novo;
                        $dataInicio = Carbon::parse($intersecao->data_inicio);
                    }
                } else {
                    $novo = PlanoTrabalhoConsolidacao::create([
                        'data_inicio' => $dataInicio->toDateString(),
                        'data_fim' => $dataFim->toDateString(),
                        'plano_trabalho_id' => $plano->id,
                        'status' => StatusEnum::INCLUIDO->value,
                    ]);
                    $merged[] = $novo;
                    $dataInicio = $dataFim->copy()->addDay();
                }
            }

            foreach ($existentes as $anterior) {
                $anterior->delete();
            }

            $this->ajustarDatasFim($plano->id);
        });
    }

    protected function ajustarDatasFim(string $planoId): void
    {
        $consolidacoes = PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $planoId)
            ->orderBy('data_inicio')
            ->get();

        for ($i = 1; $i < $consolidacoes->count(); $i++) {
            $anterior = $consolidacoes[$i - 1];
            $fimEsperado = Carbon::parse($consolidacoes[$i]->data_inicio)->subDay()->toDateString();
            if ($anterior->data_fim !== $fimEsperado) {
                $anterior->update(['data_fim' => $fimEsperado]);
            }
        }
    }
}
