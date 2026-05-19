<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs;

class AtividadeStoreDTO implements IAtividadeWriteDTO
{
    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly string $consolidacaoId,
        public readonly string $usuarioId,
        public readonly string $planoTrabalhoEntregaId,
        public readonly string $descricao,
    ) {}

    public static function fromArray(array $data, string $planoTrabalhoId, string $consolidacaoId, string $usuarioId): self
    {
        return new self(
            planoTrabalhoId: $planoTrabalhoId,
            consolidacaoId: $consolidacaoId,
            usuarioId: $usuarioId,
            planoTrabalhoEntregaId: $data['plano_trabalho_entrega_id'],
            descricao: $data['descricao'],
        );
    }

    public function planoTrabalhoId(): string { return $this->planoTrabalhoId; }
    public function consolidacaoId(): string { return $this->consolidacaoId; }
    public function usuarioId(): string { return $this->usuarioId; }
    public function atividadeId(): ?string { return null; }
    public function planoTrabalhoEntregaId(): ?string { return $this->planoTrabalhoEntregaId; }

    public function toArray(): array
    {
        return [
            'plano_trabalho_entrega_id' => $this->planoTrabalhoEntregaId,
            'descricao' => $this->descricao,
        ];
    }

    public function toPersistArray(string $planoTrabalhoId, string $unidadeId): array
    {
        return [
            'descricao' => $this->descricao,
            'plano_trabalho_entrega_id' => $this->planoTrabalhoEntregaId,
            'plano_trabalho_consolidacao_id' => $this->consolidacaoId,
            'plano_trabalho_id' => $planoTrabalhoId,
            'unidade_id' => $unidadeId,
            'demandante_id' => $this->usuarioId,
            'usuario_id' => $this->usuarioId,
            'data_distribuicao' => now()->format('Y-m-d H:i:s'),
            'data_estipulada_entrega' => now()->format('Y-m-d H:i:s'),
            'tempo_planejado' => 0,
            'esforco' => 0,
        ];
    }
}
