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
        public float $esforco_total_horas,
        public array $filhos = [],
        public readonly ?array $objetivo_pai = null,
        public readonly ?array $objetivo_superior = null,
    ) {}

    public static function fromRow(object $row): self
    {
        return new self(
            objetivo_id: $row->objetivo_id,
            objetivo_nome: $row->objetivo_nome,
            objetivo_pai_id: $row->objetivo_pai_id,
            objetivo_superior_id: $row->objetivo_superior_id,
            planejamento_nome: $row->planejamento_nome,
            total_entregas: (int) $row->total_entregas,
            esforco_proprio: (float) $row->esforco_proprio,
            esforco_total_horas: (float) $row->esforco_proprio,
            objetivo_pai: $row->objetivo_pai_id
                ? ['id' => $row->objetivo_pai_id, 'nome' => $row->pai_nome]
                : null,
            objetivo_superior: $row->objetivo_superior_id
                ? ['id' => $row->objetivo_superior_id, 'nome' => $row->sup_nome]
                : null,
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
