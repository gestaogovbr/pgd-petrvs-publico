<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\AlinhamentoDesempenho\DataProviders;

use App\Models\Avaliacao;
use App\Models\PlanoTrabalho;
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

class AvaliacoesPlanoTrabalho
{
    use ResolveHierarquiaPainel;

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

        $todosIds = $this->idsComTodasSubordinadas($unidade);
        $notas = $this->obterNotas($todosIds);
        $segmentos = $notas->pluck('label')->toArray();
        $notaIds = $notas->pluck('id')->toArray();

        $distribuicoes = [];
        $distribuicoes[] = $this->calcularDistribuicao($unidade, $filtros, $notaIds);

        foreach ($filhas as $filha) {
            $distribuicoes[] = $this->calcularDistribuicao($filha, $filtros, $notaIds);
        }

        return (new IndicadorDTO(
            segmentos: $segmentos,
            distribuicoes: $distribuicoes,
        ))->ordenarSubordinadasPorTotal();
    }

    /**
     * Busca as notas de avaliação de PT a partir do programa dos planos avaliados no escopo.
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
        $tipoAvaliacaoId = PlanoTrabalho::query()
            ->whereIn('planos_trabalhos.unidade_id', $unidadeIds)
            ->whereNull('planos_trabalhos.deleted_at')
            ->whereHas('consolidacoes', fn (Builder $q) => $q->whereHas('avaliacoes'))
            ->join('programas', 'programas.id', '=', 'planos_trabalhos.programa_id')
            ->value('programas.tipo_avaliacao_plano_trabalho_id');

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
     * @param string[] $notaIds
     */
    private function calcularDistribuicao(Unidade $unidade, FiltrosPainelDTO $filtros, array $notaIds): DistribuicaoUnidadeDTO
    {
        $unidadeIds = $this->idsComTodasSubordinadas($unidade);

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
        $hoje = now()->toDateString();

        $query = Avaliacao::query()
            ->whereNotNull('plano_trabalho_consolidacao_id')
            ->whereNull('deleted_at')
            ->whereHas('planoTrabalhoConsolidacao', function (Builder $q) use ($unidadeIds, $filtros, $hoje) {
                $q->whereHas('planoTrabalho', function (Builder $pt) use ($unidadeIds, $filtros, $hoje) {
                    $pt->whereIn('unidade_id', $unidadeIds);
                    if ($filtros->isSituacaoAtual()) {
                        $pt->where('data_inicio', '<=', $hoje)
                            ->where('data_fim', '>=', $hoje);
                    }
                    if ($filtros->isHistorico()) {
                        $pt->where('data_inicio', '<=', $filtros->dataFim)
                            ->where('data_fim', '>=', $filtros->dataInicio);
                    }
                });
            });

        return $query;
    }
}
