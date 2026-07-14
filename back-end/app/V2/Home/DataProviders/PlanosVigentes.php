<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\UnidadeRepository;
use App\V2\Home\DTOs\HomeRequestDTO;
use App\V2\Home\Traits\ResolveUnidades;

class PlanosVigentes
{
    use ResolveUnidades;

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
        $hoje = now()->toDateString();

        $total = Unidade::query()
            ->where('executora', true)
            ->whereIn('id', $unidadesEscopo)
            ->count();

        if ($total === 0) {
            return ['quantidade' => 0, 'total' => 0, 'percentual' => 0.0];
        }

        $quantidade = Unidade::query()
            ->where('executora', true)
            ->whereIn('id', $unidadesEscopo)
            ->whereHas('planosEntrega', function ($q) use ($hoje) {
                $q->where('status', 'ATIVO')
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
     * @return array{quantidade: int, total: int, percentual: float}
     */
    private function indicadorParticipantesComPT(array $unidadesEscopo): array
    {
        $hoje = now()->toDateString();

        $total = Usuario::query()
            ->where('participa_pgd', 'sim')
            ->whereHas('unidadesIntegrantes', function ($q) use ($unidadesEscopo) {
                $q->whereIn('unidade_id', $unidadesEscopo)
                    ->whereHas('atribuicoes', fn ($a) => $a->where('atribuicao', 'LOTADO'));
            })
            ->count();

        if ($total === 0) {
            return ['quantidade' => 0, 'total' => 0, 'percentual' => 0.0];
        }

        $quantidade = Usuario::query()
            ->where('participa_pgd', 'sim')
            ->whereHas('unidadesIntegrantes', function ($q) use ($unidadesEscopo) {
                $q->whereIn('unidade_id', $unidadesEscopo)
                    ->whereHas('atribuicoes', fn ($a) => $a->where('atribuicao', 'LOTADO'));
            })
            ->whereHas('planosTrabalho', function ($q) use ($hoje, $unidadesEscopo) {
                $q->where('status', 'ATIVO')
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
}
