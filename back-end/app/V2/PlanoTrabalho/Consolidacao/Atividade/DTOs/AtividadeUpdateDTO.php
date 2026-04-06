<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs;

class AtividadeUpdateDTO
{
    private const MAX_DESCRICAO_LENGTH = 1500;

    public function __construct(
        public readonly ?string $descricao,
        public readonly ?string $planoTrabalhoEntregaId,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            descricao: isset($data['descricao']) ? mb_substr($data['descricao'], 0, self::MAX_DESCRICAO_LENGTH) : null,
            planoTrabalhoEntregaId: $data['plano_trabalho_entrega_id'] ?? null,
        );
    }

    public function toArray(): array
    {
        return array_filter([
            'descricao' => $this->descricao,
            'plano_trabalho_entrega_id' => $this->planoTrabalhoEntregaId,
        ], fn($v) => $v !== null);
    }
}
