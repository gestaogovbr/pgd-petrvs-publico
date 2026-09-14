<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional\DTOs;

/**
 * Unidades (equipes) com esforço total em planos de trabalho concluídos vinculados a um nó.
 */
final class EquipesListagemDTO implements \JsonSerializable
{
    /**
     * @param list<EsforcoPorUnidadeDTO> $itens
     */
    public function __construct(
        public readonly string $node_id,
        public readonly array $itens,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'node_id' => $this->node_id,
            'itens' => array_map(static fn (EsforcoPorUnidadeDTO $u) => $u->jsonSerialize(), $this->itens),
        ];
    }
}
