<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Adesao\DataProviders;

use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Illuminate\Database\Eloquent\Collection;

class ParticipantesPGDDataProvider
{
    use ResolveHierarquiaPainel;

    private const SEGMENTOS = ['Participantes', 'Não Participantes'];
    private const ATRIBUICOES_PARTICIPANTE = ['LOTADO', 'COLABORADOR'];

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UsuarioRepository $usuarioRepository,
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

        $usuarios = $this->usuarioRepository->findIntegrantesPorUnidades($unidadeIds, self::ATRIBUICOES_PARTICIPANTE);

        $participantes = $usuarios->filter(fn ($u) => $u->participa_pgd === 'sim')->count();
        $naoParticipantes = $usuarios->count() - $participantes;

        return new DistribuicaoUnidadeDTO(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            valores: [$participantes, $naoParticipantes],
            total: $usuarios->count(),
        );
    }
}
