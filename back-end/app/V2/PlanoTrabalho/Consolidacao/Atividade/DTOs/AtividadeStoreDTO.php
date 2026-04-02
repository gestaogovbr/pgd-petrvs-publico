<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs;

class AtividadeStoreDTO
{
    private const MAX_DESCRICAO_LENGTH = 1500;

    public function __construct(
        public readonly string $planoTrabalhoEntregaId,
        public readonly string $descricao,
        public readonly string $planoTrabalhoConsolidacaoId,
        public readonly string $planoTrabalhoId,
        public readonly string $unidadeId,
        public readonly string $demandanteId,
        public readonly string $usuarioId,
    ) {}

    public static function fromArray(array $data, string $consolidacaoId, string $planoTrabalhoId, string $unidadeId, string $usuarioId): self
    {
        return new self(
            planoTrabalhoEntregaId: $data['plano_trabalho_entrega_id'],
            descricao: mb_substr($data['descricao'], 0, self::MAX_DESCRICAO_LENGTH),
            planoTrabalhoConsolidacaoId: $consolidacaoId,
            planoTrabalhoId: $planoTrabalhoId,
            unidadeId: $unidadeId,
            demandanteId: $usuarioId,
            usuarioId: $usuarioId,
        );
    }

    public function toArray(): array
    {
        return [
            'descricao' => $this->descricao,
            'plano_trabalho_entrega_id' => $this->planoTrabalhoEntregaId,
            'plano_trabalho_consolidacao_id' => $this->planoTrabalhoConsolidacaoId,
            'plano_trabalho_id' => $this->planoTrabalhoId,
            'unidade_id' => $this->unidadeId,
            'demandante_id' => $this->demandanteId,
            'usuario_id' => $this->usuarioId,
            'data_distribuicao' => now()->format('Y-m-d H:i:s'),
            'data_estipulada_entrega' => now()->format('Y-m-d H:i:s'),
            'tempo_planejado' => 0,
            'esforco' => 0,
        ];
    }
}
