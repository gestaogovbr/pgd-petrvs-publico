<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional\DTOs;

/**
 * Resposta genérica do endpoint de árvore institucional.
 * Contrato unificado entre Cadeia de Valor e Planejamento Institucional.
 */
final class ArvoreResponseDTO implements \JsonSerializable
{
    /**
     * @param array<string, ArvoreNodeResponseDTO> $nos Mapa id → nó
     * @param array<string, mixed> $metadata Dados específicos do domínio (ex: cadeia_superior, cadeia_valor_nome)
     */
    public function __construct(
        public readonly string $focal_id,
        public readonly array $nos,
        public readonly array $metadata = [],
    ) {}

    /**
     * Constrói a partir do mapa genérico do carregarEsforcoAcumulado.
     *
     * @param array<string, array<string, mixed>> $mapaEsforco
     * @param array<string, mixed> $metadata
     */
    public static function fromMapa(string $focalId, array $mapaEsforco, array $metadata = []): self
    {
        $nos = [];
        foreach ($mapaEsforco as $id => $node) {
            $nos[$id] = ArvoreNodeResponseDTO::fromMapaNode($id, $node);
        }

        return new self(
            focal_id: $focalId,
            nos: $nos,
            metadata: $metadata,
        );
    }

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'focal_id' => $this->focal_id,
            'nos' => $this->nos,
            'metadata' => $this->metadata,
        ];
    }
}
