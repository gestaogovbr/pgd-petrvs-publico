<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao\DTOs;

use App\DTOs\AbstractFiltersDTO;
use App\Enums\RelatorioGeracaoTipo;

/**
 * Filtros da listagem de exportação de relatórios (API v2).
 */
final class RelatorioGeracaoIndexFiltersDTO extends AbstractFiltersDTO
{
    public function __construct(
        public readonly ?string $tipo = null,
        public readonly ?string $status = null,
        public readonly ?string $geracaoInicio = null,
        public readonly ?string $geracaoFim = null,
    ) {
    }

    /**
     * @param array<string, mixed> $filters
     */
    public static function fromArray(array $filters): self
    {
        $tipoRaw = self::trimmedStringOrNull($filters['tipo'] ?? null);

        return new self(
            tipo: $tipoRaw !== null ? RelatorioGeracaoTipo::grupoDe($tipoRaw) : null,
            status: self::trimmedStringOrNull($filters['status'] ?? null),
            geracaoInicio: self::dateStringOrNull($filters['geracao_inicio'] ?? null),
            geracaoFim: self::dateStringOrNull($filters['geracao_fim'] ?? null),
        );
    }

    /**
     * Tipos internos cobertos pelo grupo selecionado no filtro de relatório.
     *
     * @return list<string>
     */
    public function tipos(): array
    {
        if ($this->tipo === null) {
            return [];
        }

        return RelatorioGeracaoTipo::valuesByGrupo($this->tipo);
    }

    public function hasPeriodoCompleto(): bool
    {
        return $this->geracaoInicio !== null && $this->geracaoFim !== null;
    }
}
