<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega\DTOs;

final class RelatorioEntregaIndexDTO
{
    public const PAGE_SIZE = 50;

    /**
     * @param list<array{0: string, 1: string}> $orderBy
     */
    public function __construct(
        public readonly int $page,
        public readonly RelatorioEntregaIndexFiltersDTO $filters,
        public readonly array $orderBy,
    ) {}

    /**
     * @param array<string, mixed> $validated
     */
    public static function fromValidatedRequest(array $validated): self
    {
        $filtersRaw = is_array($validated['filters'] ?? null) ? $validated['filters'] : [];
        $page = max(1, (int) ($validated['page'] ?? 1));

        $orderBy = self::parseOrderBy($validated);

        return new self(
            page: $page,
            filters: RelatorioEntregaIndexFiltersDTO::fromArray($filtersRaw),
            orderBy: $orderBy,
        );
    }

    /**
     * @return array{
     *     page: int,
     *     limit: int,
     *     orderBy: list<array{0: string, 1: string}>,
     *     where: list<array{0: string, 1: string, 2: mixed}>
     * }
     */
    public function toQueryPayload(bool $paginate = true): array
    {
        return [
            'page' => $this->page,
            'limit' => $paginate ? self::PAGE_SIZE : 0,
            'orderBy' => $this->orderBy,
            'where' => $this->filters->toWhereArray(),
        ];
    }

    /**
     * @param array<string, mixed> $validated
     *
     * @return list<array{0: string, 1: string}>
     */
    private static function parseOrderBy(array $validated): array
    {
        $column = trim((string) ($validated['order_by'] ?? ''));
        $dir = strtolower(trim((string) ($validated['order_dir'] ?? 'asc'))) === 'desc' ? 'desc' : 'asc';

        if ($column === '') {
            return [['unidadeHierarquia', 'asc'], ['entregaNome', 'asc']];
        }

        return [[$column, $dir]];
    }
}
