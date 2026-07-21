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

        $distribuicoes = [];
        $distribuicoes[] = $this->calcularDistribuicao($unidade);

        foreach ($filhas as $filha) {
            $distribuicoes[] = $this->calcularDistribuicao($filha);
        }

        return (new IndicadorDTO(
            segmentos: self::SEGMENTOS,
            distribuicoes: $distribuicoes,
        ))->ordenarSubordinadasPorTotal();
    }

    private function calcularDistribuicao(Unidade $unidade): DistribuicaoUnidadeDTO
    {
        $unidadeIds = $this->idsComTodasSubordinadas($unidade);

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
