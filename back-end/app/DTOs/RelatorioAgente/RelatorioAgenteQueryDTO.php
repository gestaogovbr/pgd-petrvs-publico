<?php

declare(strict_types=1);

namespace App\DTOs\RelatorioAgente;

final class RelatorioAgenteQueryDTO
{
    /**
     * @param array<int, mixed> $where
     * @param array<int, mixed> $orderBy
     */
    public function __construct(
        public readonly array $where = [],
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
        return new self(
            where: is_array($validated['where'] ?? null) ? $validated['where'] : [],
            orderBy: is_array($validated['orderBy'] ?? null) ? $validated['orderBy'] : [],
            page: $validated['page'] ?? null,
            limit: $validated['limit'] ?? null,
            deleted: $validated['deleted'] ?? null,
        );
    }

    /**
     * @param array<int, mixed> $where
     */
    public function withWhere(array $where): self
    {
        return new self(
            where: $where,
            orderBy: $this->orderBy,
            page: $this->page,
            limit: $this->limit,
            deleted: $this->deleted,
        );
    }

    /**
     * @return array{where: array<int, mixed>, orderBy: array<int, mixed>, page: mixed, limit: mixed, deleted: mixed}
     */
    public function toQueryArray(): array
    {
        return [
            'where' => $this->where,
            'orderBy' => $this->orderBy,
            'page' => $this->page,
            'limit' => $this->limit,
            'deleted' => $this->deleted,
        ];
    }
}
