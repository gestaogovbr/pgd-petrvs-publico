<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Conformidade\DataProviders;

use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Collection;

class UnidadesExecutorasPE
{
    use ResolveHierarquiaPainel;

    private const SEGMENTOS = ['Com PE vigente', 'Sem PE vigente'];

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

        // Total de UE no escopo
        $totalUE = Unidade::query()
            ->where('executora', true)
            ->whereIn('id', $unidadeIds)
            ->whereNull('deleted_at')
            ->count();

        if ($totalUE === 0) {
            return new DistribuicaoUnidadeDTO($unidade->id, $unidade->sigla, [0, 0], 0);
        }

        // UE com PE vigente
        $comPEVigente = Unidade::query()
            ->where('executora', true)
            ->whereIn('id', $unidadeIds)
            ->whereNull('deleted_at')
            ->whereExists(function ($sub) use ($filtros) {
                $sub->selectRaw('1')
                    ->from('planos_entregas')
                    ->whereColumn('planos_entregas.unidade_id', 'unidades.id')
                    ->whereNull('planos_entregas.deleted_at')
                    ->whereNotIn('planos_entregas.status', ['CANCELADO', 'SUSPENSO']);

                $this->aplicarFiltroTemporal($sub, $filtros);
            })
            ->count();

        $semPEVigente = $totalUE - $comPEVigente;

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [$comPEVigente, $semPEVigente],
            total: $totalUE,
        );
    }

    private function aplicarFiltroTemporal(mixed $query, FiltrosPainelDTO $filtros): void
    {
        $hoje = now()->toDateString();

        if ($filtros->isSituacaoAtual()) {
            $query->where('planos_entregas.data_inicio', '<=', $hoje)
                ->where('planos_entregas.data_fim', '>=', $hoje);
        }

        if ($filtros->isHistorico()) {
            $query->where('planos_entregas.data_inicio', '<=', $filtros->dataFim)
                ->where('planos_entregas.data_fim', '>=', $filtros->dataInicio);
        }
    }
}
