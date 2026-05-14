<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

class EsforcoNodeDTO implements \JsonSerializable
{
    /**
     * @param  list<string>  $filhos           União de filhos_pai e filhos_superior (compat retro)
     * @param  list<string>  $filhos_pai       Descendentes via objetivo_pai_id
     * @param  list<string>  $filhos_superior  Descendentes via objetivo_superior_id
     * @param  array{id: string, nome: string}|null  $objetivo_pai
     * @param  array{id: string, nome: string}|null  $objetivo_superior
     */
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
        public readonly array $filhos_pai = [],
        public readonly array $filhos_superior = [],
        public readonly ?array $objetivo_pai = null,
        public readonly ?array $objetivo_superior = null,
    ) {}

    /**
     * @param  array<string, mixed>  $node
     */
    public static function fromNode(array $node): self
    {
        return new self(
            objetivo_id: (string) $node['objetivo_id'],
            objetivo_nome: (string) $node['objetivo_nome'],
            objetivo_pai_id: isset($node['objetivo_pai_id']) ? (string) $node['objetivo_pai_id'] : null,
            objetivo_superior_id: isset($node['objetivo_superior_id']) ? (string) $node['objetivo_superior_id'] : null,
            planejamento_nome: (string) $node['planejamento_nome'],
            total_entregas: (int) $node['total_entregas'],
            esforco_proprio: (float) $node['esforco_proprio'],
            esforco_total_horas: (float) $node['esforco_total_horas'],
            filhos: array_values((array) ($node['filhos'] ?? [])),
            filhos_pai: array_values((array) ($node['filhos_pai'] ?? [])),
            filhos_superior: array_values((array) ($node['filhos_superior'] ?? [])),
            objetivo_pai: $node['objetivo_pai'] ?? null,
            objetivo_superior: $node['objetivo_superior'] ?? null,
        );
    }

    /** @return array<string, mixed> */
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
            'filhos_pai' => $this->filhos_pai,
            'filhos_superior' => $this->filhos_superior,
            'objetivo_pai' => $this->objetivo_pai,
            'objetivo_superior' => $this->objetivo_superior,
        ];
    }
}
