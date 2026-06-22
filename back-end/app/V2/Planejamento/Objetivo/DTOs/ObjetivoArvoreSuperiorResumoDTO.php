<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

/**
 * Resumo não expansível de um objetivo de planejamento superior,
 * com a hierarquia interna (objetivo_pai) agrupada em linhas de texto.
 */
class ObjetivoArvoreSuperiorResumoDTO implements \JsonSerializable
{
    /**
     * @param  list<string>  $hierarquia_linhas  Do ancestral raiz ao objetivo (inclusive), por planejamento
     */
    public function __construct(
        public readonly string $objetivo_id,
        public readonly string $objetivo_nome,
        public readonly string $planejamento_nome,
        public readonly array $hierarquia_linhas,
        public readonly int $nivel_superior,
        public readonly ?string $objetivo_superior_id,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'objetivo_id' => $this->objetivo_id,
            'objetivo_nome' => $this->objetivo_nome,
            'planejamento_nome' => $this->planejamento_nome,
            'hierarquia_linhas' => $this->hierarquia_linhas,
            'nivel_superior' => $this->nivel_superior,
            'objetivo_superior_id' => $this->objetivo_superior_id,
        ];
    }
}
