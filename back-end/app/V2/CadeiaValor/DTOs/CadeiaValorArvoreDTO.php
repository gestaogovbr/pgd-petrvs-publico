<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor\DTOs;

/**
 * Payload de resposta do endpoint de árvore da cadeia de valor.
 * Contém um mapa de nós e metadados de navegação.
 */
class CadeiaValorArvoreDTO implements \JsonSerializable
{
    /**
     * @param array<string, CadeiaValorProcessoNodeDTO> $nos Mapa id → nó
     * @param list<string> $ancestrais_ids IDs dos ancestrais do nó consultado (do mais próximo ao mais distante)
     * @param list<string> $raiz_ids IDs dos nós raiz visíveis na árvore
     */
    public function __construct(
        public readonly string $processo_focal_id,
        public readonly string $cadeia_valor_id,
        public readonly string $cadeia_valor_nome,
        public readonly array $nos,
        public readonly array $ancestrais_ids,
        public readonly array $raiz_ids,
        public readonly int $nivel_maximo,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'processo_focal_id' => $this->processo_focal_id,
            'cadeia_valor_id' => $this->cadeia_valor_id,
            'cadeia_valor_nome' => $this->cadeia_valor_nome,
            'nos' => $this->nos,
            'ancestrais_ids' => $this->ancestrais_ids,
            'raiz_ids' => $this->raiz_ids,
            'nivel_maximo' => $this->nivel_maximo,
        ];
    }
}
