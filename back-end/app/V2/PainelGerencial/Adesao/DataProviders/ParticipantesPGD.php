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
