<?php

declare(strict_types=1);

namespace App\V2\Planejamento\TipoObjetivo\DTOs;

class TipoPlanejamentoObjetivoUpdateDTO
{
    public function __construct(
        public readonly string $id,
        public readonly ?string $nome,
        public readonly ?string $descricao,
    ) {}

    public static function fromArray(array $data, string $id): self
    {
        return new self(
            id: $id,
            nome: $data['nome'] ?? null,
            descricao: array_key_exists('descricao', $data) ? $data['descricao'] : null,
        );
    }

    /** @return array<string, mixed> */
    public function toPersistArray(): array
    {
        return array_filter([
            'nome' => $this->nome,
            'descricao' => $this->descricao,
        ], fn ($value) => $value !== null);
    }
}
