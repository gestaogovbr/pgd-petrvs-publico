<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao;

use App\Models\Afastamento;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\Afastamento\Contracts\AfastamentoReadRepositoryContract;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Collection;

class DispensaAvaliacaoPolicy
{
    public function __construct(
        private readonly AfastamentoReadRepositoryContract $afastamentoRepository,
    ) {
    }

    /**
     * @return string[] IDs das consolidações dispensadas
     */
    public function consolidacoesDispensadas(string $usuarioId, CarbonPeriod $vigenciaPT, Collection $consolidacoes): array
    {
        $intervalos = $this->getMergedIntervalos($usuarioId, $vigenciaPT);

        if (empty($intervalos)) {
            return [];
        }

        $dispensadas = [];

        foreach ($consolidacoes as $consolidacao) {
            /** @var PlanoTrabalhoConsolidacao $consolidacao */
            $periodo = CarbonPeriod::create(
                Carbon::parse($consolidacao->data_inicio)->startOfDay(),
                Carbon::parse($consolidacao->data_fim)->startOfDay(),
            );

            if (self::isCoberta($periodo, $intervalos)) {
                $dispensadas[] = $consolidacao->id;
            }
        }

        return $dispensadas;
    }

    /**
     * @return CarbonPeriod[]
     */
    public function getMergedIntervalos(string $usuarioId, CarbonPeriod $vigenciaPT): array
    {
        $afastamentos = $this->afastamentoRepository->findAfastamentosParaDispensa(
            $usuarioId,
            $vigenciaPT,
        );

        if ($afastamentos->isEmpty()) {
            return [];
        }

        $intervalos = $afastamentos->map(fn (Afastamento $a) => CarbonPeriod::create(
            Carbon::parse($a->data_inicio)->startOfDay(),
            Carbon::parse($a->data_fim)->startOfDay(),
        ))->all();

        return self::mergeIntervalos($intervalos);
    }

    /**
     * @param CarbonPeriod[] $intervalos
     * @return CarbonPeriod[]
     */
    public static function mergeIntervalos(array $intervalos): array
    {
        if (empty($intervalos)) {
            return [];
        }

        usort($intervalos, fn (CarbonPeriod $a, CarbonPeriod $b) => $a->start->lt($b->start) ? -1 : 1);

        $merged = [];
        $current = $intervalos[0];

        for ($i = 1, $count = count($intervalos); $i < $count; $i++) {
            $next = $intervalos[$i];

            if ($next->start->lte($current->end->copy()->addDay())) {
                if ($next->end->gt($current->end)) {
                    $current = CarbonPeriod::create($current->start, $next->end);
                }
            } else {
                $merged[] = $current;
                $current = $next;
            }
        }

        $merged[] = $current;

        return $merged;
    }

    /**
     * @param CarbonPeriod[] $intervalos
     */
    public static function isCoberta(CarbonPeriod $periodo, array $intervalos): bool
    {
        foreach ($intervalos as $intervalo) {
            if ($intervalo->start->lte($periodo->start) && $intervalo->end->gte($periodo->end)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Verifica se um período de consolidação está dispensado com os afastamentos atuais.
     */
    public function isConsolidacaoDispensada(string $usuarioId, CarbonPeriod $vigenciaPT, CarbonPeriod $periodoConsolidacao): bool
    {
        $intervalos = $this->getMergedIntervalos($usuarioId, $vigenciaPT);

        return !empty($intervalos) && self::isCoberta($periodoConsolidacao, $intervalos);
    }

    /**
     * Verifica se um período de consolidação SERÁ dispensado após incluir/editar/excluir uma ocorrência.
     * Para exclusão: passar ocorrenciaIdExcluir e dataInicioOcorrencia/dataFimOcorrencia como null.
     */
    public function isConsolidacaoDispensadaApos(
        string $usuarioId,
        CarbonPeriod $vigenciaPT,
        CarbonPeriod $periodoConsolidacao,
        ?string $dataInicioOcorrencia,
        ?string $dataFimOcorrencia,
        ?string $ocorrenciaIdExcluir = null,
    ): bool {
        $afastamentos = $this->afastamentoRepository->findAfastamentosParaDispensa(
            $usuarioId,
            $vigenciaPT,
        );

        if ($ocorrenciaIdExcluir !== null) {
            $afastamentos = $afastamentos->reject(fn (Afastamento $a) => $a->id === $ocorrenciaIdExcluir);
        }

        $intervalos = $afastamentos->map(fn (Afastamento $a) => CarbonPeriod::create(
            Carbon::parse($a->data_inicio)->startOfDay(),
            Carbon::parse($a->data_fim)->startOfDay(),
        ))->all();

        if ($dataInicioOcorrencia !== null && $dataFimOcorrencia !== null) {
            $intervalos[] = CarbonPeriod::create(
                Carbon::parse($dataInicioOcorrencia)->startOfDay(),
                Carbon::parse($dataFimOcorrencia)->startOfDay(),
            );
        }

        if (empty($intervalos)) {
            return false;
        }

        $merged = self::mergeIntervalos($intervalos);

        return self::isCoberta($periodoConsolidacao, $merged);
    }
}
