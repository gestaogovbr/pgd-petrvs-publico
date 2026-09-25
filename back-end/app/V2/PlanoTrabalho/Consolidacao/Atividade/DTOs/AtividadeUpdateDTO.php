<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs;

class AtividadeUpdateDTO implements IAtividadeWriteDTO
{
    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly string $consolidacaoId,
        public readonly string $atividadeId,
        public readonly string $usuarioId,
        public readonly ?string $descricao,
        public readonly ?string $planoTrabalhoEntregaId,
        public readonly ?float $esforcoExecutado,
        public readonly ?string $justificativa = null,
    ) {}

    public static function fromArray(array $data, string $planoTrabalhoId, string $consolidacaoId, string $atividadeId, string $usuarioId): self
    {
        return new self(
            planoTrabalhoId: $planoTrabalhoId,
            consolidacaoId: $consolidacaoId,
            atividadeId: $atividadeId,
            usuarioId: $usuarioId,
            descricao: $data['descricao'] ?? null,
            planoTrabalhoEntregaId: $data['plano_trabalho_entrega_id'] ?? null,
            esforcoExecutado: array_key_exists('esforco_executado', $data)
                ? (float) $data['esforco_executado']
                : null,
            justificativa: isset($data['justificativa']) ? trim((string) $data['justificativa']) : null,
        );
    }

    public function planoTrabalhoId(): string { return $this->planoTrabalhoId; }
    public function consolidacaoId(): string { return $this->consolidacaoId; }
    public function usuarioId(): string { return $this->usuarioId; }
    public function atividadeId(): ?string { return $this->atividadeId; }
    public function planoTrabalhoEntregaId(): ?string { return $this->planoTrabalhoEntregaId; }
    public function esforcoExecutado(): ?float { return $this->esforcoExecutado; }

    public function toArray(): array
    {
        return array_filter([
            'descricao' => $this->descricao,
            'plano_trabalho_entrega_id' => $this->planoTrabalhoEntregaId,
        ], fn ($v) => $v !== null);
    }
}
