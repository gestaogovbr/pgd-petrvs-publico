<?php

declare(strict_types=1);

namespace App\Services\Siape\CargaIndividual;

use InvalidArgumentException;
use SplSubject;

class RelatorioCargaIndividualSiapeObserver implements CargaIndividualSiapeObserverInterface
{
    public function __construct(
        private readonly CargaIndividualSiapeRelatorioService $relatorioService,
    ) {
    }

    public function update(SplSubject $subject): void
    {
        if (!$subject instanceof CargaIndividualSiapeSubject) {
            throw new InvalidArgumentException('Subject de carga individual SIAPE invalido.');
        }

        $relatorio = $this->relatorioService->registrar($subject->contexto());
        $subject->registrarRelatorio($relatorio);
    }
}
