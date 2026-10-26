<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\PlanoTrabalhoConsolidacaoContribuicao;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicao\Contracts\PlanoTrabalhoConsolidacaoContribuicaoReadRepositoryContract;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicao\Contracts\PlanoTrabalhoConsolidacaoContribuicaoWriteRepositoryContract;
use DateTimeInterface;
use Illuminate\Support\Collection;

class PlanoTrabalhoConsolidacaoContribuicaoRepository
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoContribuicaoReadRepositoryContract $readRepository,
        private readonly PlanoTrabalhoConsolidacaoContribuicaoWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findById(string $id): ?PlanoTrabalhoConsolidacaoContribuicao
    {
        /** @var PlanoTrabalhoConsolidacaoContribuicao|null */
        return $this->readRepository->findById($id);
    }

    /**
     * @return Collection<int, PlanoTrabalhoConsolidacaoContribuicao>
     */
    public function findByConsolidacao(string $consolidacaoId): Collection
    {
        return $this->readRepository->findByConsolidacao($consolidacaoId);
    }

    public function totalEsforcoExecutadoPorConsolidacao(string $consolidacaoId): float
    {
        return $this->readRepository->totalEsforcoExecutadoPorConsolidacao($consolidacaoId);
    }

    /**
     * @param array<int, string> $consolidacaoIds
     * @return array<string, float>
     */
    public function totaisPorConsolidacoes(array $consolidacaoIds): array
    {
        return $this->readRepository->totaisPorConsolidacoes($consolidacaoIds);
    }

    public function existePorConsolidacaoEEntrega(string $consolidacaoId, string $planoEntregaEntregaId, ?string $excludeId = null): bool
    {
        return $this->readRepository->existePorConsolidacaoEEntrega($consolidacaoId, $planoEntregaEntregaId, $excludeId);
    }

    public function possuiContribuicoes(string $consolidacaoId): bool
    {
        return $this->readRepository->possuiContribuicoes($consolidacaoId);
    }

    public function possuiNaoRegistrada(string $consolidacaoId): bool
    {
        return $this->readRepository->possuiNaoRegistrada($consolidacaoId);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): PlanoTrabalhoConsolidacaoContribuicao
    {
        /** @var PlanoTrabalhoConsolidacaoContribuicao */
        return $this->writeRepository->create($attributes);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string $id, array $attributes): ?PlanoTrabalhoConsolidacaoContribuicao
    {
        /** @var PlanoTrabalhoConsolidacaoContribuicao|null */
        return $this->writeRepository->update($id, $attributes);
    }

    public function delete(string $id): bool
    {
        return $this->writeRepository->delete($id);
    }

    public function marcarRegistrado(string $id, DateTimeInterface $momento): void
    {
        $this->writeRepository->marcarRegistrado($id, $momento);
    }

    /**
     * @param array<int, array<string, mixed>> $linhas
     */
    public function inserirEmLote(array $linhas): void
    {
        $this->writeRepository->inserirEmLote($linhas);
    }
}
