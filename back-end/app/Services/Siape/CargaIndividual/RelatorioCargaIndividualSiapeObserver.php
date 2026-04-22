<?php

declare(strict_types=1);

namespace App\Services\Siape\CargaIndividual;

use App\DTOs\Siape\CargaIndividualSiapeProcessamentoDTO;
use App\Models\CargaIndividualSiapeRelatorio;

class RelatorioCargaIndividualSiapeObserver implements CargaIndividualSiapeObserverInterface
{
    public function __construct(
        private readonly CargaIndividualSiapeRelatorioService $relatorioService,
    ) {
    }

    public function atualizar(CargaIndividualSiapeProcessamentoDTO $contexto): ?CargaIndividualSiapeRelatorio
    {
        return $this->relatorioService->registrar($contexto);
    }
}
