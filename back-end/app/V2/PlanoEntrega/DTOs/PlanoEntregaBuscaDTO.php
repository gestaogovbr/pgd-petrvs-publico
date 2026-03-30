<?php

declare(strict_types=1);

namespace App\V2\PlanoEntrega\DTOs;

class PlanoEntregaBuscaDTO
{
    public function __construct(
        public readonly string $unidadeId,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            unidadeId: $data['unidade_id'],
        );
    }

    public function toArray(): array
    {
        return [
            'unidade_id' => $this->unidadeId,
        ];
    }
}
