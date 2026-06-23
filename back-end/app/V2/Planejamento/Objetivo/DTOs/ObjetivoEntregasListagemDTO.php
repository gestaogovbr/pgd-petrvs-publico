<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

/**
 * Entregas do plano de entregas vinculadas ao objetivo (com progresso) + esforço agregado por unidade (PT concluído).
 *
 * @param  list<ObjetivoEntregaPlanoItemDTO>  $itens
 * @param  list<ObjetivoEsforcoPorUnidadeDTO>  $esforco_por_unidade
 */
final class ObjetivoEntregasListagemDTO implements \JsonSerializable
{
    /**
     * @param  list<ObjetivoEntregaPlanoItemDTO>  $itens
     * @param  list<ObjetivoEsforcoPorUnidadeDTO>  $esforco_por_unidade
     */
    public function __construct(
        public readonly string $objetivo_id,
        public readonly int $total_entregas,
        public readonly array $itens,
        public readonly array $esforco_por_unidade,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'objetivo_id' => $this->objetivo_id,
            'total_entregas' => $this->total_entregas,
            'itens' => array_map(static fn (ObjetivoEntregaPlanoItemDTO $i) => $i->jsonSerialize(), $this->itens),
            'esforco_por_unidade' => array_map(static fn (ObjetivoEsforcoPorUnidadeDTO $u) => $u->jsonSerialize(), $this->esforco_por_unidade),
        ];
    }
}
