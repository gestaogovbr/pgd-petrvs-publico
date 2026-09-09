<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\DTOs;

class MuralAvisoDestroyDTO
{
    /**
     * @param list<string> $tenantIds
     */
    public function __construct(
        public readonly string $id,
        public readonly int $nivelUsuario,
        public readonly array $tenantIds,
    ) {}
}
