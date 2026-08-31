<?php

declare(strict_types=1);

namespace App\V2\Unidade\DTOs;

class UnidadeResumoDTO
{
    public function __construct(
        public readonly string $id,
        public readonly string $sigla,
        public readonly string $nome,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'],
            sigla: $data['sigla'],
            nome: $data['nome'],
        );
    }

    public static function fromModel(object $unidade): self
    {
        return new self(
            id: $unidade->id,
            sigla: $unidade->sigla,
            nome: $unidade->nome,
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
