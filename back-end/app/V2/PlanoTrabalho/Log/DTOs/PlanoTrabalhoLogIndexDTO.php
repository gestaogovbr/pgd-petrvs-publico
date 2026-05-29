<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Log\DTOs;

final class PlanoTrabalhoLogIndexDTO
{
    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly int $page,
        public readonly int $size,
        public readonly ?string $usuarioId,
        public readonly ?string $usuarioNome,
        public readonly ?string $dataInicio,
        public readonly ?string $dataFim,
        public readonly ?string $event,
        public readonly ?string $search,
        public readonly ?string $modelo,
    ) {}

    public static function fromRequest(string $planoTrabalhoId, array $data): self
    {
        $filters = $data['filters'] ?? [];

        return new self(
            planoTrabalhoId: $planoTrabalhoId,
            page: max(1, (int) ($data['page'] ?? 1)),
            size: max(1, min(100, (int) ($data['size'] ?? 20))),
            usuarioId: self::nullableString($filters['usuario_id'] ?? null),
            usuarioNome: self::nullableString($filters['usuario_nome'] ?? null),
            dataInicio: self::nullableString($filters['data_inicio'] ?? null),
            dataFim: self::nullableString($filters['data_fim'] ?? null),
            event: self::nullableString($filters['event'] ?? null),
            search: self::nullableString($filters['search'] ?? null),
            modelo: self::nullableString($filters['modelo'] ?? null),
        );
    }

    private static function nullableString(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $string = trim((string) $value);

        return $string === '' ? null : $string;
    }
}
