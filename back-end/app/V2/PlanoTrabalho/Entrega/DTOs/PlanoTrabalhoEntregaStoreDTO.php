<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\DTOs;

class PlanoTrabalhoEntregaStoreDTO
{
    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly string $origem,
        public readonly ?string $planoEntregaEntregaId,
        public readonly ?string $orgao,
        public readonly float $forcaTrabalho,
        public readonly float $esforcoExecutado,
        public readonly bool $informouEsforcoExecutado,
        public readonly string $descricao,
        public readonly ?string $entregaId = null,
        public readonly ?string $consolidacaoId = null,
    ) {}

    public static function fromArray(array $data, string $planoTrabalhoId, ?string $entregaId = null): self
    {
        $origem = $data['origem'];
        $forcaTrabalho = (float) ($data['forca_trabalho'] ?? 0);
        $informouEsforcoExecutado = array_key_exists('esforco_executado', $data);
        $esforcoExecutado = $informouEsforcoExecutado
            ? (float) $data['esforco_executado']
            : $forcaTrabalho;

        return new self(
            planoTrabalhoId: $planoTrabalhoId,
            origem: $origem,
            planoEntregaEntregaId: in_array($origem, ['PROPRIA_UNIDADE', 'OUTRA_UNIDADE']) ? $data['plano_entrega_entrega_id'] : null,
            orgao: $origem === 'OUTRO_ORGAO' ? $data['orgao'] : null,
            forcaTrabalho: $forcaTrabalho,
            esforcoExecutado: $esforcoExecutado,
            informouEsforcoExecutado: $informouEsforcoExecutado,
            descricao: $data['descricao'] ?? '',
            entregaId: $entregaId,
            consolidacaoId: $data['consolidacao_id'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'plano_trabalho_id' => $this->planoTrabalhoId,
            'plano_entrega_entrega_id' => $this->planoEntregaEntregaId,
            'orgao' => $this->orgao,
            'forca_trabalho' => $this->forcaTrabalho,
            'esforco_executado' => $this->esforcoExecutado,
            'descricao' => $this->descricao,
        ];
    }
}
