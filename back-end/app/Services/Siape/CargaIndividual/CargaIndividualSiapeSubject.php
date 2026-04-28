<?php

declare(strict_types=1);

namespace App\Services\Siape\CargaIndividual;

use App\DTOs\Siape\CargaIndividualSiapeProcessamentoDTO;
use App\Models\CargaIndividualSiapeRelatorio;
use InvalidArgumentException;
use LogicException;
use SplObjectStorage;
use SplObserver;
use SplSubject;

class CargaIndividualSiapeSubject implements SplSubject
{
    /** @var SplObjectStorage<SplObserver, null> */
    private SplObjectStorage $observers;
    private ?CargaIndividualSiapeProcessamentoDTO $contexto = null;
    private ?CargaIndividualSiapeRelatorio $relatorio = null;

    public function __construct(RelatorioCargaIndividualSiapeObserver $relatorioObserver)
    {
        $this->observers = new SplObjectStorage();
        $this->attach($relatorioObserver);
    }

    public function attach(SplObserver $observer): void
    {
        if (!$observer instanceof CargaIndividualSiapeObserverInterface) {
            throw new InvalidArgumentException('Observer de carga individual SIAPE invalido.');
        }

        $this->observers->attach($observer);
    }

    public function detach(SplObserver $observer): void
    {
        if ($this->observers->contains($observer)) {
            $this->observers->detach($observer);
        }
    }

    public function notify(): void
    {
        foreach ($this->observers as $observer) {
            /** @var SplObserver $observer */
            $observer->update($this);
        }
    }

    public function notificar(CargaIndividualSiapeProcessamentoDTO $contexto): ?CargaIndividualSiapeRelatorio
    {
        $this->contexto = $contexto;
        $this->relatorio = null;

        try {
            $this->notify();

            return $this->relatorio;
        } finally {
            $this->contexto = null;
        }
    }

    public function contexto(): CargaIndividualSiapeProcessamentoDTO
    {
        if (!$this->contexto instanceof CargaIndividualSiapeProcessamentoDTO) {
            throw new LogicException('Contexto de carga individual SIAPE indisponivel.');
        }

        return $this->contexto;
    }

    public function registrarRelatorio(CargaIndividualSiapeRelatorio $relatorio): void
    {
        $this->relatorio = $relatorio;
    }
}
