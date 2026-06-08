<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DTOs;

final readonly class PlanoTrabalhoAcoesDTO
{
    public function __construct(
        public bool $editar = false,
    ) {}

    /**
     * @return array{editar: bool}
     */
    public function toArray(): array
    {
        return [
            'editar' => $this->editar,
        ];
    }
}
