<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Modalidades\DataProviders;

use App\Enums\StatusEnum;
use App\Models\PlanoTrabalho;
use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\Support\ModalidadePgd;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class ModalidadesPorUnidadeDataProvider
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

        $segmentos = array_map(
            fn (array $opt) => $opt['value'],
            ModalidadePgd::options()
        );
        $modalidadeKeys = ModalidadePgd::keys();

        $distribuicoes = [];
        $distribuicoes[] = $this->calcularDistribuicao($unidade, $filtros, $modalidadeKeys);

        foreach ($filhas as $filha) {
            $distribuicoes[] = $this->calcularDistribuicao($filha, $filtros, $modalidadeKeys);
        }

        return (new IndicadorDTO(
            segmentos: $segmentos,
            distribuicoes: $distribuicoes,
        ))->ordenarSubordinadasPorTotal();
    }

    /**
     * @param string[] $modalidadeKeys
     */
    private function calcularDistribuicao(Unidade $unidade, FiltrosPainelDTO $filtros, array $modalidadeKeys): DistribuicaoUnidadeDTO
    {
        $unidadeIds = $this->idsComTodasSubordinadas($unidade);

        $contagens = $this->buildBaseQuery($unidadeIds, $filtros)
            ->selectRaw('modalidade_pgd, COUNT(DISTINCT usuario_id) as total')
            ->groupBy('modalidade_pgd')
            ->pluck('total', 'modalidade_pgd');

        $valores = array_map(
            fn (string $key) => (int) ($contagens[$key] ?? 0),
            $modalidadeKeys
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

        $query = PlanoTrabalho::query()
            ->whereIn('unidade_id', $unidadeIds)
            ->whereNull('deleted_at')
            ->whereIn('status', [StatusEnum::ATIVO->value, StatusEnum::CONCLUIDO->value, StatusEnum::AVALIADO->value]);

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
