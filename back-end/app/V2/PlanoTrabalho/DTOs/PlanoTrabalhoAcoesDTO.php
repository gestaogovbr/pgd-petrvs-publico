<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DTOs;

final readonly class PlanoTrabalhoAcoesDTO
{
    public function __construct(
        public bool $editar = false,
        public bool $arquivar = false,
    ) {}

    /**
     * @return array{editar: bool, arquivar: bool}
     */
    public function toArray(): array
    {
        return [
            'editar' => $this->editar,
            'arquivar' => $this->arquivar,
        ];
    }
}
