<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoConsolidacaoContribuicao\Contracts;

use App\Models\PlanoTrabalhoConsolidacaoContribuicao;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @see \App\Repository\PlanoTrabalhoConsolidacaoContribuicao\Eloquent\EloquentPlanoTrabalhoConsolidacaoContribuicaoReadRepository
 */
interface PlanoTrabalhoConsolidacaoContribuicaoReadRepositoryContract
{
    /**
     * @param string|int $id
     * @return PlanoTrabalhoConsolidacaoContribuicao|null
     */
    public function findById(string|int $id): ?Model;

    /**
     * @return Collection<int, PlanoTrabalhoConsolidacaoContribuicao>
     */
    public function findByConsolidacao(string $consolidacaoId): Collection;

    public function totalEsforcoExecutadoPorConsolidacao(string $consolidacaoId): float;

    /**
     * @param array<int, string> $consolidacaoIds
     * @return array<string, float> mapa consolidacaoId => somatório de esforço executado
     */
    public function totaisPorConsolidacoes(array $consolidacaoIds): array;

    public function existePorConsolidacaoEEntrega(string $consolidacaoId, string $planoEntregaEntregaId, ?string $excludeId = null): bool;

    public function possuiContribuicoes(string $consolidacaoId): bool;

    public function possuiNaoRegistrada(string $consolidacaoId): bool;
}
