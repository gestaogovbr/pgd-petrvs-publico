<?php

declare(strict_types=1);

namespace App\V2\EnvioParticipante\DTOs;

/**
 * Parâmetros da listagem paginada de envios de participante (API v2).
 */
final class EnvioParticipanteIndexDTO
{
    /** Tamanho fixo da página na listagem (não configurável pela request). */
    public const PAGE_SIZE = 50;

    public function __construct(
        public readonly int $page,
        public readonly EnvioParticipanteIndexFiltersDTO $filters,
    ) {}

    /**
     * @param array<string, mixed> $validated Resultado de {@see \App\V2\EnvioParticipante\Validators\EnvioParticipanteIndexRequestValidator::index}
     */
    public static function fromValidatedRequest(array $validated): self
    {
        $filtersRaw = is_array($validated['filters'] ?? null) ? $validated['filters'] : [];
        $page = max(1, (int) ($validated['page'] ?? 1));

        return new self(
            page: $page,
            filters: EnvioParticipanteIndexFiltersDTO::fromArray($filtersRaw),
        );
    }

    /**
     * Payload esperado por {@see \App\Services\EnvioUsuarioService::query}.
     *
     * @return array{page: int, limit: int, orderBy: list<list<string>>, where: list<array{0: string, 1: mixed}>}
     */
    public function toEnvioUsuarioQueryPayload(): array
    {
        return [
            'page' => $this->page,
            'limit' => self::PAGE_SIZE,
            'orderBy' => [['data_agendamento_envio', 'desc']],
            'where' => $this->filters->toWhereArray(),
        ];
    }
}
