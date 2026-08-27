<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor\DTOs;

/**
 * Representa um nó (processo) na árvore da cadeia de valor.
 */
class CadeiaValorProcessoNodeDTO implements \JsonSerializable
{
    /**
     * @param list<string> $filhos_ids IDs dos processos filhos diretos
     * @param list<CadeiaValorVinculoCrossCadeiaDTO> $vinculos_cross_cadeia Vínculos com processos de outras cadeias
     */
    public function __construct(
        public readonly string $processo_id,
        public readonly string $nome,
        public readonly int $sequencia,
        public readonly ?string $processo_pai_id,
        public readonly string $cadeia_valor_id,
        public readonly string $cadeia_valor_nome,
        public readonly int $nivel,
        public readonly int $total_vinculos,
        public readonly ?array $etiquetas,
        public readonly array $filhos_ids = [],
        public readonly array $vinculos_cross_cadeia = [],
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            processo_id: (string) $data['processo_id'],
            nome: (string) $data['nome'],
            sequencia: (int) $data['sequencia'],
            processo_pai_id: isset($data['processo_pai_id']) ? (string) $data['processo_pai_id'] : null,
            cadeia_valor_id: (string) $data['cadeia_valor_id'],
            cadeia_valor_nome: (string) $data['cadeia_valor_nome'],
            nivel: (int) $data['nivel'],
            total_vinculos: (int) ($data['total_vinculos'] ?? 0),
            etiquetas: $data['etiquetas'] ?? null,
            filhos_ids: $data['filhos_ids'] ?? [],
            vinculos_cross_cadeia: $data['vinculos_cross_cadeia'] ?? [],
        );
    }

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'processo_id' => $this->processo_id,
            'nome' => $this->nome,
            'sequencia' => $this->sequencia,
            'processo_pai_id' => $this->processo_pai_id,
            'cadeia_valor_id' => $this->cadeia_valor_id,
            'cadeia_valor_nome' => $this->cadeia_valor_nome,
            'nivel' => $this->nivel,
            'total_vinculos' => $this->total_vinculos,
            'etiquetas' => $this->etiquetas,
            'filhos_ids' => $this->filhos_ids,
            'vinculos_cross_cadeia' => $this->vinculos_cross_cadeia,
        ];
    }
}
