<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

class EsforcoNodeDTO implements \JsonSerializable
{
    /** @param string[] $filhos */
    public function __construct(
        public readonly string $objetivo_id,
        public readonly string $objetivo_nome,
        public readonly ?string $objetivo_pai_id,
        public readonly ?string $objetivo_superior_id,
        public readonly string $planejamento_nome,
        public readonly int $total_entregas,
        public readonly float $esforco_proprio,
        public readonly float $esforco_total_horas,
        public readonly array $filhos = [],
        public readonly ?array $objetivo_pai = null,
        public readonly ?array $objetivo_superior = null,
    ) {}

    public static function fromNode(array $node): self
    {
        return new self(
            objetivo_id: $node['objetivo_id'],
            objetivo_nome: $node['objetivo_nome'],
            objetivo_pai_id: $node['objetivo_pai_id'] ?? null,
            objetivo_superior_id: $node['objetivo_superior_id'] ?? null,
            planejamento_nome: $node['planejamento_nome'],
            total_entregas: $node['total_entregas'],
            esforco_proprio: $node['esforco_proprio'],
            esforco_total_horas: $node['esforco_total_horas'],
            filhos: $node['filhos'] ?? [],
            objetivo_pai: $node['objetivo_pai'] ?? null,
            objetivo_superior: $node['objetivo_superior'] ?? null,
        );
    }

    public function jsonSerialize(): array
    {
        return [
            'objetivo_id' => $this->objetivo_id,
            'objetivo_nome' => $this->objetivo_nome,
            'objetivo_pai_id' => $this->objetivo_pai_id,
            'objetivo_superior_id' => $this->objetivo_superior_id,
            'planejamento_nome' => $this->planejamento_nome,
            'total_entregas' => $this->total_entregas,
            'esforco_proprio' => $this->esforco_proprio,
            'esforco_total_horas' => $this->esforco_total_horas,
            'filhos' => $this->filhos,
            'objetivo_pai' => $this->objetivo_pai,
            'objetivo_superior' => $this->objetivo_superior,
        ];
    }
}
