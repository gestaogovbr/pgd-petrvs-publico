<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\Repository\UnidadeRepository;
use App\Services\CalendarioService;
use App\V2\Home\DTOs\HomeRequestDTO;
use App\V2\Home\Traits\ResolveUnidades;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ContribuicoesParticipantes
{
    use ResolveUnidades;

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    protected function getUnidadeRepository(): UnidadeRepository
    {
        return $this->unidadeRepository;
    }

    public function getData(HomeRequestDTO $dto): array
    {
        $unidadeIds = $this->resolverUnidades($dto);

        return $this->calcular($unidadeIds);
    }

    private function calcular(array $unidadeIds): array
    {
        $planos = DB::select(<<<SQL
            SELECT
                pt.id AS plano_id,
                pt.unidade_id,
                pt.carga_horaria,
                DATE(pt.data_inicio) AS data_inicio,
                DATE(pt.data_fim) AS data_fim,
                pte.forca_trabalho,
                pte.plano_entrega_entrega_id,
                pe.unidade_id AS pe_unidade_id
            FROM planos_trabalhos pt
            INNER JOIN planos_trabalhos_entregas pte ON pte.plano_trabalho_id = pt.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_entregas_entregas pee ON pee.id = pte.plano_entrega_entrega_id
            LEFT JOIN planos_entregas pe ON pe.id = pee.plano_entrega_id
            WHERE pt.deleted_at IS NULL
              AND pt.status IN ('ATIVO', 'CONCLUIDO', 'AVALIADO')
              AND pt.unidade_id IN ({$this->placeholders($unidadeIds)})
            ORDER BY pt.unidade_id, pt.id
        SQL, $unidadeIds);

        if (empty($planos)) {
            return [
                'entregas_propria_unidade_percentual' => 0,
                'entregas_outras_unidades_percentual' => 0,
                'nao_vinculada_entregas_percentual' => 0,
            ];
        }

        $diasUteisPorPlano = $this->calcularDiasUteisPorPlano($planos);

        $horasPropria = 0.0;
        $horasOutras = 0.0;
        $horasNaoVinculada = 0.0;

        foreach ($planos as $row) {
            $horas = (float) $row->forca_trabalho * $diasUteisPorPlano[$row->plano_id] * (float) $row->carga_horaria / 100;

            if ($row->plano_entrega_entrega_id === null) {
                $horasNaoVinculada += $horas;
            } elseif ($row->pe_unidade_id === $row->unidade_id) {
                $horasPropria += $horas;
            } else {
                $horasOutras += $horas;
            }
        }

        $total = $horasPropria + $horasOutras + $horasNaoVinculada;

        return [
            'entregas_propria_unidade_percentual' => $total > 0 ? round(($horasPropria / $total) * 100, 1) : 0,
            'entregas_outras_unidades_percentual' => $total > 0 ? round(($horasOutras / $total) * 100, 1) : 0,
            'nao_vinculada_entregas_percentual' => $total > 0 ? round(($horasNaoVinculada / $total) * 100, 1) : 0,
        ];
    }

    /** @return array<string, int> plano_id => dias_uteis */
    private function calcularDiasUteisPorPlano(array $planos): array
    {
        $diasUteisPorPlano = [];
        $unidadeAtual = null;
        $feriadosUnidade = [];

        foreach ($planos as $row) {
            if (isset($diasUteisPorPlano[$row->plano_id])) {
                continue;
            }

            if ($row->unidade_id !== $unidadeAtual) {
                $unidadeAtual = $row->unidade_id;
                $feriadosUnidade = CalendarioService::feriadosCadastrados($unidadeAtual);
            }

            $diasUteisPorPlano[$row->plano_id] = $this->contarDiasUteis(
                Carbon::parse($row->data_inicio),
                Carbon::parse($row->data_fim),
                $feriadosUnidade,
            );
        }

        return $diasUteisPorPlano;
    }

    private function contarDiasUteis(Carbon $inicio, Carbon $fim, array $feriadosCadastrados): int
    {
        $diasUteis = 0;
        $dia = $inicio->copy()->startOfDay();
        $limite = $fim->copy()->startOfDay();

        while ($dia->lte($limite)) {
            if ($dia->isWeekday() && !$this->isFeriado($dia, $feriadosCadastrados)) {
                $diasUteis++;
            }
            $dia->addDay();
        }

        return $diasUteis;
    }

    private function isFeriado(Carbon $dia, array $feriadosCadastrados): bool
    {
        $chaveRecorrente = '-' . $dia->format('m-d');
        $chaveFixa = $dia->format('Y-m-d');

        return isset($feriadosCadastrados[$chaveRecorrente]) || isset($feriadosCadastrados[$chaveFixa]);
    }

    private function placeholders(array $items): string
    {
        return implode(',', array_fill(0, count($items), '?'));
    }
}
