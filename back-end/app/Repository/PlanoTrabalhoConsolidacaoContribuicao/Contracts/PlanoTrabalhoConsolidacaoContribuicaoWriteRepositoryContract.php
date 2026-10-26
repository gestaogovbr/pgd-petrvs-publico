<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoConsolidacaoContribuicao\Contracts;

use App\Models\PlanoTrabalhoConsolidacaoContribuicao;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\PlanoTrabalhoConsolidacaoContribuicao\Eloquent\EloquentPlanoTrabalhoConsolidacaoContribuicaoWriteRepository
 */
interface PlanoTrabalhoConsolidacaoContribuicaoWriteRepositoryContract
{
    /**
     * @param array<string, mixed> $attributes
     * @return PlanoTrabalhoConsolidacaoContribuicao
     */
    public function create(array $attributes): Model;

    /**
     * @param string|int $id
     * @param array<string, mixed> $attributes
     * @return PlanoTrabalhoConsolidacaoContribuicao|null
     */
    public function update(string|int $id, array $attributes): ?Model;

    /**
     * @param string|int $id
     */
    public function delete(string|int $id): bool;

    /**
     * Define o momento do primeiro registro apenas quando ainda não registrado.
     */
    public function marcarRegistrado(string $id, DateTimeInterface $momento): void;

    /**
     * Insere múltiplas linhas em lote (sem disparar eventos do Eloquent).
     *
     * @param array<int, array<string, mixed>> $linhas
     */
    public function inserirEmLote(array $linhas): void;
}
