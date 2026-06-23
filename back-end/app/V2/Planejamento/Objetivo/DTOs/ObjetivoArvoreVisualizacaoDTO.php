<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

/**
 * Payload para visualização em árvore (filhos expansíveis; superiores em resumo textual).
 */
class ObjetivoArvoreVisualizacaoDTO implements \JsonSerializable
{
    /**
     * @param  array<string, EsforcoNodeDTO>  $nos
     * @param  list<ObjetivoArvoreSuperiorResumoDTO>  $cadeia_superior
     */
    public function __construct(
        public readonly string $objetivo_raiz_id,
        public readonly array $nos,
        public readonly array $cadeia_superior,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'objetivo_raiz_id' => $this->objetivo_raiz_id,
            'nos' => $this->nos,
            'cadeia_superior' => $this->cadeia_superior,
        ];
    }
}
