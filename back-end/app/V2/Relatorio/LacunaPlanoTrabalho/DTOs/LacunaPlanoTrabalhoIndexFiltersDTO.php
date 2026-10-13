<?php

declare(strict_types=1);

namespace App\V2\Relatorio\LacunaPlanoTrabalho\DTOs;

use App\DTOs\AbstractFiltersDTO;

/**
 * Filtros da listagem de lacunas de Plano de Trabalho (API v2).
 */
final class LacunaPlanoTrabalhoIndexFiltersDTO extends AbstractFiltersDTO
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
            periodoInicio: self::dateString($filters['periodo_inicio'] ?? ''),
            periodoFim: self::dateString($filters['periodo_fim'] ?? ''),
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
     * Payload de filtros no formato esperado pelo repositório.
     *
     * @return array{
     *     unidade_id: string,
     *     periodo_inicio: string,
     *     periodo_fim: string,
     *     incluir_unidades_subordinadas: bool,
     *     nome: ?string,
     *     matricula: ?string,
     *     unidadeHierarquia: ?string,
     *     lacuna: ?string,
     *     quantidade_dias: ?int,
     *     ocorrencias_texto: ?string
     * }
     */
    public function toArray(): array
    {
        return [
            'unidade_id' => $this->unidadeId,
            'periodo_inicio' => $this->periodoInicio,
            'periodo_fim' => $this->periodoFim,
            'incluir_unidades_subordinadas' => $this->incluirUnidadesSubordinadas,
            'nome' => $this->nome,
            'matricula' => $this->matricula,
            'unidadeHierarquia' => $this->unidadeHierarquia,
            'lacuna' => $this->lacuna,
            'quantidade_dias' => $this->quantidadeDias,
            'ocorrencias_texto' => $this->ocorrenciasTexto,
        ];
    }
}
