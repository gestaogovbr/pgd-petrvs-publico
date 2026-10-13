<?php

declare(strict_types=1);

namespace App\DTOs\RelatorioGeracao;

/**
 * Parâmetros de consulta já montados para {@see \App\Contracts\RelatorioExcelGeradorContract::consultarPagina}.
 */
final class RelatorioExcelConsultaPaginaDTO
{
    /**
     * @param array<string, mixed> $filters
     * @param array<int, mixed> $orderBy
     */
    public function __construct(
        public readonly array $filters,
        public readonly array $orderBy,
        public readonly int $page,
        public readonly int $limit,
    ) {
    }

    /**
     * @param array{filters?: array<string, mixed>, orderBy?: array<int, mixed>}|null $parametros
     */
    public static function fromParametros(?array $parametros, int $page, int $limit): self
    {
        $parametros ??= [];

        return new self(
            filters: is_array($parametros['filters'] ?? null) ? $parametros['filters'] : [],
            orderBy: is_array($parametros['orderBy'] ?? null) ? $parametros['orderBy'] : [],
            page: max(1, $page),
            limit: max(1, $limit),
        );
    }

    /**
     * Payload padronizado para os services de exportação paginada.
     *
     * @return array{page: int, limit: int, filters: array<string, mixed>, orderBy: array<int, mixed>}
     */
    public function toQueryArray(): array
    {
        return [
            'page' => $this->page,
            'limit' => $this->limit,
            'filters' => $this->filters,
            'orderBy' => $this->orderBy,
        ];
    }
}
