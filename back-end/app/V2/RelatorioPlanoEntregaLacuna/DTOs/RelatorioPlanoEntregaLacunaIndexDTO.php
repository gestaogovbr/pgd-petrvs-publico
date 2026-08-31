<?php

declare(strict_types=1);

namespace App\V2\RelatorioPlanoEntregaLacuna\DTOs;

final class RelatorioPlanoEntregaLacunaIndexDTO
{
    public const PAGE_SIZE = 50;

    public function __construct(
        public readonly int $page,
        public readonly RelatorioPlanoEntregaLacunaFiltersDTO $filters,
    ) {}

    /**
     * @param array<string, mixed> $validated
     */
    public static function fromValidatedRequest(array $validated): self
    {
        $filtersRaw = is_array($validated['filters'] ?? null) ? $validated['filters'] : [];

        return new self(
            page: max(1, (int) ($validated['page'] ?? 1)),
            filters: RelatorioPlanoEntregaLacunaFiltersDTO::fromArray($filtersRaw),
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
    public function toQueryPayload(): array
    {
        return [
            'page' => $this->page,
            'limit' => self::PAGE_SIZE,
            'orderBy' => [
                ['unidadeHierarquia', 'asc'],
                ['data_inicio', 'asc'],
            ],
            'where' => $this->filters->toWhereArray(),
        ];
    }

    /**
     * @return array{
     *     page: int,
     *     limit: int,
     *     orderBy: list<array{0: string, 1: string}>,
     *     where: list<array{0: string, 1: string, 2: mixed}>
     * }
     */
    public function toExportPayload(): array
    {
        $payload = $this->toQueryPayload();
        $payload['limit'] = 0;

        return $payload;
    }
}
