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

class AlinhamentoInstitucional
{
    use ResolveHierarquiaPainel;

    private const TITULO = 'Alinhamento institucional das Unidades por nível estratégico';
    private const INFORMACAO_ADICIONAL = 'Apresenta a distribuição percentual das entregas de acordo com seu nível de alinhamento institucional, considerando entregas vinculadas ao Planejamento Institucional, à Cadeia de Valor e entregas sem vinculação. São consideradas vinculadas ao Planejamento Institucional as entregas cujo encadeamento alcance o nível de Objetivo Estratégico (nível 1). São consideradas vinculadas à Cadeia de Valor as entregas cujo encadeamento alcance, no mínimo, o terceiro nível de processo (nível 3).';
    private const ORIGEM_DADOS = 'Sistema PGD Petrvs';

    private const SEGMENTOS = [
        'Vinculadas a Objetivos Estratégicos ao PEI',
        'Vinculadas a Processo da CV',
        'Não vinculadas',
    ];

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
            titulo: self::TITULO,
            informacaoAdicional: self::INFORMACAO_ADICIONAL,
            origemDados: self::ORIGEM_DADOS,
            segmentos: self::SEGMENTOS,
            distribuicoes: $distribuicoes,
        ))->ordenarSubordinadasPorTotal();
    }

    /**
     * Calcula a distribuição de entregas para uma unidade (e opcionalmente suas filhas diretas para o consolidado).
     *
     * @param Collection<int, Unidade> $filhasParaConsolidar
     */
    private function calcularDistribuicao(Unidade $unidade, Collection $filhasParaConsolidar, FiltrosPainelDTO $filtros): DistribuicaoUnidadeDTO
    {
        $unidadeIds = [$unidade->id, ...$filhasParaConsolidar->pluck('id')->toArray()];

        $baseQuery = $this->buildBaseQuery($unidadeIds, $filtros);

        $total = (clone $baseQuery)->count();

        if ($total === 0) {
            return new DistribuicaoUnidadeDTO(
                unidadeId: $unidade->id,
                unidadeSigla: $unidade->sigla,
                valores: [0, 0, 0],
                total: 0,
            );
        }

        $vinculadasPEI = (clone $baseQuery)
            ->whereHas('objetivos', function (Builder $q) {
                $q->whereHas('objetivo', function (Builder $obj) {
                    // Nível 1 = objetivo raiz (sem pai dentro do mesmo planejamento)
                    $obj->whereNull('objetivo_pai_id');
                })->orWhereHas('objetivo', function (Builder $obj) {
                    // Ou que tenha no encadeamento um ancestral de nível 1
                    $obj->whereHas('objetivoPai', fn (Builder $pai) => $pai->whereNull('objetivo_pai_id'));
                });
            })
            ->count();

        $vinculadasCV = (clone $baseQuery)
            ->whereHas('processos', function (Builder $q) {
                $q->whereHas('processo', function (Builder $proc) {
                    // Nível 3+ = path tem pelo menos 2 separadores (2 ancestrais)
                    $proc->whereRaw("LENGTH(path) - LENGTH(REPLACE(path, '/', '')) >= 2");
                });
            })
            ->count();

        // Entregas sem nenhum vínculo (nem a objetivos do PEI, nem a processos da CV)
        $naoVinculadas = (clone $baseQuery)
            ->whereDoesntHave('objetivos')
            ->whereDoesntHave('processos')
            ->count();

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [$vinculadasPEI, $vinculadasCV, $naoVinculadas],
            total: $total,
        );
    }

    /**
     * @param string[] $unidadeIds
     */
    private function buildBaseQuery(array $unidadeIds, FiltrosPainelDTO $filtros): Builder
    {
        $query = PlanoEntregaEntrega::query()
            ->whereIn('unidade_id', $unidadeIds)
            ->whereNull('deleted_at');

        if ($filtros->isHistorico()) {
            $query->where('data_inicio', '<=', $filtros->dataFim)
                ->where('data_fim', '>=', $filtros->dataInicio);
        }

        return $query;
    }
}
