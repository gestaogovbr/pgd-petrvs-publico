<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\DTOs;

class ResumoForcaTrabalhoDTO
{
    public function __construct(
        public readonly int $quantidadeEntregas,
        public readonly float $somatorioForcaTrabalho,
    ) {}

    public function possuiEntregas(): bool
    {
        return $this->quantidadeEntregas > 0;
    }

    public function isCargaCompleta(): bool
    {
        return $this->somatorioForcaTrabalho === 100.0;
    }
}
