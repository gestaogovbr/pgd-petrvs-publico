<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DTOs;

use App\Models\PlanoTrabalhoEntrega;

class PlanoTrabalhoEntregaCloneDTO
{
    public function __construct(
        public readonly ?string $planoEntregaEntregaId,
        public readonly ?string $orgao,
        public readonly string $descricao,
    ) {}

    public static function fromEntrega(PlanoTrabalhoEntrega $entrega): ?self
    {
        if ($entrega->plano_entrega_entrega_id !== null && $entrega->planoEntregaEntrega === null) {
            return null;
        }

        return new self(
            planoEntregaEntregaId: $entrega->plano_entrega_entrega_id,
            orgao: $entrega->orgao,
            descricao: $entrega->descricao,
        );
    }

    public function toArray(): array
    {
        return [
            'plano_entrega_entrega_id' => $this->planoEntregaEntregaId,
            'orgao' => $this->orgao,
            'descricao' => $this->descricao,
            'forca_trabalho' => 0,
        ];
    }
}
