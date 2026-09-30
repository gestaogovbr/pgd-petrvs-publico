<?php

declare(strict_types=1);

namespace App\DTOs\RelatorioGeracao;

final class RelatorioExcelConsultaPaginaDTO
{
    /**
     * @param array<int, mixed> $where
     * @param array<int, mixed> $orderBy
     */
    public function __construct(
        public readonly array $where,
        public readonly array $orderBy,
        public readonly int $page,
        public readonly int $limit,
    ) {
    }

    /**
     * @param array<string, mixed>|null $parametros
     */
    public static function fromParametros(?array $parametros, int $page, int $limit): self
    {
        $parametros ??= [];

        return new self(
            where: is_array($parametros['where'] ?? null) ? $parametros['where'] : [],
            orderBy: is_array($parametros['orderBy'] ?? null) ? $parametros['orderBy'] : [],
            page: max(1, $page),
            limit: max(1, $limit),
        );
    }
}
