<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

final class ObjetivoPainelEntregasResumoDTO implements \JsonSerializable
{
    public function __construct(
        public readonly int $total_entregas,
        public readonly int $entregas_concluidas,
        public readonly float $percentual_concluidas,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'total_entregas' => $this->total_entregas,
            'entregas_concluidas' => $this->entregas_concluidas,
            'percentual_concluidas' => $this->percentual_concluidas,
        ];
    }
}
