<?php

declare(strict_types=1);

namespace App\Repository;

use App\DTOs\PlanoTrabalho\PlanoTrabalhoConsolidacaoDataDTO;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacao\Contracts\PlanoTrabalhoConsolidacaoReadRepositoryContract;
use App\Repository\PlanoTrabalhoConsolidacao\Contracts\PlanoTrabalhoConsolidacaoWriteRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class PlanoTrabalhoConsolidacaoRepository
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoReadRepositoryContract $readRepository,
        private readonly PlanoTrabalhoConsolidacaoWriteRepositoryContract $writeRepository,
    ) {}

    public function getConsolidacaoData(string $id): ?PlanoTrabalhoConsolidacaoDataDTO
    {
        return $this->readRepository->getConsolidacaoData($id);
    }

    public function findConsolidacaoById(string $id): ?PlanoTrabalhoConsolidacao
    {
        return $this->readRepository->findConsolidacaoById($id);
    }

    public function findAllByPlanoTrabalhoId(string $planoTrabalhoId): Collection
    {
        return $this->readRepository->findAllByPlanoTrabalhoId($planoTrabalhoId);
    }

    public function findAllByPlanoTrabalhoIdAndPeriodo(string $planoTrabalhoId, string $dataInicio, string $dataFim): Collection
    {
        return $this->readRepository->findAllByPlanoTrabalhoIdAndPeriodo($planoTrabalhoId, $dataInicio, $dataFim);
    }

    public function getPendentesAvaliacao(
        array $unidadesGerenciadasIds,
        array $unidadesSubordinadasIds,
        string $usuarioId,
        \DateTimeInterface $dataCorte
    ): Collection {
        return $this->readRepository->getPendentesAvaliacao(
            $unidadesGerenciadasIds,
            $unidadesSubordinadasIds,
            $usuarioId,
            $dataCorte
        );
    }

    public function todosAvaliadosPorPlano(string $planoTrabalhoId): bool
    {
        return $this->readRepository->todosAvaliadosPorPlano($planoTrabalhoId);
    }

    public function possuiAvaliacaoRecentePorPlano(string $planoTrabalhoId, \DateTimeInterface $limite): bool
    {
        return $this->readRepository->possuiAvaliacaoRecentePorPlano($planoTrabalhoId, $limite);
    }

    public function possuiPendenciasPorPlano(string $planoTrabalhoId): bool
    {
        return $this->readRepository->possuiPendenciasPorPlano($planoTrabalhoId);
    }

    public function possuiConsolidacaoFinalizadaPorPlano(string $planoTrabalhoId): bool
    {
        return $this->readRepository->possuiConsolidacaoFinalizadaPorPlano($planoTrabalhoId);
    }

    public function create(array $attributes): PlanoTrabalhoConsolidacao
    {
        /** @var PlanoTrabalhoConsolidacao */
        return $this->writeRepository->create($attributes);
    }

    public function update(string $id, array $attributes): ?PlanoTrabalhoConsolidacao
    {
        /** @var PlanoTrabalhoConsolidacao|null */
        return $this->writeRepository->update($id, $attributes);
    }

    public function delete(string $id): bool
    {
        return $this->writeRepository->delete($id);
    }

    public function createAfastamentoVinculo(array $attributes): void
    {
        $this->writeRepository->createAfastamentoVinculo($attributes);
    }

    public function updateAfastamentoSnapshot(string $afastamentoId, string $snapshot): void
    {
        $this->writeRepository->updateAfastamentoSnapshot($afastamentoId, $snapshot);
    }

    public function deleteAfastamentoVinculos(string $afastamentoId): void
    {
        $this->writeRepository->deleteAfastamentoVinculos($afastamentoId);
    }
}
