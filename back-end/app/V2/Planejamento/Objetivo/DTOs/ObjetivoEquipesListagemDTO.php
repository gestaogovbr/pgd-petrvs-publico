<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

/**
 * Unidades (equipes) com esforço total em planos de trabalho concluídos vinculados ao objetivo.
 *
 * @param  list<ObjetivoEsforcoPorUnidadeDTO>  $itens
 */
final class ObjetivoEquipesListagemDTO implements \JsonSerializable
{
    /**
     * @param  list<ObjetivoEsforcoPorUnidadeDTO>  $itens
     */
    public function __construct(
        public readonly string $objetivo_id,
        public readonly array $itens,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'objetivo_id' => $this->objetivo_id,
            'itens' => array_map(static fn (ObjetivoEsforcoPorUnidadeDTO $u) => $u->jsonSerialize(), $this->itens),
        ];
    }
}
