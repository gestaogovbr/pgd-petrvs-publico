<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao\DTOs;

use App\Enums\RelatorioGeracaoTipo;

final class RelatorioGeracaoStoreDTO
{
    /**
     * @param array<string, mixed> $filters
     * @param array<int, mixed> $orderBy
     */
    public function __construct(
        public readonly RelatorioGeracaoTipo $tipo,
        public readonly array $filters,
        public readonly array $orderBy,
    ) {
    }

    /**
     * @param array<string, mixed> $validated
     */
    public static function fromValidatedRequest(array $validated): self
    {
        return new self(
            tipo: RelatorioGeracaoTipo::from((string) $validated['tipo']),
            filters: is_array($validated['filters'] ?? null) ? $validated['filters'] : [],
            orderBy: is_array($validated['orderBy'] ?? null) ? $validated['orderBy'] : [],
        );
    }
}
