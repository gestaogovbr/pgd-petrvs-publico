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

    /**
     * @param array{filters?: array<string, mixed>, where?: array<int, mixed>, orderBy?: array<int, mixed>} $parametros
     */
    public static function fromParametros(array $parametros): self
    {
        $filters = is_array($parametros['filters'] ?? null)
            ? RelatorioAgenteFiltersDTO::fromArray($parametros['filters'])
            : RelatorioAgenteFiltersDTO::fromArray(
                self::filtersFromLegacyWhere(
                    is_array($parametros['where'] ?? null) ? $parametros['where'] : []
                )
            );

        return new self(
            filters: $filters,
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

    /**
     * Compatibilidade com gerações antigas que persistiram apenas `where`.
     *
     * @param array<int, mixed> $where
     * @return array<string, mixed>
     */
    private static function filtersFromLegacyWhere(array $where): array
    {
        $filters = [];
        foreach ($where as $condition) {
            if (! is_array($condition) || ! isset($condition[0])) {
                continue;
            }
            $field = (string) $condition[0];
            $value = $condition[2] ?? null;
            match ($field) {
                'incluir_unidades_subordinadas' => $filters[$field] = true,
                'somente_vigentes' => $filters[$field] = $value,
                default => $filters[$field] = $value,
            };
        }

        return $filters;
    }
}
