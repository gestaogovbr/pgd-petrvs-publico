<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega\DTOs;

/**
 * Parâmetros tipados da consulta ao repositório de leitura do relatório de entregas.
 */
final class RelatorioEntregaQueryDTO
{
    /**
     * @param list<array{0: string, 1: string}> $orderBy
     */
    public function __construct(
        public readonly int $page,
        public readonly int $limit,
        public readonly RelatorioEntregaIndexFiltersDTO $filters,
        public readonly array $orderBy,
    ) {}

    public static function fromIndexDto(RelatorioEntregaIndexDTO $index, int $limit): self
    {
        return new self(
            page: $index->page,
            limit: $limit,
            filters: $index->filters,
            orderBy: $index->orderBy,
        );
    }
}
