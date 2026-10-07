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

    public function toQuery(bool $paginate = true): RelatorioPlanoEntregaLacunaQueryDTO
    {
        return RelatorioPlanoEntregaLacunaQueryDTO::fromIndexDto(
            $this,
            $paginate ? self::PAGE_SIZE : 0,
        );
    }
}
