<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\DTOs;

class PlanoTrabalhoEntregaStoreDTO
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
        $origem = $data['origem'];

        return new self(
            planoTrabalhoId: $planoTrabalhoId,
            origem: $origem,
            planoEntregaEntregaId: $origem === 'PLANO_ENTREGA' ? $data['plano_entrega_entrega_id'] : null,
            orgao: $origem === 'OUTRO_ORGAO' ? $data['orgao'] : null,
            forcaTrabalho: (float) ($data['forca_trabalho'] ?? 0),
            descricao: $data['descricao'] ?? '',
        );
    }

    public function toArray(): array
    {
        return [
            'plano_trabalho_id' => $this->planoTrabalhoId,
            'plano_entrega_entrega_id' => $this->planoEntregaEntregaId,
            'orgao' => $this->orgao,
            'forca_trabalho' => $this->forcaTrabalho,
            'descricao' => $this->descricao,
        ];
    }
}
