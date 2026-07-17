<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Conformidade\DataProviders;

use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class AvaliacaoPT
{
    use ResolveHierarquiaPainel;

    private const SEGMENTOS = ['Avaliado', 'Pendente'];

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

        // Total: consolidações já concluídas (passíveis de avaliação)
        $baseQuery = $this->buildBaseQuery($unidadeIds, $filtros);
        $total = (clone $baseQuery)->count();

        if ($total === 0) {
            return new DistribuicaoUnidadeDTO($unidade->id, $unidade->sigla, [0, 0], 0);
        }

        $avaliados = (clone $baseQuery)
            ->where('planos_trabalhos_consolidacoes.status', 'AVALIADO')
            ->count();

        $pendentes = $total - $avaliados;

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [$avaliados, $pendentes],
            total: $total,
        );
    }

    /**
     * Consolidações concluídas ou avaliadas (passíveis de avaliação).
     *
     * @param string[] $unidadeIds
     */
    private function buildBaseQuery(array $unidadeIds, FiltrosPainelDTO $filtros): Builder
    {
        $hoje = now()->toDateString();

        $query = PlanoTrabalhoConsolidacao::query()
            ->whereNull('planos_trabalhos_consolidacoes.deleted_at')
            ->whereIn('planos_trabalhos_consolidacoes.status', ['CONCLUIDO', 'AVALIADO'])
            ->whereHas('planoTrabalho', function (Builder $pt) use ($unidadeIds, $filtros, $hoje) {
                $pt->whereIn('unidade_id', $unidadeIds)
                    ->whereNull('deleted_at')
                    ->whereIn('status', ['ATIVO', 'CONCLUIDO', 'AVALIADO']);

                if ($filtros->isSituacaoAtual()) {
                    $pt->where('data_inicio', '<=', $hoje)
                        ->where('data_fim', '>=', $hoje);
                }

                if ($filtros->isHistorico()) {
                    $pt->where('data_inicio', '<=', $filtros->dataFim)
                        ->where('data_fim', '>=', $filtros->dataInicio);
                }
            });

        return $query;
    }
}
