<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega\DTOs;

/**
 * Filtros do relatório de entregas (API v2).
 */
final class RelatorioEntregaIndexFiltersDTO
{
    public function __construct(
        public readonly ?string $unidadeId,
        public readonly bool $incluirUnidadesSubordinadas,
        public readonly ?string $periodoInicio,
        public readonly ?string $periodoFim,
    ) {}

    /**
     * @param array<string, mixed> $filters
     */
    public static function fromArray(array $filters): self
    {
        return new self(
            unidadeId: self::trimmedStringOrNull($filters['unidade_id'] ?? null),
            incluirUnidadesSubordinadas: array_key_exists('incluir_unidades_subordinadas', $filters),
            periodoInicio: self::dateStringOrNull($filters['periodo_inicio'] ?? null),
            periodoFim: self::dateStringOrNull($filters['periodo_fim'] ?? null),
        );
    }

    public function hasPeriodoCompleto(): bool
    {
        return ($this->periodoInicio !== null && $this->periodoInicio !== '')
            && ($this->periodoFim !== null && $this->periodoFim !== '');
    }

    public function hasPeriodoParcial(): bool
    {
        $hasInicio = $this->periodoInicio !== null && $this->periodoInicio !== '';
        $hasFim = $this->periodoFim !== null && $this->periodoFim !== '';

        return $hasInicio xor $hasFim;
    }

    /**
     * @return array<int, array{0: string, 1: string, 2: mixed}>
     */
    public function toWhereArray(): array
    {
        $where = [];

        if ($this->unidadeId !== null && $this->unidadeId !== '') {
            $where[] = ['unidade_id', '==', $this->unidadeId];
        }

        if ($this->incluirUnidadesSubordinadas) {
            $where[] = ['incluir_unidades_subordinadas', '==', 1];
        }

        if ($this->hasPeriodoCompleto()) {
            $where[] = ['periodoInicio', '>=', $this->periodoInicio];
            $where[] = ['periodoFim', '<=', $this->periodoFim];
        } elseif (
            ($this->periodoInicio === null || $this->periodoInicio === '')
            && ($this->periodoFim === null || $this->periodoFim === '')
        ) {
            $where[] = ['consultaData', '==', now()->toDateString()];
        }

        return $where;
    }

    private static function trimmedStringOrNull(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }
        $s = trim((string) $value);

        return $s === '' ? null : $s;
    }

    private static function dateStringOrNull(mixed $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (string) $value;
    }
}
