<?php

declare(strict_types=1);

namespace App\Repository;

use App\DTOs\PlanoTrabalho\PlanoTrabalhoConsolidacaoDataDTO;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacao\Contracts\PlanoTrabalhoConsolidacaoReadRepositoryContract;

class PlanoTrabalhoConsolidacaoRepository
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoReadRepositoryContract $readRepository,
    ) {
    }

    public function getConsolidacaoData(string $id): ?PlanoTrabalhoConsolidacaoDataDTO
    {
        return $this->readRepository->getConsolidacaoData($id);
    }

    public function findConsolidacaoById(string $id): ?PlanoTrabalhoConsolidacao
    {
        return $this->readRepository->findConsolidacaoById($id);
    }

    public function getPendentesAvaliacao(array $unidadesIds, string $usuarioId, \DateTimeInterface $dataCorte): \Illuminate\Database\Eloquent\Collection
    {
        return $this->readRepository->getPendentesAvaliacao($unidadesIds, $usuarioId, $dataCorte);
    }
}
