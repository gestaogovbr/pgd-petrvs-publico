<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\DTOs;

class PlanoTrabalhoEntregaUpdateDTO
{
    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly string $origem,
        public readonly ?string $planoEntregaEntregaId,
        public readonly ?string $orgao,
        public readonly float $forcaTrabalho,
        public readonly string $descricao,
    ) {}

    public static function fromArray(array $data, string $planoTrabalhoId): self
    {
        return new self(
            planoTrabalhoId: $planoTrabalhoId,
            origem: $data['origem'] ?? 'PROPRIA_UNIDADE',
            planoEntregaEntregaId: $data['plano_entrega_entrega_id'] ?? null,
            orgao: $data['orgao'] ?? null,
            forcaTrabalho: (float) ($data['forca_trabalho'] ?? 0),
            descricao: $data['descricao'] ?? '',
        );
    }

    public function toArray(): array
    {
        return [
            'plano_trabalho_id' => $this->planoTrabalhoId,
            'plano_entrega_entrega_id' => in_array($this->origem, ['PROPRIA_UNIDADE', 'OUTRA_UNIDADE']) ? $this->planoEntregaEntregaId : null,
            'orgao' => $this->origem === 'OUTRO_ORGAO' ? $this->orgao : null,
            'forca_trabalho' => $this->forcaTrabalho,
            'descricao' => $this->descricao,
        ];
    }
}
