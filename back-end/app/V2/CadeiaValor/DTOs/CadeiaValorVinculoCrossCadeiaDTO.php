<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor\DTOs;

/**
 * Representa um vínculo de um processo com outra cadeia de valor (via entregas compartilhadas).
 */
class CadeiaValorVinculoCrossCadeiaDTO implements \JsonSerializable
{
    public function __construct(
        public readonly string $processo_id,
        public readonly string $processo_nome,
        public readonly string $cadeia_valor_id,
        public readonly string $cadeia_valor_nome,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            processo_id: (string) $data['processo_id'],
            processo_nome: (string) $data['processo_nome'],
            cadeia_valor_id: (string) $data['cadeia_valor_id'],
            cadeia_valor_nome: (string) $data['cadeia_valor_nome'],
        );
    }

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'processo_id' => $this->processo_id,
            'processo_nome' => $this->processo_nome,
            'cadeia_valor_id' => $this->cadeia_valor_id,
            'cadeia_valor_nome' => $this->cadeia_valor_nome,
        ];
    }
}
