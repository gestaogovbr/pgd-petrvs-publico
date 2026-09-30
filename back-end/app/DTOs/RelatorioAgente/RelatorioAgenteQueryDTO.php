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
        $where = is_array($validated['where'] ?? null) ? $validated['where'] : [];

        return new self(
            filters: RelatorioAgenteFiltersDTO::fromWhere($where),
            orderBy: is_array($validated['orderBy'] ?? null) ? $validated['orderBy'] : [],
            page: $validated['page'] ?? null,
            limit: $validated['limit'] ?? null,
            deleted: $validated['deleted'] ?? null,
        );
    }

    /**
     * @param array{where?: array<int, mixed>, orderBy?: array<int, mixed>} $parametros
     */
    public static function fromParametros(array $parametros): self
    {
        return new self(
            filters: RelatorioAgenteFiltersDTO::fromWhere(
                is_array($parametros['where'] ?? null) ? $parametros['where'] : []
            ),
            orderBy: is_array($parametros['orderBy'] ?? null) ? $parametros['orderBy'] : [],
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

    /**
     * @return array{where: list<array{0: string, 1: string, 2: mixed}>, orderBy: array<int, mixed>, page: mixed, limit: mixed, deleted: mixed}
     */
    public function toQueryArray(): array
    {
        return [
            'where' => $this->filters->toWhereArray(),
            'orderBy' => $this->orderBy,
            'page' => $this->page,
            'limit' => $this->limit,
            'deleted' => $this->deleted,
        ];
    }
}
