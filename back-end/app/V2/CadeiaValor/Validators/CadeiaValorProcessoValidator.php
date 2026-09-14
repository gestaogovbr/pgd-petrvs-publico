<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor\Validators;

use App\Exceptions\NotFoundException;
use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;

class CadeiaValorProcessoValidator
{
    public function __construct(
        private readonly CadeiaValorReadRepositoryContract $repository,
    ) {}

    public function validar(string $cadeiaValorId, string $processoId): void
    {
        $cadeiaValor = $this->repository->findCadeiaValor($cadeiaValorId);
        if (!$cadeiaValor instanceof CadeiaValor) {
            throw new NotFoundException("Cadeia de valor com id '{$cadeiaValorId}' não encontrada.");
        }

        $processo = $this->repository->findProcesso($processoId, $cadeiaValorId);
        if (!$processo instanceof CadeiaValorProcesso) {
            throw new NotFoundException("Processo com id '{$processoId}' não encontrado na cadeia de valor.");
        }
    }
}
