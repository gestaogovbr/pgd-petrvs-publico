<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\Exceptions\NotFoundException;

class PlanejamentoObjetivoService
{
    public function __construct(
        private readonly PlanejamentoObjetivoRepository $repository,
    ) {}

    public function getEsforcoTotal(string $objetivoId): array
    {
        $objetivo = $this->repository->find($objetivoId);

        if (!$objetivo) {
            throw new NotFoundException("Objetivo com id '{$objetivoId}' não foi encontrado ou foi removido.");
        }

        return $this->repository->getEsforcoTotal($objetivo);
    }
}
