<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Adesao\DataProviders;

use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Collection;

class UnidadesExecutoras
{
    use ResolveHierarquiaPainel;

    private const SEGMENTOS = ['Executoras', 'Não Executoras'];

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

        $distribuicoesFilhas = [];

        foreach ($filhas as $filha) {
            $netasFilha = $this->getUnidadeRepository()->getSubordinadas([$filha->id]);
            $distribuicoesFilhas[] = $this->calcularDistribuicao($filha, $netasFilha);
        }

        $distribuicaoPrincipal = $this->calcularDistribuicaoPrincipal($unidade, $distribuicoesFilhas);

        return (new IndicadorDTO(
            segmentos: self::SEGMENTOS,
            distribuicoes: [$distribuicaoPrincipal, ...$distribuicoesFilhas],
        ))->ordenarSubordinadasPorTotal();
    }

    /**
     * A unidade principal consolida: self + somatório dos totais de cada filha.
     * @param DistribuicaoUnidadeDTO[] $distribuicoesFilhas
     */
    private function calcularDistribuicaoPrincipal(Unidade $unidade, array $distribuicoesFilhas): DistribuicaoUnidadeDTO
    {
        $selfExecutora = (bool) $unidade->executora ? 1 : 0;
        $selfNaoExecutora = 1 - $selfExecutora;

        $executoras = $selfExecutora + array_sum(array_map(fn (DistribuicaoUnidadeDTO $d) => $d->valores[0], $distribuicoesFilhas));
        $naoExecutoras = $selfNaoExecutora + array_sum(array_map(fn (DistribuicaoUnidadeDTO $d) => $d->valores[1], $distribuicoesFilhas));

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [$executoras, $naoExecutoras],
            total: $executoras + $naoExecutoras,
        );
    }

    private function calcularDistribuicao(Unidade $unidade, Collection $filhasParaConsolidar): DistribuicaoUnidadeDTO
    {
        $unidadeIds = [$unidade->id, ...$filhasParaConsolidar->pluck('id')->toArray()];

        $unidades = Unidade::query()
            ->whereIn('id', $unidadeIds)
            ->whereNull('deleted_at')
            ->get();

        $executoras = $unidades->filter(fn (Unidade $u) => (bool) $u->executora)->count();
        $naoExecutoras = $unidades->count() - $executoras;

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [$executoras, $naoExecutoras],
            total: $unidades->count(),
        );
    }
}
