<?php

declare(strict_types=1);

namespace App\V2\Planejamento\TipoObjetivo\DTOs;

use App\Enums\EstruturaElementoEnum;

class TipoPlanejamentoObjetivoUpdateDTO
{
    public function __construct(
        public readonly string $id,
        public readonly ?string $nome,
        public readonly ?string $descricao,
        public readonly ?EstruturaElementoEnum $estrutura,
    ) {}

    public static function fromArray(array $data, string $id): self
    {
        return new self(
            id: $id,
            nome: $data['nome'] ?? null,
            descricao: array_key_exists('descricao', $data) ? $data['descricao'] : null,
            estrutura: isset($data['estrutura']) ? EstruturaElementoEnum::from($data['estrutura']) : null,
        );
    }

    /** @return array<string, mixed> */
    public function toPersistArray(): array
    {
        $data = array_filter([
            'nome' => $this->nome,
            'descricao' => $this->descricao,
        ], fn ($value) => $value !== null);

        if ($this->estrutura !== null) {
            $data['estrutura'] = $this->estrutura->value;
        }

        return $data;
    }
}
