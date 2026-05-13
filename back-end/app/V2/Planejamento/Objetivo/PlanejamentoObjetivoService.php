<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\Exceptions\NotFoundException;
use App\Repository\PlanejamentoObjetivo\Contracts\PlanejamentoObjetivoReadRepositoryContract;

class PlanejamentoObjetivoService
{
    public function __construct(
        private readonly PlanejamentoObjetivoReadRepositoryContract $repository,
    ) {}

    public function getEsforcoTotal(string $objetivoId): array
    {
        $objetivo = $this->repository->find($objetivoId);

        if (!$objetivo) {
            throw new NotFoundException("Objetivo com id '{$objetivoId}' não foi encontrado ou foi removido.");
        }

        return $this->repository->getEsforcoTotal($objetivo);
    }

    public function getEntregas(string $objetivoId): array
    {
        $objetivo = $this->repository->find($objetivoId);

        if (!$objetivo) {
            throw new NotFoundException("Objetivo com id '{$objetivoId}' não foi encontrado ou foi removido.");
        }

        return $this->repository->getEntregasAgrupadasPorUnidade($objetivoId);
    }
}
