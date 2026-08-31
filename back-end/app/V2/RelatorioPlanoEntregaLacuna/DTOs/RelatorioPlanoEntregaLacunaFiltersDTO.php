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

    /**
     * @return list<array{0: string, 1: string, 2: mixed}>
     */
    public function toWhereArray(): array
    {
        $where = [];

        if ($this->unidadeId !== null) {
            $where[] = ['unidade_id', '==', $this->unidadeId];
        }
        if ($this->incluirUnidadesSubordinadas) {
            $where[] = ['incluir_unidades_subordinadas', '==', 1];
        }
        if ($this->periodoInicio !== null) {
            $where[] = ['periodo_inicio', '>=', $this->periodoInicio];
        }
        if ($this->periodoFim !== null) {
            $where[] = ['periodo_fim', '<=', $this->periodoFim];
        }
        if ($this->unidadeHierarquia !== null) {
            $where[] = ['unidadeHierarquia', 'like', '%' . $this->unidadeHierarquia . '%'];
        }
        if ($this->nome !== null) {
            $where[] = ['nome', 'like', '%' . $this->nome . '%'];
        }
        if ($this->codigo !== null) {
            $where[] = ['codigo', 'like', '%' . $this->codigo . '%'];
        }
        if ($this->lacuna !== null) {
            $where[] = ['lacuna', 'like', '%' . $this->lacuna . '%'];
        }
        if ($this->quantidadeDias !== null) {
            $where[] = ['quantidade_dias', '==', $this->quantidadeDias];
        }

        return $where;
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
