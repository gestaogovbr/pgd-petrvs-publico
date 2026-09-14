<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional\DTOs;

/**
 * Entregas vinculadas a um nó da árvore (com progresso) + esforço agregado por unidade (PT concluído).
 */
final class EntregasListagemDTO implements \JsonSerializable
{
    /**
     * @param list<EntregaPlanoItemDTO> $itens
     * @param list<EsforcoPorUnidadeDTO> $esforco_por_unidade
     */
    public function __construct(
        public readonly string $node_id,
        public readonly int $total_entregas,
        public readonly array $itens,
        public readonly array $esforco_por_unidade,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'node_id' => $this->node_id,
            'total_entregas' => $this->total_entregas,
            'itens' => array_map(static fn (EntregaPlanoItemDTO $i) => $i->jsonSerialize(), $this->itens),
            'esforco_por_unidade' => array_map(static fn (EsforcoPorUnidadeDTO $u) => $u->jsonSerialize(), $this->esforco_por_unidade),
        ];
    }
}
