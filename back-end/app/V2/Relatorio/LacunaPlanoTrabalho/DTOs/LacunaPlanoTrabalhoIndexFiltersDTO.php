<?php

declare(strict_types=1);

namespace App\V2\Relatorio\LacunaPlanoTrabalho\DTOs;

/**
 * Filtros da listagem de lacunas de Plano de Trabalho (API v2).
 */
final class LacunaPlanoTrabalhoIndexFiltersDTO
{
    public function __construct(
        public readonly string $unidadeId,
        public readonly string $periodoInicio,
        public readonly string $periodoFim,
        public readonly bool $incluirUnidadesSubordinadas,
        public readonly ?string $nome,
        public readonly ?string $matricula,
        public readonly ?string $unidadeHierarquia,
        public readonly ?string $lacuna,
        public readonly ?int $quantidadeDias,
        public readonly ?string $ocorrenciasTexto,
    ) {}

    /**
     * @param array<string, mixed> $filters
     */
    public static function fromArray(array $filters): self
    {
        return new self(
            unidadeId: (string) ($filters['unidade_id'] ?? ''),
            periodoInicio: self::dateString((string) ($filters['periodo_inicio'] ?? '')),
            periodoFim: self::dateString((string) ($filters['periodo_fim'] ?? '')),
            incluirUnidadesSubordinadas: self::toBool($filters['incluir_unidades_subordinadas'] ?? false),
            nome: self::trimmedStringOrNull($filters['nome'] ?? null),
            matricula: self::trimmedStringOrNull($filters['matricula'] ?? null),
            unidadeHierarquia: self::trimmedStringOrNull($filters['unidadeHierarquia'] ?? null),
            lacuna: self::trimmedStringOrNull($filters['lacuna'] ?? null),
            quantidadeDias: self::intOrNull($filters['quantidade_dias'] ?? null),
            ocorrenciasTexto: self::trimmedStringOrNull($filters['ocorrencias_texto'] ?? null),
        );
    }

    /**
     * Formato `where` esperado por {@see \App\Repository\RelatorioLacunaPlanoTrabalho\Contracts\RelatorioLacunaPlanoTrabalhoReadRepositoryContract}.
     *
     * @return list<array{0: string, 1: string, 2: mixed}>
     */
    public function toWhereArray(): array
    {
        $where = [
            ['unidade_id', '==', $this->unidadeId],
            ['periodo_inicio', '==', $this->periodoInicio],
            ['periodo_fim', '==', $this->periodoFim],
        ];

        if ($this->incluirUnidadesSubordinadas) {
            $where[] = ['incluir_unidades_subordinadas', '==', 1];
        }

        if ($this->nome !== null) {
            $where[] = ['nome', 'like', '%' . $this->nome . '%'];
        }
        if ($this->matricula !== null) {
            $where[] = ['matricula', 'like', '%' . $this->matricula . '%'];
        }
        if ($this->unidadeHierarquia !== null) {
            $where[] = ['unidadeHierarquia', 'like', '%' . $this->unidadeHierarquia . '%'];
        }
        if ($this->lacuna !== null) {
            $where[] = ['lacuna', 'like', '%' . $this->lacuna . '%'];
        }
        if ($this->quantidadeDias !== null) {
            $where[] = ['quantidade_dias', '==', $this->quantidadeDias];
        }
        if ($this->ocorrenciasTexto !== null) {
            $where[] = ['ocorrencias_texto', 'like', '%' . $this->ocorrenciasTexto . '%'];
        }

        return $where;
    }

    private static function toBool(mixed $value): bool
    {
        if (is_bool($value)) {
            return $value;
        }

        return in_array((string) $value, ['1', 'true', 'on', 'yes'], true);
    }

    private static function trimmedStringOrNull(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }
        $s = trim((string) $value);

        return $s === '' ? null : $s;
    }

    private static function intOrNull(mixed $value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (int) $value;
    }

    private static function dateString(string $value): string
    {
        return substr($value, 0, 10);
    }
}
