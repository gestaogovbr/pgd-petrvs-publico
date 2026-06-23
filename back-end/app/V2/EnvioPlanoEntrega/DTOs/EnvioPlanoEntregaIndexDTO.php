<?php

declare(strict_types=1);

namespace App\V2\EnvioPlanoEntrega\DTOs;

/**
 * Parâmetros da listagem paginada de envios de plano de entrega (API v2).
 */
final class EnvioPlanoEntregaIndexDTO
{
    /** Tamanho fixo da página na listagem (não configurável pela request). */
    public const PAGE_SIZE = 50;

    public function __construct(
        public readonly int $page,
        public readonly EnvioPlanoEntregaIndexFiltersDTO $filters,
    ) {}

    /**
     * @param array<string, mixed> $validated Resultado de {@see \App\V2\EnvioPlanoEntrega\Validators\EnvioPlanoEntregaIndexRequestValidator::index}
     */
    public static function fromValidatedRequest(array $validated): self
    {
        $filtersRaw = is_array($validated['filters'] ?? null) ? $validated['filters'] : [];
        $page = max(1, (int) ($validated['page'] ?? 1));

        return new self(
            page: $page,
            filters: EnvioPlanoEntregaIndexFiltersDTO::fromArray($filtersRaw),
        );
    }

    /**
     * Payload esperado por {@see \App\Repository\EnvioPlanoEntregaRepository::query}.
     *
     * @return array{page: int, limit: int, where: list<array{0: string, 1: string, 2: mixed}>}
     */
    public function toEnvioPlanoEntregaQueryPayload(): array
    {
        return [
            'page' => $this->page,
            'limit' => self::PAGE_SIZE,
            'where' => $this->filters->toWhereArray(),
        ];
    }
}
