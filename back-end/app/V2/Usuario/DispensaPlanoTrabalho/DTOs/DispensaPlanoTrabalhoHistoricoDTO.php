<?php

declare(strict_types=1);

namespace App\V2\Usuario\DispensaPlanoTrabalho\DTOs;

final class DispensaPlanoTrabalhoHistoricoDTO implements \JsonSerializable
{
    public function __construct(
        public readonly string $id,
        public readonly string $operacao,
        public readonly string $data_inicio,
        public readonly ?string $data_fim,
        public readonly string $ciencia_em,
        public readonly string $responsavel_id,
        public readonly string $responsavel_nome,
        public readonly string $created_at,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'operacao' => $this->operacao,
            'data_inicio' => $this->data_inicio,
            'data_fim' => $this->data_fim,
            'ciencia_em' => $this->ciencia_em,
            'responsavel_id' => $this->responsavel_id,
            'responsavel_nome' => $this->responsavel_nome,
            'created_at' => $this->created_at,
        ];
    }
}
