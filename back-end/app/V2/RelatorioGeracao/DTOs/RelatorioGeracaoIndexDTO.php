<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao\DTOs;

final class RelatorioGeracaoIndexDTO
{
    public const PAGE_SIZE = 20;

    public const DEFAULT_ORDER_BY = 'iniciado_em';

    public const DEFAULT_ORDER_DIR = 'desc';

    /** @var list<string> */
    public const SORTABLE_COLUMNS = [
        'nome',
        'iniciado_em',
        'finalizado_em',
        'status',
    ];

    public function __construct(
        public readonly int $page,
        public readonly string $orderBy,
        public readonly string $orderDir,
        public readonly RelatorioGeracaoIndexFiltersDTO $filters = new RelatorioGeracaoIndexFiltersDTO(),
    ) {
    }

    /**
     * @param array<string, mixed> $validated
     */
    public static function fromValidatedRequest(array $validated): self
    {
        $orderBy = trim((string) ($validated['order_by'] ?? ''));
        if ($orderBy === '' || ! in_array($orderBy, self::SORTABLE_COLUMNS, true)) {
            $orderBy = self::DEFAULT_ORDER_BY;
        }

        $orderDir = strtolower(trim((string) ($validated['order_dir'] ?? self::DEFAULT_ORDER_DIR)));
        if ($orderDir !== 'asc' && $orderDir !== 'desc') {
            $orderDir = self::DEFAULT_ORDER_DIR;
        }

        $filtersRaw = is_array($validated['filters'] ?? null) ? $validated['filters'] : [];

        return new self(
            page: max(1, (int) ($validated['page'] ?? 1)),
            orderBy: $orderBy,
            orderDir: $orderDir,
            filters: RelatorioGeracaoIndexFiltersDTO::fromArray($filtersRaw),
        );
    }
}
