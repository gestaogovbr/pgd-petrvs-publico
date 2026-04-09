<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs;

use App\Models\TipoAvaliacaoNota;

class AvaliacaoStoreDTO
{
    private ?TipoAvaliacaoNota $nota = null;

    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly string $consolidacaoId,
        public readonly string $avaliadorId,
        public readonly string $tipoAvaliacaoNotaId,
        public readonly ?string $justificativa,
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

    public function setNota(TipoAvaliacaoNota $nota): self
    {
        $this->nota = $nota;
        return $this;
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
