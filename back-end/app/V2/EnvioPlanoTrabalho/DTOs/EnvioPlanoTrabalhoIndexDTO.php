<?php

declare(strict_types=1);

namespace App\V2\EnvioPlanoTrabalho\DTOs;

/**
 * Parâmetros da listagem paginada de envios de plano de trabalho (API v2).
 */
final class EnvioPlanoTrabalhoIndexDTO
{
    /** Tamanho fixo da página na listagem (não configurável pela request). */
    public const PAGE_SIZE = 50;

    public function __construct(
        public readonly int $page,
        public readonly EnvioPlanoTrabalhoIndexFiltersDTO $filters,
    ) {}

    /**
     * @param array<string, mixed> $validated Resultado de {@see \App\V2\EnvioPlanoTrabalho\Validators\EnvioPlanoTrabalhoIndexRequestValidator::index}
     */
    public static function fromValidatedRequest(array $validated): self
    {
        $filtersRaw = is_array($validated['filters'] ?? null) ? $validated['filters'] : [];
        $page = max(1, (int) ($validated['page'] ?? 1));

        return new self(
            page: $page,
            filters: EnvioPlanoTrabalhoIndexFiltersDTO::fromArray($filtersRaw),
        );
    }

    /**
     * Payload esperado por {@see \App\Repository\EnvioPlanoTrabalhoRepository::query}.
     *
     * @return array{page: int, limit: int, where: list<array{0: string, 1: mixed}>}
     */
    public function toEnvioPlanoTrabalhoQueryPayload(): array
    {
        return [
            'page' => $this->page,
            'limit' => self::PAGE_SIZE,
            'where' => $this->filters->toWhereArray(),
        ];
    }
}
