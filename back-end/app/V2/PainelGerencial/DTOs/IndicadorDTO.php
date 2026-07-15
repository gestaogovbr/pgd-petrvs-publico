<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\DTOs;

class IndicadorDTO
{
    /**
     * @param string $titulo
     * @param string $informacaoAdicional Texto explicativo do indicador
     * @param string $origemDados
     * @param array<string> $segmentos Nomes dos segmentos/dimensões do indicador
     * @param array<DistribuicaoUnidadeDTO> $distribuicoes Primeira = unidade selecionada, demais = subordinadas
     */
    public function __construct(
        public readonly string $titulo,
        public readonly string $informacaoAdicional,
        public readonly string $origemDados,
        public readonly array $segmentos,
        public array $distribuicoes,
    ) {}

    /**
     * Ordena as subordinadas (a partir da segunda) por total decrescente (RN23).
     * A primeira distribuição (unidade selecionada) permanece fixa (RN17).
     */
    public function ordenarSubordinadasPorTotal(): self
    {
        if (count($this->distribuicoes) <= 1) {
            return $this;
        }

        $primeira = $this->distribuicoes[0];
        $subordinadas = array_slice($this->distribuicoes, 1);

        usort($subordinadas, fn (DistribuicaoUnidadeDTO $a, DistribuicaoUnidadeDTO $b) => $b->total <=> $a->total);

        $this->distribuicoes = [$primeira, ...$subordinadas];

        return $this;
    }

    public function toArray(): array
    {
        return [
            'titulo' => $this->titulo,
            'informacao_adicional' => $this->informacaoAdicional,
            'origem_dados' => $this->origemDados,
            'segmentos' => $this->segmentos,
            'distribuicoes' => array_map(fn (DistribuicaoUnidadeDTO $d) => $d->toArray(), $this->distribuicoes),
        ];
    }
}
