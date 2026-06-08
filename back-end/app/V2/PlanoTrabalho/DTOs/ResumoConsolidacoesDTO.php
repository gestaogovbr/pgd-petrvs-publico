<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DTOs;

class ResumoConsolidacoesDTO
{
    public function __construct(
        public readonly bool $todosAvaliados,
        public readonly bool $avaliacaoRecente,
        public readonly bool $possuiPendencias,
    ) {}
}
