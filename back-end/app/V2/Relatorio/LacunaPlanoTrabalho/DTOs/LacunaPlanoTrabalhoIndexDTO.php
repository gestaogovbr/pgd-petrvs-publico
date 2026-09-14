<?php

declare(strict_types=1);

namespace App\V2\Relatorio\LacunaPlanoTrabalho\DTOs;

/**
 * Parâmetros da listagem paginada de lacunas de Plano de Trabalho (API v2).
 */
final class LacunaPlanoTrabalhoIndexDTO
{
    public const PAGE_SIZE = 20;

    public function __construct(
        public readonly int $page,
        public readonly LacunaPlanoTrabalhoIndexFiltersDTO $filters,
        public readonly bool $paginate = true,
    ) {}

    /**
     * @param array<string, mixed> $validated
     */
    public static function fromValidatedRequest(array $validated, bool $paginate = true): self
    {
        $filtersRaw = is_array($validated['filters'] ?? null) ? $validated['filters'] : [];
        $page = max(1, (int) ($validated['page'] ?? 1));

        return new self(
            page: $page,
            filters: LacunaPlanoTrabalhoIndexFiltersDTO::fromArray($filtersRaw),
            paginate: $paginate,
        );
    }

    /**
     * @return array{page: int, limit: int, where: list<array{0: string, 1: string, 2: mixed}>}
     */
    public function toQueryPayload(): array
    {
        return [
            'page' => $this->paginate ? $this->page : 1,
            'limit' => $this->paginate ? self::PAGE_SIZE : 0,
            'where' => $this->filters->toWhereArray(),
        ];
    }
}
