<?php

declare(strict_types=1);

namespace App\V2\PlanoEntrega\DTOs;

class PlanoEntregaEntregaBuscaDTO
{
    public function __construct(
        public readonly string $planoEntregaId,
    ) {}

    public static function fromRouteParam(string $planoEntregaId): self
    {
        return new self(planoEntregaId: $planoEntregaId);
    }
}
