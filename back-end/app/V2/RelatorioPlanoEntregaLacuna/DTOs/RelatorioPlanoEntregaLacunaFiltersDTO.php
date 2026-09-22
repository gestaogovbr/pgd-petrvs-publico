<?php

declare(strict_types=1);

namespace App\V2\RelatorioPlanoEntregaLacuna\DTOs;

final class RelatorioPlanoEntregaLacunaFiltersDTO
{
    public function __construct(
        public readonly ?string $unidadeId,
        public readonly bool $incluirUnidadesSubordinadas,
        public readonly ?string $periodoInicio,
        public readonly ?string $periodoFim,
        public readonly ?string $unidadeHierarquia,
        public readonly ?string $nome,
        public readonly ?string $codigo,
        public readonly ?string $lacuna,
        public readonly ?string $quantidadeDias,
    ) {}

    /**
     * @param array<string, mixed> $filters
     */
    public static function fromArray(array $filters): self
    {
        return new self(
            unidadeId: self::nullableString($filters['unidade_id'] ?? null),
            incluirUnidadesSubordinadas: filter_var($filters['incluir_unidades_subordinadas'] ?? false, FILTER_VALIDATE_BOOLEAN),
            periodoInicio: self::nullableString($filters['periodo_inicio'] ?? null),
            periodoFim: self::nullableString($filters['periodo_fim'] ?? null),
            unidadeHierarquia: self::nullableString($filters['unidadeHierarquia'] ?? null),
            nome: self::nullableString($filters['nome'] ?? null),
            codigo: self::nullableString($filters['codigo'] ?? null),
            lacuna: self::nullableString($filters['lacuna'] ?? null),
            quantidadeDias: self::nullableString($filters['quantidade_dias'] ?? null),
        );
    }

    private static function nullableString(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $texto = trim((string) $value);

        return $texto === '' ? null : $texto;
    }
}
