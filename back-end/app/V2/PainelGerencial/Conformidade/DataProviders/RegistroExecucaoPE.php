<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Conformidade\DataProviders;

use App\Models\PlanoEntrega;
use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class RegistroExecucaoPE
{
    use ResolveHierarquiaPainel;

    private const SEGMENTOS = ['Concluído', 'Pendente'];

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
        $distribuicoes[] = $this->calcularDistribuicao($unidade, $filhas, $filtros);

        foreach ($filhas as $filha) {
            $distribuicoes[] = $this->calcularDistribuicao($filha, new Collection(), $filtros);
        }

        return (new IndicadorDTO(
            segmentos: self::SEGMENTOS,
            distribuicoes: $distribuicoes,
        ))->ordenarSubordinadasPorTotal();
    }

    /**
     * @param Collection<int, Unidade> $filhasParaConsolidar
     */
    private function calcularDistribuicao(Unidade $unidade, Collection $filhasParaConsolidar, FiltrosPainelDTO $filtros): DistribuicaoUnidadeDTO
    {
        $unidadeIds = [$unidade->id, ...$filhasParaConsolidar->pluck('id')->toArray()];

        $baseQuery = $this->buildBaseQuery($unidadeIds, $filtros);
        $total = (clone $baseQuery)->count();

        if ($total === 0) {
            return new DistribuicaoUnidadeDTO($unidade->id, $unidade->sigla, [0, 0], 0);
        }

        // Concluído: PE que já passou por CONCLUIDO (status CONCLUIDO ou AVALIADO)
        $concluidos = (clone $baseQuery)
            ->whereIn('status', ['CONCLUIDO', 'AVALIADO'])
            ->count();

        $pendentes = $total - $concluidos;

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [$concluidos, $pendentes],
            total: $total,
        );
    }

    /**
     * @param string[] $unidadeIds
     */
    private function buildBaseQuery(array $unidadeIds, FiltrosPainelDTO $filtros): Builder
    {
        $hoje = now()->toDateString();

        $query = PlanoEntrega::query()
            ->whereIn('unidade_id', $unidadeIds)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['CANCELADO', 'SUSPENSO']);

        if ($filtros->isSituacaoAtual()) {
            $query->where('data_inicio', '<=', $hoje)
                ->where('data_fim', '>=', $hoje);
        }

        if ($filtros->isHistorico()) {
            $query->where('data_inicio', '<=', $filtros->dataFim)
                ->where('data_fim', '>=', $filtros->dataInicio);
        }

        return $query;
    }
}
