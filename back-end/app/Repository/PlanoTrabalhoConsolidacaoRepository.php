<?php

declare(strict_types=1);

namespace App\Repository;

use App\DTOs\PlanoTrabalho\PlanoTrabalhoConsolidacaoDataDTO;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacao\Contracts\PlanoTrabalhoConsolidacaoReadRepositoryContract;

class PlanoTrabalhoConsolidacaoRepository
{
    public function __construct(
        private ?PlanoTrabalhoConsolidacaoReadRepositoryContract $readRepository = null,
    ) {
        $this->readRepository ??= app(PlanoTrabalhoConsolidacaoReadRepositoryContract::class);
    }

    public function getConsolidacaoData(string $id): ?PlanoTrabalhoConsolidacaoDataDTO
    {
        return $this->readRepository->getConsolidacaoData($id);
    }

    public function findConsolidacaoById(string $id): ?PlanoTrabalhoConsolidacao
    {
        return $this->readRepository->findConsolidacaoById($id);
    }
}
