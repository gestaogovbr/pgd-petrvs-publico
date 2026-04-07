<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs;

class AvaliacaoStoreDTO
{
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
}
