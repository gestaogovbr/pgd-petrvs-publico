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

    /** Consulta sem período informado usa a data de hoje (RN07 validada antes). */
    public function usaDataConsultaHoje(): bool
    {
        return ! $this->hasPeriodoCompleto() && ! $this->hasPeriodoParcial();
    }

    /** Data de referência (DC) para cálculo da situação — sempre a data atual. */
    public function resolveDataConsulta(): string
    {
        return now()->toDateString();
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
