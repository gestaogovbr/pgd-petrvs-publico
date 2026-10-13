<?php

declare(strict_types=1);

namespace App\DTOs\RelatorioAgente;

final class RelatorioAgenteQueryDTO
{
    /**
     * @param list<array{0: string, 1: string}>|array<int, mixed> $orderBy
     */
    public function __construct(
        public readonly RelatorioAgenteFiltersDTO $filters = new RelatorioAgenteFiltersDTO(),
        public readonly array $orderBy = [],
        public readonly mixed $page = null,
        public readonly mixed $limit = null,
        public readonly mixed $deleted = null,
    ) {
    }

    /**
     * @param array<string, mixed> $validated
     */
    public static function fromValidatedRequest(array $validated): self
    {
        $filters = is_array($validated['filters'] ?? null) ? $validated['filters'] : [];

        return new self(
            filters: RelatorioAgenteFiltersDTO::fromArray($filters),
            orderBy: is_array($validated['orderBy'] ?? null) ? $validated['orderBy'] : [],
            page: $validated['page'] ?? null,
            limit: $validated['limit'] ?? null,
            deleted: $validated['deleted'] ?? null,
        );
    }

    public function withFilters(RelatorioAgenteFiltersDTO $filters): self
    {
        return new self(
            filters: $filters,
            orderBy: $this->orderBy,
            page: $this->page,
            limit: $this->limit,
            deleted: $this->deleted,
        );
    }
}
