<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoConsolidacaoContribuicao\Eloquent;

use App\Models\PlanoTrabalhoConsolidacaoContribuicao;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicao\Contracts\PlanoTrabalhoConsolidacaoContribuicaoReadRepositoryContract;
use Illuminate\Support\Collection;

/**
 * @extends AbstractEloquentReadRepository<PlanoTrabalhoConsolidacaoContribuicao>
 */
class EloquentPlanoTrabalhoConsolidacaoContribuicaoReadRepository extends AbstractEloquentReadRepository implements PlanoTrabalhoConsolidacaoContribuicaoReadRepositoryContract
{
    public function __construct(PlanoTrabalhoConsolidacaoContribuicao $model)
    {
        $this->model = $model;
    }

    /**
     * @return Collection<int, PlanoTrabalhoConsolidacaoContribuicao>
     */
    public function findByConsolidacao(string $consolidacaoId): Collection
    {
        /** @var Collection<int, PlanoTrabalhoConsolidacaoContribuicao> $result */
        $result = $this->query()
            ->where('plano_trabalho_consolidacao_id', $consolidacaoId)
            ->get();

        return $result;
    }

    public function totalEsforcoExecutadoPorConsolidacao(string $consolidacaoId): float
    {
        return (float) $this->query()
            ->where('plano_trabalho_consolidacao_id', $consolidacaoId)
            ->sum('esforco_executado');
    }

    /**
     * @param array<int, string> $consolidacaoIds
     * @return array<string, float>
     */
    public function totaisPorConsolidacoes(array $consolidacaoIds): array
    {
        if ($consolidacaoIds === []) {
            return [];
        }

        return $this->query()
            ->whereIn('plano_trabalho_consolidacao_id', $consolidacaoIds)
            ->groupBy('plano_trabalho_consolidacao_id')
            ->selectRaw('plano_trabalho_consolidacao_id, SUM(esforco_executado) as total')
            ->pluck('total', 'plano_trabalho_consolidacao_id')
            ->map(static fn ($total): float => (float) $total)
            ->all();
    }

    public function existePorConsolidacaoEEntrega(string $consolidacaoId, string $planoEntregaEntregaId): bool
    {
        return $this->query()
            ->where('plano_trabalho_consolidacao_id', $consolidacaoId)
            ->where('plano_entrega_entrega_id', $planoEntregaEntregaId)
            ->exists();
    }

    public function possuiContribuicoes(string $consolidacaoId): bool
    {
        return $this->query()
            ->where('plano_trabalho_consolidacao_id', $consolidacaoId)
            ->exists();
    }

    public function possuiNaoRegistrada(string $consolidacaoId): bool
    {
        return $this->query()
            ->where('plano_trabalho_consolidacao_id', $consolidacaoId)
            ->whereNull('registrado_at')
            ->exists();
    }
}
