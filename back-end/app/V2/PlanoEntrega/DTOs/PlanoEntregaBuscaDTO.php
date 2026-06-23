<?php

declare(strict_types=1);

namespace App\V2\PlanoEntrega\DTOs;

class PlanoEntregaBuscaDTO
{
    public function __construct(
        public readonly string $unidadeId,
        public readonly ?string $dataInicio = null,
        public readonly ?string $dataFim = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            unidadeId: $data['unidade_id'],
            dataInicio: $data['data_inicio'] ?? null,
            dataFim: $data['data_fim'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'unidade_id' => $this->unidadeId,
            'data_inicio' => $this->dataInicio,
            'data_fim' => $this->dataFim,
        ];
    }
}
