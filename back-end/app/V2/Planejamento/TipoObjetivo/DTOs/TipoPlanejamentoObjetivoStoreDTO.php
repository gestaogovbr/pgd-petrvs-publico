<?php

declare(strict_types=1);

namespace App\V2\Planejamento\TipoObjetivo\DTOs;

use App\Enums\EstruturaElementoEnum;

class TipoPlanejamentoObjetivoStoreDTO
{
    public function __construct(
        public readonly string $nome,
        public readonly ?string $descricao,
        public readonly EstruturaElementoEnum $estrutura,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            nome: $data['nome'],
            descricao: $data['descricao'] ?? null,
            estrutura: EstruturaElementoEnum::from($data['estrutura']),
        );
    }

    /** @return array<string, mixed> */
    public function toPersistArray(): array
    {
        return [
            'nome' => $this->nome,
            'descricao' => $this->descricao,
            'estrutura' => $this->estrutura->value,
        ];
    }
}
