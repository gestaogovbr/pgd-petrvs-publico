<?php

declare(strict_types=1);

namespace App\Services\Siape\CargaIndividual;

use App\DTOs\Siape\CargaIndividualSiapeProcessamentoDTO;
use App\Models\CargaIndividualSiapeRelatorio;

class CargaIndividualSiapeSubject
{
    /** @var array<int, CargaIndividualSiapeObserverInterface> */
    private array $observers;

    public function __construct(RelatorioCargaIndividualSiapeObserver $relatorioObserver)
    {
        $this->observers = [$relatorioObserver];
    }

    public function anexar(CargaIndividualSiapeObserverInterface $observer): void
    {
        $this->observers[] = $observer;
    }

    public function notificar(CargaIndividualSiapeProcessamentoDTO $contexto): ?CargaIndividualSiapeRelatorio
    {
        $relatorio = null;

        foreach ($this->observers as $observer) {
            $resultado = $observer->atualizar($contexto);
            if ($resultado instanceof CargaIndividualSiapeRelatorio) {
                $relatorio = $resultado;
            }
        }

        return $relatorio;
    }
}
