<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Contribuicao\DTOs;

class ContribuicaoExecucaoStoreDTO
{
    private const ORIGENS_VINCULADAS = ['PROPRIA_UNIDADE', 'OUTRA_UNIDADE'];

    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly string $consolidacaoId,
        public readonly string $origem,
        public readonly ?string $planoEntregaEntregaId,
        public readonly ?string $orgao,
        public readonly string $descricao,
        public readonly float $esforcoExecutado,
        public readonly ?string $contribuicaoId = null,
    ) {}

    /**
     * @param array<string, mixed> $data
     */
    public static function fromArray(
        array $data,
        string $planoTrabalhoId,
        string $consolidacaoId,
        ?string $contribuicaoId = null,
    ): self {
        $origem = (string) $data['origem'];

        return new self(
            planoTrabalhoId: $planoTrabalhoId,
            consolidacaoId: $consolidacaoId,
            origem: $origem,
            planoEntregaEntregaId: in_array($origem, self::ORIGENS_VINCULADAS, true) ? ($data['plano_entrega_entrega_id'] ?? null) : null,
            orgao: $origem === 'OUTRO_ORGAO' ? ($data['orgao'] ?? null) : null,
            descricao: (string) ($data['descricao'] ?? ''),
            esforcoExecutado: (float) ($data['esforco_executado'] ?? 0),
            contribuicaoId: $contribuicaoId,
        );
    }

    public function isVinculadaAEntrega(): bool
    {
        return in_array($this->origem, self::ORIGENS_VINCULADAS, true);
    }

    /**
     * @return array<string, mixed>
     */
    public function toPersistArray(): array
    {
        return [
            'plano_trabalho_consolidacao_id' => $this->consolidacaoId,
            'plano_entrega_entrega_id' => $this->planoEntregaEntregaId,
            'orgao' => $this->orgao,
            'descricao' => $this->descricao,
            'esforco_executado' => $this->esforcoExecutado,
        ];
    }
}
