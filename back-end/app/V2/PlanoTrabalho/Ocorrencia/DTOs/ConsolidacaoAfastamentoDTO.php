<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Ocorrencia\DTOs;

use App\Models\Afastamento;
use App\Models\PlanoTrabalhoConsolidacao;

class ConsolidacaoAfastamentoDTO
{
    public function __construct(
        public readonly string $consolidacaoId,
        public readonly string $afastamentoId,
        public readonly array $snapshot,
    ) {}

    public static function fromModels(PlanoTrabalhoConsolidacao $consolidacao, Afastamento $afastamento): self
    {
        return new self(
            consolidacaoId: $consolidacao->id,
            afastamentoId: $afastamento->id,
            snapshot: $afastamento->toArray(),
        );
    }

    /** @return array<string, mixed> */
    public function toPersistArray(): array
    {
        return [
            'plano_trabalho_consolidacao_id' => $this->consolidacaoId,
            'afastamento_id' => $this->afastamentoId,
            'snapshot' => json_encode($this->snapshot),
            'data_conclusao' => now(),
        ];
    }
}
