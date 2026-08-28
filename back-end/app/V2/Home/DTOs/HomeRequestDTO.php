<?php

declare(strict_types=1);

namespace App\V2\Home\DTOs;

class HomeRequestDTO
{
    public function __construct(
        public readonly string $unidadeId,
        public readonly bool $subordinadas,
        public readonly string $usuarioId,
    ) {}

    public static function fromArray(array $data, string $usuarioId): self
    {
        return new self(
            unidadeId: $data['unidade_id'],
            subordinadas: (bool) ($data['subordinadas'] ?? false),
            usuarioId: $usuarioId,
        );
    }
}
