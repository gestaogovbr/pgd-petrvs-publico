<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

final class ObjetivoPainelEsforcoResumoDTO implements \JsonSerializable
{
    public function __construct(
        public readonly float $disponivel_horas,
        public readonly float $planejado_horas,
        public readonly float $executado_horas,
        public readonly float $planejado_percentual_disponivel,
        public readonly float $executado_percentual_planejado,
        public readonly bool $mostrar_disponivel,
        public readonly bool $mostrar_planejado,
        public readonly bool $mostrar_executado,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'disponivel_horas' => $this->disponivel_horas,
            'planejado_horas' => $this->planejado_horas,
            'executado_horas' => $this->executado_horas,
            'planejado_percentual_disponivel' => $this->planejado_percentual_disponivel,
            'executado_percentual_planejado' => $this->executado_percentual_planejado,
            'mostrar_disponivel' => $this->mostrar_disponivel,
            'mostrar_planejado' => $this->mostrar_planejado,
            'mostrar_executado' => $this->mostrar_executado,
        ];
    }
}
