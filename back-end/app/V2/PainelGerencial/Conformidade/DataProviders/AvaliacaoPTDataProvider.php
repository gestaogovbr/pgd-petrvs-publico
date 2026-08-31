<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Conformidade\DataProviders;

use App\Enums\StatusEnum;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class AvaliacaoPTDataProvider
{
    use ResolveHierarquiaPainel;

    private const SEGMENTOS = ['Avaliado', 'Aguardando'];

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
     */
    private function calcularDistribuicao(Unidade $unidade, FiltrosPainelDTO $filtros): DistribuicaoUnidadeDTO
    {
        $unidadeIds = $this->idsComTodasSubordinadas($unidade);

        $baseQuery = $this->buildBaseQuery($unidadeIds, $filtros);

        // Avaliados: consolidações com status AVALIADO
        $avaliados = (clone $baseQuery)
            ->where('planos_trabalhos_consolidacoes.status', StatusEnum::AVALIADO->value)
            ->count();

        // Aguardando: consolidações CONCLUIDO cuja conclusão foi há <= 20 dias (sem avaliação, dentro do prazo)
        $aguardando = (clone $baseQuery)
            ->where('planos_trabalhos_consolidacoes.status', StatusEnum::CONCLUIDO->value)
            ->whereRaw('CURDATE() <= DATE_ADD(CAST(planos_trabalhos_consolidacoes.data_conclusao AS DATE), INTERVAL 20 DAY)')
            ->count();

        $total = $avaliados + $aguardando;

        if ($total === 0) {
            return new DistribuicaoUnidadeDTO($unidade->id, $unidade->sigla, [0, 0], 0);
        }

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [$avaliados, $aguardando],
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
            ->whereIn('planos_trabalhos_consolidacoes.status', [StatusEnum::CONCLUIDO->value, StatusEnum::AVALIADO->value])
            ->whereHas('planoTrabalho', function (Builder $pt) use ($unidadeIds, $filtros, $hoje) {
                $pt->whereIn('unidade_id', $unidadeIds)
                    ->whereNull('deleted_at')
                    ->whereIn('status', [StatusEnum::ATIVO->value, StatusEnum::CONCLUIDO->value, StatusEnum::AVALIADO->value]);

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
