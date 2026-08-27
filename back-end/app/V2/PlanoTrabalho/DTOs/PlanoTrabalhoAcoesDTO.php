<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DTOs;

final readonly class PlanoTrabalhoAcoesDTO
{
    public function __construct(
        public bool $editar = false,
        public bool $arquivar = false,
        public bool $desarquivar = false,
        public bool $encerrar = false,
        public bool $cancelar = false,
    ) {}

    /**
     * @return array{editar: bool, arquivar: bool, desarquivar: bool, encerrar: bool, cancelar: bool}
     */
    public function toArray(): array
    {
        return [
            'editar' => $this->editar,
            'arquivar' => $this->arquivar,
            'desarquivar' => $this->desarquivar,
            'encerrar' => $this->encerrar,
            'cancelar' => $this->cancelar,
        ];
    }
}
