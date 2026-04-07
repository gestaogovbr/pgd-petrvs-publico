<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs;

class AtividadeDestroyDTO implements IAtividadeWriteDTO
{
    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly string $consolidacaoId,
        public readonly string $atividadeId,
        public readonly string $usuarioId,
    ) {}

    public function planoTrabalhoId(): string { return $this->planoTrabalhoId; }
    public function consolidacaoId(): string { return $this->consolidacaoId; }
    public function usuarioId(): string { return $this->usuarioId; }
    public function atividadeId(): ?string { return $this->atividadeId; }
    public function planoTrabalhoEntregaId(): ?string { return null; }

    public function toArray(): array { return []; }
}
