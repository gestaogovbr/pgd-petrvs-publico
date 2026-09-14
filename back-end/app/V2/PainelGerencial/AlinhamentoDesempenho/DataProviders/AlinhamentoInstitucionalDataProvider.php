<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\AlinhamentoDesempenho\DataProviders;

use App\Models\PlanoEntregaEntrega;
use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class AlinhamentoInstitucionalDataProvider
{
    use ResolveHierarquiaPainel;

    private const SEGMENTOS = [
        'Vinculadas a Objetivos Estratégicos ao PEI',
        'Vinculadas a Processo da CV',
        'Vinculadas a ambos',
        'Não vinculadas',
    ];

    private const INDICE_SOMENTE_PEI = 0;
    private const INDICE_SOMENTE_CV = 1;
    private const INDICE_AMBOS = 2;
    private const INDICE_NAO_VINCULADAS = 3;
    private const QUANTIDADE_SEGMENTOS = 4;

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    protected function getUnidadeRepository(): UnidadeRepository
    {
        return $this->unidadeRepository;
    }

    public function getData(FiltrosPainelDTO $filtros): IndicadorDTO
    {
        $hierarquia = $this->resolverHierarquia($filtros->unidadeId);
        /** @var Unidade $unidade */
        $unidade = $hierarquia['unidade'];
        /** @var Collection<int, Unidade> $filhas */
        $filhas = $hierarquia['filhas'];

        $distribuicoes = [];
        $distribuicoes[] = $this->calcularDistribuicao($unidade, $filtros);

        foreach ($filhas as $filha) {
            $distribuicoes[] = $this->calcularDistribuicao($filha, $filtros);
        }

        return (new IndicadorDTO(
            segmentos: self::SEGMENTOS,
            distribuicoes: $distribuicoes,
        ))->ordenarSubordinadasPorTotal();
    }

    /**
     * Calcula a distribuição de entregas para uma unidade + todas as suas subordinadas recursivas.
     */
    protected function calcularDistribuicao(Unidade $unidade, FiltrosPainelDTO $filtros): DistribuicaoUnidadeDTO
    {
        $unidadeIds = $this->idsComTodasSubordinadas($unidade);

        $baseQuery = $this->buildBaseQuery($unidadeIds, $filtros);

        $total = (clone $baseQuery)->count();

        if ($total === 0) {
            return new DistribuicaoUnidadeDTO(
                unidadeId: $unidade->id,
                unidadeSigla: $unidade->sigla,
                valores: array_fill(0, self::QUANTIDADE_SEGMENTOS, 0),
                total: 0,
            );
        }

        $vinculadasAmbos = $this->contarVinculadasAmbos(clone $baseQuery);
        $vinculadasSomentePEI = $this->contarVinculadasSomentePEI(clone $baseQuery);
        $vinculadasSomenteCV = $this->contarVinculadasSomenteCV(clone $baseQuery);
        $naoVinculadas = $this->contarNaoVinculadas(clone $baseQuery);

        $valores = array_fill(0, self::QUANTIDADE_SEGMENTOS, 0);
        $valores[self::INDICE_SOMENTE_PEI] = $vinculadasSomentePEI;
        $valores[self::INDICE_SOMENTE_CV] = $vinculadasSomenteCV;
        $valores[self::INDICE_AMBOS] = $vinculadasAmbos;
        $valores[self::INDICE_NAO_VINCULADAS] = $naoVinculadas;

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: $valores,
            total: $total,
        );
    }

    private function contarVinculadasAmbos(Builder $query): int
    {
        return $query
            ->where(fn (Builder $q) => $q
                ->whereHas('objetivos', $this->scopeObjetivoNivel1())
                ->whereHas('processos', $this->scopeProcessoNivel3()))
            ->count();
    }

    private function contarVinculadasSomentePEI(Builder $query): int
    {
        return $query
            ->whereHas('objetivos', $this->scopeObjetivoNivel1())
            ->whereDoesntHave('processos', $this->scopeProcessoNivel3())
            ->count();
    }

    private function contarVinculadasSomenteCV(Builder $query): int
    {
        return $query
            ->whereDoesntHave('objetivos', $this->scopeObjetivoNivel1())
            ->whereHas('processos', $this->scopeProcessoNivel3())
            ->count();
    }

    private function contarNaoVinculadas(Builder $query): int
    {
        return $query
            ->whereDoesntHave('objetivos', $this->scopeObjetivoNivel1())
            ->whereDoesntHave('processos', $this->scopeProcessoNivel3())
            ->count();
    }

    /**
     * Scope para objetivos que alcançam nível 1 do planejamento (objetivo raiz).
     *
     * @return \Closure(Builder): void
     */
    private function scopeObjetivoNivel1(): \Closure
    {
        return function (Builder $q): void {
            $q->whereHas('objetivo', function (Builder $obj) {
                $obj->where(function (Builder $inner) {
                    $inner->whereNull('objetivo_pai_id')
                        ->orWhereHas('objetivoPai', fn (Builder $pai) => $pai->whereNull('objetivo_pai_id'));
                });
            });
        };
    }

    /**
     * Scope para processos que alcançam nível 3 da cadeia de valor.
     *
     * Nível 3 significa que o processo possui avô (processo_pai_id → processo_pai_id).
     *
     * @return \Closure(Builder): void
     */
    private function scopeProcessoNivel3(): \Closure
    {
        return function (Builder $q): void {
            $q->whereHas('processo', function (Builder $proc) {
                $proc->whereHas('processoPai', function (Builder $pai) {
                    $pai->whereNotNull('processo_pai_id');
                });
            });
        };
    }

    /**
     * @param string[] $unidadeIds
     */
    private function buildBaseQuery(array $unidadeIds, FiltrosPainelDTO $filtros): Builder
    {
        $query = PlanoEntregaEntrega::query()
            ->whereIn('unidade_id', $unidadeIds)
            ->whereNull('deleted_at')
            ->whereHas('planoEntrega');

        if ($filtros->isSituacaoAtual()) {
            $hoje = now()->toDateString();
            $this->aplicarIntersecaoPeriodo($query, $hoje, $hoje);
        }

        if ($filtros->isHistorico()) {
            $this->aplicarIntersecaoPeriodo($query, $filtros->dataInicio, $filtros->dataFim);
        }

        return $query;
    }

    /**
     * Aplica interseção entre o período da entrega e [$inicio, $fim].
     *
     * Entregas sem data_fim são tratadas como pontuais (data_fim = data_inicio),
     * via COALESCE, mantendo o mesmo comportamento do relatório de entregas.
     */
    private function aplicarIntersecaoPeriodo(Builder $query, string $inicio, string $fim): void
    {
        $query->whereRaw(
            '(
                (? between DATE(data_inicio) and DATE(COALESCE(data_fim, data_inicio)))
                or (? between DATE(data_inicio) and DATE(COALESCE(data_fim, data_inicio)))
                or (DATE(data_inicio) between ? and ?)
                or (DATE(COALESCE(data_fim, data_inicio)) between ? and ?)
            )',
            [$inicio, $fim, $inicio, $fim, $inicio, $fim]
        );
    }
}
