<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\DTOs;

class UnidadeResumoDTO
{
    public function __construct(
        public readonly string $id,
        public readonly string $sigla,
        public readonly string $nome,
    ) {}

    public static function fromRow(object $row): self
    {
        return new self(
            id: $row->id,
            sigla: $row->sigla,
            nome: $row->nome,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'sigla' => $this->sigla,
            'nome' => $this->nome,
        ];
    }
}
