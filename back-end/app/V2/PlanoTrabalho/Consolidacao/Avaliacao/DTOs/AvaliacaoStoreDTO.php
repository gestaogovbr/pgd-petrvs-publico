<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs;

use App\Models\TipoAvaliacaoNota;

class AvaliacaoStoreDTO
{
    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly string $consolidacaoId,
        public readonly string $avaliadorId,
        public readonly string $tipoAvaliacaoNotaId,
        public readonly ?string $justificativa,
        public readonly ?TipoAvaliacaoNota $nota = null,
    ) {}

    public static function fromArray(array $data, string $planoTrabalhoId, string $consolidacaoId, string $avaliadorId): self
    {
        return new self(
            planoTrabalhoId: $planoTrabalhoId,
            consolidacaoId: $consolidacaoId,
            avaliadorId: $avaliadorId,
            tipoAvaliacaoNotaId: $data['tipo_avaliacao_nota_id'],
            justificativa: $data['justificativa'] ?? null,
        );
    }

    public function withNota(TipoAvaliacaoNota $nota): self
    {
        return new self(
            planoTrabalhoId: $this->planoTrabalhoId,
            consolidacaoId: $this->consolidacaoId,
            avaliadorId: $this->avaliadorId,
            tipoAvaliacaoNotaId: $this->tipoAvaliacaoNotaId,
            justificativa: $this->justificativa,
            nota: $nota,
        );
    }

    public function toPersistArray(): array
    {
        return [
            'data_avaliacao' => now()->format('Y-m-d H:i:s'),
            'nota' => $this->nota->nota,
            'justificativa' => $this->justificativa,
            'justificativas' => [],
            'avaliador_id' => $this->avaliadorId,
            'plano_trabalho_consolidacao_id' => $this->consolidacaoId,
            'tipo_avaliacao_id' => $this->nota->tipo_avaliacao_id,
            'tipo_avaliacao_nota_id' => $this->tipoAvaliacaoNotaId,
        ];
    }
}
