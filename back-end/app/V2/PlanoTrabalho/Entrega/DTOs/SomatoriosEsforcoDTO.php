<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\DTOs;

final class SomatoriosEsforcoDTO
{
    public function __construct(
        public readonly float $somatorioPlanejado,
        public readonly float $somatorioExecutado,
    ) {}

    public function planejadoIgualExecutado(): bool
    {
        return abs($this->somatorioPlanejado - $this->somatorioExecutado) < 0.01;
    }
}
