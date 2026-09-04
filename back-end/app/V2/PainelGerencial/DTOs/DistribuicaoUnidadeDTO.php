<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\DTOs;

class DistribuicaoUnidadeDTO
{
    /**
     * @param string $unidadeId
     * @param string $unidadeSigla
     * @param array<int> $valores Valores absolutos por segmento (na ordem dos segmentos do IndicadorDTO)
     * @param int $total Somatório absoluto
     */
    public function __construct(
        public readonly string $unidadeId,
        public readonly string $unidadeSigla,
        public readonly array $valores,
        public readonly int $total,
    ) {}

    public function toArray(): array
    {
        return [
            'unidade_id' => $this->unidadeId,
            'unidade_sigla' => $this->unidadeSigla,
            'valores' => $this->valores,
            'total' => $this->total,
        ];
    }
}
