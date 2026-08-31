<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Conformidade\DataProviders;

use App\Enums\StatusEnum;
use App\Models\PlanoEntrega;
use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class AvaliacaoPEDataProvider
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

        // Avaliados: PEs com status AVALIADO
        $avaliados = (clone $baseQuery)
            ->where('status', StatusEnum::AVALIADO->value)
            ->count();

        // Aguardando: PEs concluídos (não avaliados) cuja conclusão foi há <= 30 dias
        $aguardando = (clone $baseQuery)
            ->where('status', StatusEnum::CONCLUIDO->value)
            ->whereExists(function ($sub) {
                $sub->selectRaw('1')
                    ->from('status_justificativas')
                    ->whereColumn('status_justificativas.plano_entrega_id', 'planos_entregas.id')
                    ->where('status_justificativas.codigo', 'CONCLUIDO')
                    ->whereNull('status_justificativas.deleted_at')
                    ->whereRaw('CURDATE() <= DATE_ADD(CAST(status_justificativas.created_at AS DATE), INTERVAL 30 DAY)');
            })
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
     * PEs concluídos ou avaliados (passíveis de avaliação).
     *
     * @param string[] $unidadeIds
     */
    private function buildBaseQuery(array $unidadeIds, FiltrosPainelDTO $filtros): Builder
    {
        $hoje = now()->toDateString();

        $query = PlanoEntrega::query()
            ->whereIn('unidade_id', $unidadeIds)
            ->whereNull('deleted_at')
            ->whereIn('status', [StatusEnum::CONCLUIDO->value, StatusEnum::AVALIADO->value]);

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
