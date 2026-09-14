<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\Validators;

use App\Exceptions\NotFoundException;
use App\Models\PlanejamentoObjetivo;
use App\Repository\PlanejamentoObjetivo\Contracts\PlanejamentoObjetivoReadRepositoryContract;

class PlanejamentoObjetivoValidator
{
    public function __construct(
        private readonly PlanejamentoObjetivoReadRepositoryContract $repository,
    ) {}

    public function validar(string $objetivoId): PlanejamentoObjetivo
    {
        $objetivo = $this->repository->find($objetivoId);
        if (!$objetivo instanceof PlanejamentoObjetivo) {
            throw new NotFoundException("Objetivo com id '{$objetivoId}' não foi encontrado ou foi removido.");
        }

        return $objetivo;
    }
}
