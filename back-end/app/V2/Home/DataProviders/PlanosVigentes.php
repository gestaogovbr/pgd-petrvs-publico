<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\Enums\Atribuicao;
use App\Enums\StatusEnum;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\UnidadeRepository;
use App\V2\Home\DTOs\HomeRequestDTO;
use App\V2\Home\Traits\ResolveUnidades;

class PlanosVigentes
{
    use ResolveUnidades;

    private const PARTICIPA_PGD = 'sim';

    /** @var string[] Atribuições consideradas como agente da unidade: lotado + chefia titular/substituta */
    private const ATRIBUICOES_AGENTE = [
        Atribuicao::LOTADO->value,
        Atribuicao::GESTOR->value,
        Atribuicao::GESTOR_SUBSTITUTO->value,
    ];

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    protected function getUnidadeRepository(): UnidadeRepository
    {
        return $this->unidadeRepository;
    }

    /**
     * @return array{
     *   unidades_com_plano_entregas: array{quantidade: int, total: int, percentual: float},
     *   participantes_com_plano_trabalho: array{quantidade: int, total: int, percentual: float},
     * }
     */
    public function getData(HomeRequestDTO $dto): array
    {
        $escopo = $this->resolverUnidades($dto);

        return [
            'unidades_com_plano_entregas' => $this->indicadorUnidadesComPE($escopo),
            'participantes_com_plano_trabalho' => $this->indicadorParticipantesComPT($escopo),
        ];
    }

    /**
     * @return array{quantidade: int, total: int, percentual: float}
     */
    private function indicadorUnidadesComPE(array $unidadesEscopo): array
    {
        $total = $this->unidadesExecutorasQuery($unidadesEscopo)->count();

        if ($total === 0) {
            return ['quantidade' => 0, 'total' => 0, 'percentual' => 0.0];
        }

        $hoje = now()->toDateString();

        $quantidade = $this->unidadesExecutorasQuery($unidadesEscopo)
            ->whereHas('planosEntrega', function ($q) use ($hoje) {
                $q->where('status', StatusEnum::ATIVO->value)
                    ->where('data_inicio', '<=', $hoje)
                    ->where('data_fim', '>=', $hoje);
            })
            ->count();

        return [
            'quantidade' => $quantidade,
            'total' => $total,
            'percentual' => round(($quantidade / $total) * 100, 1),
        ];
    }

    /**
     * Unidades executoras dentro do escopo. Retorna um builder novo a cada chamada
     * para que os filtros de "quantidade" não vazem para a contagem de "total".
     *
     * @param string[] $unidadesEscopo
     * @return \Illuminate\Database\Eloquent\Builder<Unidade>
     */
    private function unidadesExecutorasQuery(array $unidadesEscopo): \Illuminate\Database\Eloquent\Builder
    {
        return Unidade::query()
            ->where('executora', true)
            ->whereIn('id', $unidadesEscopo);
    }

    /**
     * @return array{quantidade: int, total: int, percentual: float}
     */
    private function indicadorParticipantesComPT(array $unidadesEscopo): array
    {
        $total = $this->agentesQuery($unidadesEscopo)->count();

        if ($total === 0) {
            return ['quantidade' => 0, 'total' => 0, 'percentual' => 0.0];
        }

        $hoje = now()->toDateString();

        $quantidade = $this->agentesQuery($unidadesEscopo)
            ->whereHas('planosTrabalho', function ($q) use ($hoje, $unidadesEscopo) {
                $q->where('status', StatusEnum::ATIVO->value)
                    ->where('data_inicio', '<=', $hoje)
                    ->where('data_fim', '>=', $hoje)
                    ->whereIn('unidade_id', $unidadesEscopo);
            })
            ->count();

        return [
            'quantidade' => $quantidade,
            'total' => $total,
            'percentual' => round(($quantidade / $total) * 100, 1),
        ];
    }

    /**
     * Agentes do PGD (lotado + chefia titular/substituta) dentro do escopo.
     * Retorna um builder novo a cada chamada para que os filtros de "quantidade"
     * não vazem para a contagem de "total".
     *
     * @param string[] $unidadesEscopo
     * @return \Illuminate\Database\Eloquent\Builder<Usuario>
     */
    private function agentesQuery(array $unidadesEscopo): \Illuminate\Database\Eloquent\Builder
    {
        return Usuario::query()
            ->where('participa_pgd', self::PARTICIPA_PGD)
            ->whereHas('unidadesIntegrantes', function ($q) use ($unidadesEscopo) {
                $q->whereIn('unidade_id', $unidadesEscopo)
                    ->whereHas('atribuicoes', fn ($a) => $a->whereIn('atribuicao', self::ATRIBUICOES_AGENTE));
            });
    }
}
