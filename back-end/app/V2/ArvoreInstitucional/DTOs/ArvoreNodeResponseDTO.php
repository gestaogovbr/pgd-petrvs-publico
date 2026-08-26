<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional\DTOs;

/**
 * Nó genérico da árvore institucional.
 * Contrato unificado entre Cadeia de Valor e Planejamento Institucional.
 */
final class ArvoreNodeResponseDTO implements \JsonSerializable
{
    /**
     * @param list<string> $filhos_ids Filhos na hierarquia principal
     * @param list<string> $filhos_secondary_ids Filhos na hierarquia secundária (vazio para domínios sem hierarquia dupla)
     */
    public function __construct(
        public readonly string $id,
        public readonly string $nome,
        public readonly string $container_nome,
        public readonly ?string $tipo_nome,
        public readonly ?string $parent_id,
        public readonly ?string $secondary_parent_id,
        public readonly array $filhos_ids,
        public readonly array $filhos_secondary_ids,
        public readonly int $total_vinculos,
        public readonly float $esforco_disponivel_horas,
        public readonly float $esforco_proprio_horas,
        public readonly float $esforco_total_horas,
        public readonly float $planejado_percentual_disponivel,
    ) {}

    /**
     * Cria a partir do mapa genérico retornado por carregarEsforcoAcumulado.
     */
    public static function fromMapaNode(string $id, array $node): self
    {
        return new self(
            id: $id,
            nome: (string) ($node['no_nome'] ?? ''),
            container_nome: (string) ($node['container_nome'] ?? ''),
            tipo_nome: isset($node['tipo_nome']) && $node['tipo_nome'] !== '' ? (string) $node['tipo_nome'] : null,
            parent_id: $node['no_pai_id'] ?? null,
            secondary_parent_id: $node['no_pai_secundario_id'] ?? null,
            filhos_ids: $node['filhos_pai'] ?? [],
            filhos_secondary_ids: $node['filhos_secundario'] ?? [],
            total_vinculos: (int) ($node['total_entregas'] ?? 0),
            esforco_disponivel_horas: (float) ($node['esforco_disponivel_horas'] ?? 0),
            esforco_proprio_horas: (float) ($node['esforco_proprio'] ?? 0),
            esforco_total_horas: (float) ($node['esforco_total_horas'] ?? 0),
            planejado_percentual_disponivel: (float) ($node['planejado_percentual_disponivel'] ?? 0),
        );
    }

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'container_nome' => $this->container_nome,
            'tipo_nome' => $this->tipo_nome,
            'parent_id' => $this->parent_id,
            'secondary_parent_id' => $this->secondary_parent_id,
            'filhos_ids' => $this->filhos_ids,
            'filhos_secondary_ids' => $this->filhos_secondary_ids,
            'total_vinculos' => $this->total_vinculos,
            'esforco_disponivel_horas' => $this->esforco_disponivel_horas,
            'esforco_proprio_horas' => $this->esforco_proprio_horas,
            'esforco_total_horas' => $this->esforco_total_horas,
            'planejado_percentual_disponivel' => $this->planejado_percentual_disponivel,
        ];
    }
}
