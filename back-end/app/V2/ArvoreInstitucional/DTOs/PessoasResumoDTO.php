<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional\DTOs;

final class PessoasResumoDTO implements \JsonSerializable
{
    public function __construct(
        public readonly int $total_participantes,
        public readonly int $participantes_somente_unidade_propria,
        public readonly int $participantes_somente_outras_unidades,
        public readonly int $participantes_em_ambas,
        public readonly float $percentual_somente_unidade_propria,
        public readonly float $percentual_somente_outras_unidades,
        public readonly float $percentual_em_ambas,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'total_participantes' => $this->total_participantes,
            'participantes_somente_unidade_propria' => $this->participantes_somente_unidade_propria,
            'participantes_somente_outras_unidades' => $this->participantes_somente_outras_unidades,
            'participantes_em_ambas' => $this->participantes_em_ambas,
            'percentual_somente_unidade_propria' => $this->percentual_somente_unidade_propria,
            'percentual_somente_outras_unidades' => $this->percentual_somente_outras_unidades,
            'percentual_em_ambas' => $this->percentual_em_ambas,
        ];
    }
}
