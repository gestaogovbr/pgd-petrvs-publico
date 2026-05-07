<?php

declare(strict_types=1);

namespace App\V2\TipoPlanejamentoObjetivo\DTOs;

class TipoPlanejamentoObjetivoStoreDTO
{
    public function __construct(
        public readonly string $nome,
        public readonly ?string $descricao,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            nome: $data['nome'],
            descricao: $data['descricao'] ?? null,
        );
    }

    /** @return array<string, mixed> */
    public function toPersistArray(): array
    {
        return [
            'nome' => $this->nome,
            'descricao' => $this->descricao,
        ];
    }
}
