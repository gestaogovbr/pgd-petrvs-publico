<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Adesao;

use App\Enums\Atribuicao;
use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\PainelGerencial\Adesao\DTOs\SerieParticipantesPGDDTO;
use App\V2\PainelGerencial\Adesao\DTOs\SerieUnidadesExecutorasDTO;
use Illuminate\Database\Eloquent\Collection;

class SerieAdesaoService
{
    private const ATRIBUICOES_PARTICIPANTE = [Atribuicao::LOTADO, Atribuicao::COLABORADOR];

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UsuarioRepository $usuarioRepository,
        private readonly SerieAdesaoRepository $serieRepository,
    ) {}

    public function consolidar(string $periodo): void
    {
        $this->consolidarUnidadesExecutoras($periodo);
        $this->consolidarParticipantesPGD($periodo);
    }

    private function consolidarUnidadesExecutoras(string $periodo): void
    {
        /** @var Collection<int, Unidade> $unidades */
        $unidades = $this->unidadeRepository->findAll();

        foreach ($unidades as $unidade) {
            $subordinadas = $this->unidadeRepository->getSubordinadas([$unidade->id]);

            $todasUnidades = collect([$unidade])->merge($subordinadas);
            $executoras = $todasUnidades->filter(fn ($u) => (bool) $u->executora)->count();
            $naoExecutoras = $todasUnidades->count() - $executoras;

            $this->serieRepository->upsertUnidadesExecutoras(
                SerieUnidadesExecutorasDTO::fromUnidade($unidade, $periodo, $executoras, $naoExecutoras)
            );
        }
    }

    private function consolidarParticipantesPGD(string $periodo): void
    {
        /** @var Collection<int, Unidade> $unidades */
        $unidades = $this->unidadeRepository->findAll();

        foreach ($unidades as $unidade) {
            $subordinadasIds = $this->unidadeRepository->getSubordinadas([$unidade->id])->pluck('id')->toArray();
            $unidadeIds = [$unidade->id, ...$subordinadasIds];

            $usuarios = $this->usuarioRepository->findIntegrantesPorUnidades($unidadeIds, self::ATRIBUICOES_PARTICIPANTE);

            $participantes = $usuarios->filter(fn ($u) => $u->participa_pgd === 'sim')->count();
            $naoParticipantes = $usuarios->count() - $participantes;

            $this->serieRepository->upsertParticipantesPGD(
                SerieParticipantesPGDDTO::fromUnidade($unidade, $periodo, $participantes, $naoParticipantes)
            );
        }
    }

}
