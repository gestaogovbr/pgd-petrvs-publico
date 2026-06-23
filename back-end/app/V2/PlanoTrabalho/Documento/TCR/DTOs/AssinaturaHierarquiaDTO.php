<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\TCR\DTOs;

class AssinaturaHierarquiaDTO
{
    public function __construct(
        public readonly bool $participanteGestor,
        public readonly bool $participanteGestorTitular,
        public readonly bool $assinanteGestorTitular,
    ) {}
}
