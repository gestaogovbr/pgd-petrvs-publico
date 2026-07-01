<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

final class ObjetivoPainelPessoasResumoDTO implements \JsonSerializable
{
    public function __construct(
        public readonly int $total_participantes,
        public readonly int $participantes_unidade_propria,
        public readonly int $participantes_outras_unidades,
        public readonly float $percentual_unidade_propria,
        public readonly float $percentual_outras_unidades,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'total_participantes' => $this->total_participantes,
            'participantes_unidade_propria' => $this->participantes_unidade_propria,
            'participantes_outras_unidades' => $this->participantes_outras_unidades,
            'percentual_unidade_propria' => $this->percentual_unidade_propria,
            'percentual_outras_unidades' => $this->percentual_outras_unidades,
        ];
    }
}
