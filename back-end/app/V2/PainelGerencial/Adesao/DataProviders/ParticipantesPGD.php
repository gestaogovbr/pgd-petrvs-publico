<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Adesao\DataProviders;

use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Collection;

class ParticipantesPGD
{
    use ResolveHierarquiaPainel;

    private const SEGMENTOS = ['Participantes', 'Não Participantes'];

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
     * A unidade principal consolida: participantes de self + somatório dos totais de cada filha.
     * @param DistribuicaoUnidadeDTO[] $distribuicoesFilhas
     */
    private function calcularDistribuicaoPrincipal(Unidade $unidade, array $distribuicoesFilhas): DistribuicaoUnidadeDTO
    {
        $selfDistribuicao = $this->calcularDistribuicao($unidade, new Collection());

        $participantes = $selfDistribuicao->valores[0] + array_sum(array_map(fn (DistribuicaoUnidadeDTO $d) => $d->valores[0], $distribuicoesFilhas));
        $naoParticipantes = $selfDistribuicao->valores[1] + array_sum(array_map(fn (DistribuicaoUnidadeDTO $d) => $d->valores[1], $distribuicoesFilhas));

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [$participantes, $naoParticipantes],
            total: $participantes + $naoParticipantes,
        );
    }

    private function calcularDistribuicao(Unidade $unidade, Collection $filhasParaConsolidar): DistribuicaoUnidadeDTO
    {
        $unidadeIds = [$unidade->id, ...$filhasParaConsolidar->pluck('id')->toArray()];

        $usuarios = Usuario::query()
            ->whereHas('unidadesIntegrantes', fn ($q) => $q
                ->whereIn('unidade_id', $unidadeIds)
                ->whereHas('atribuicoes', fn ($a) => $a->whereIn('atribuicao', ['LOTADO', 'COLABORADOR']))
            )
            ->whereNull('deleted_at')
            ->get();

        $participantes = $usuarios->filter(fn (Usuario $u) => $u->participa_pgd === 'sim')->count();
        $naoParticipantes = $usuarios->count() - $participantes;

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [$participantes, $naoParticipantes],
            total: $usuarios->count(),
        );
    }
}
