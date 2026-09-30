<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao\DTOs;

use App\Enums\RelatorioGeracaoTipo;

final class RelatorioGeracaoStoreDTO
{
    /**
     * @param array<string, mixed> $filters
     * @param array<int, mixed> $where
     * @param array<int, mixed> $orderBy
     */
    public function __construct(
        public readonly RelatorioGeracaoTipo $tipo,
        public readonly array $filters,
        public readonly array $where,
        public readonly array $orderBy,
    ) {
    }

    /**
     * @param array<string, mixed> $validated
     */
    public static function fromValidatedRequest(array $validated): self
    {
        $tipo = RelatorioGeracaoTipo::from((string) $validated['tipo']);
        $filters = is_array($validated['filters'] ?? null) ? $validated['filters'] : [];
        $where = is_array($validated['where'] ?? null) ? $validated['where'] : [];
        $orderBy = is_array($validated['orderBy'] ?? null) ? $validated['orderBy'] : [];

        return new self(
            tipo: $tipo,
            filters: $filters,
            where: $where,
            orderBy: $orderBy,
        );
    }

    /**
     * @return array{filters: array<string, mixed>, where: array<int, mixed>, orderBy: array<int, mixed>}
     */
    public function toParametros(): array
    {
        return [
            'filters' => $this->filters,
            'where' => $this->where,
            'orderBy' => $this->orderBy,
        ];
    }
}
