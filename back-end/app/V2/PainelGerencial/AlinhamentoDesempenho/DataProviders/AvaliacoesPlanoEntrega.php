<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\AlinhamentoDesempenho\DataProviders;

use App\Models\Avaliacao;
use App\Models\PlanoEntrega;
use App\Models\TipoAvaliacaoNota;
use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

class AvaliacoesPlanoEntrega
{
    use ResolveHierarquiaPainel;

    private const TITULO = 'Notas das avaliações dos Planos de Entregas por Unidade organizacional';
    private const INFORMACAO_ADICIONAL = 'Apresenta a distribuição percentual das notas atribuídas aos Planos de Entregas por unidade organizacional.';
    private const ORIGEM_DADOS = 'Sistema PGD Petrvs';

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

        $todosIds = $this->todosIdsHierarquia($unidade, $filhas);
        $notas = $this->obterNotas($todosIds);
        $segmentos = $notas->pluck('label')->toArray();
        $notaIds = $notas->pluck('id')->toArray();

        $distribuicoes = [];
        $distribuicoes[] = $this->calcularDistribuicao($unidade, $filhas, $filtros, $notaIds);

        foreach ($filhas as $filha) {
            $distribuicoes[] = $this->calcularDistribuicao($filha, new Collection(), $filtros, $notaIds);
        }

        return (new IndicadorDTO(
            titulo: self::TITULO,
            informacaoAdicional: self::INFORMACAO_ADICIONAL,
            origemDados: self::ORIGEM_DADOS,
            segmentos: $segmentos,
            distribuicoes: $distribuicoes,
        ))->ordenarSubordinadasPorTotal();
    }

    /**
     * Busca as notas de avaliação de PE a partir do programa dos planos avaliados no escopo.
     *
     * Premissa: todos os programas utilizam a mesma escala de avaliação (mesmos 5 níveis).
     * Caso programas com escalas diferentes coexistam no escopo, apenas a escala do primeiro
     * programa encontrado será utilizada como referência para segmentos e labels.
     *
     * @param string[] $unidadeIds
     * @return SupportCollection<int, array{id: string, label: string}>
     */
    private function obterNotas(array $unidadeIds): SupportCollection
    {
        $tipoAvaliacaoId = PlanoEntrega::query()
            ->whereIn('unidade_id', $unidadeIds)
            ->whereHas('avaliacoes')
            ->whereNull('planos_entregas.deleted_at')
            ->join('programas', 'programas.id', '=', 'planos_entregas.programa_id')
            ->value('programas.tipo_avaliacao_plano_entrega_id');

        if (!$tipoAvaliacaoId) {
            return collect();
        }

        return TipoAvaliacaoNota::query()
            ->where('tipo_avaliacao_id', $tipoAvaliacaoId)
            ->whereNull('deleted_at')
            ->orderBy('sequencia')
            ->get()
            ->map(fn (TipoAvaliacaoNota $nota) => [
                'id' => $nota->id,
                'label' => (string) (json_decode($nota->nota, true) ?? $nota->nota),
            ]);
    }

    /**
     * @param Collection<int, Unidade> $filhasParaConsolidar
     * @param string[] $notaIds
     */
    private function calcularDistribuicao(Unidade $unidade, Collection $filhasParaConsolidar, FiltrosPainelDTO $filtros, array $notaIds): DistribuicaoUnidadeDTO
    {
        $unidadeIds = [$unidade->id, ...$filhasParaConsolidar->pluck('id')->toArray()];

        $contagens = $this->buildBaseQuery($unidadeIds, $filtros)
            ->selectRaw('tipo_avaliacao_nota_id, COUNT(*) as total')
            ->groupBy('tipo_avaliacao_nota_id')
            ->pluck('total', 'tipo_avaliacao_nota_id');

        $valores = array_map(
            fn (string $notaId) => (int) ($contagens[$notaId] ?? 0),
            $notaIds
        );

        $total = array_sum($valores);

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: $valores,
            total: $total,
        );
    }

    /**
     * @param string[] $unidadeIds
     */
    private function buildBaseQuery(array $unidadeIds, FiltrosPainelDTO $filtros): Builder
    {
        $query = Avaliacao::query()
            ->whereNotNull('plano_entrega_id')
            ->whereNull('deleted_at')
            ->whereHas('planoEntrega', function (Builder $q) use ($unidadeIds) {
                $q->whereIn('unidade_id', $unidadeIds);
            });

        if ($filtros->isHistorico()) {
            $query->where('data_avaliacao', '>=', $filtros->dataInicio)
                ->where('data_avaliacao', '<=', $filtros->dataFim);
        }

        return $query;
    }
}
