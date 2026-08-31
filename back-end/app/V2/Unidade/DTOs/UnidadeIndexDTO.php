<?php

declare(strict_types=1);

namespace App\V2\Unidade\DTOs;

class UnidadeIndexDTO
{
    public function __construct(
        public readonly ?string $termo,
        public readonly int $page,
        public readonly int $perPage,
    ) {}

    public static function fromRequest(array $data): self
    {
        $filters = $data['filters'] ?? [];

        return new self(
            termo: $filters['termo'] ?? null,
            page: (int) ($data['page'] ?? 1),
            perPage: (int) ($data['size'] ?? 20),
        );
    }
}
