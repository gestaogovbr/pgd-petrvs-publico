<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\DTOs;

class PlanoTrabalhoEntregaStoreDTO
{
    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly string $planoEntregaEntregaId,
        public readonly float $forcaTrabalho,
        public readonly string $descricao,
    ) {}

    public static function fromArray(array $data, string $planoTrabalhoId): self
    {
        return new self(
            planoTrabalhoId: $planoTrabalhoId,
            planoEntregaEntregaId: $data['plano_entrega_entrega_id'],
            forcaTrabalho: (float) ($data['forca_trabalho'] ?? 0),
            descricao: $data['descricao'] ?? '',
        );
    }

    public function toArray(): array
    {
        return [
            'plano_trabalho_id' => $this->planoTrabalhoId,
            'plano_entrega_entrega_id' => $this->planoEntregaEntregaId,
            'forca_trabalho' => $this->forcaTrabalho,
            'descricao' => $this->descricao,
        ];
    }
}
