<?php

declare(strict_types=1);

namespace App\V2\Unidade\DTOs;

class UnidadeBuscaDTO
{
    public function __construct(
        public readonly ?string $termo,
        public readonly bool $todos,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            termo: $data['nome_codigo'] ?? null,
            todos: (bool) ($data['todos'] ?? false),
        );
    }

    public function toArray(): array
    {
        return [
            'nome_codigo' => $this->termo,
            'todos' => $this->todos,
        ];
    }
}
