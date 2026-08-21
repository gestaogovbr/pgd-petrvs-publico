<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

use App\V2\ArvoreInstitucional\DTOs\EntregaDetalheLinhaDTO;

/**
 * @param  list<EntregaDetalheLinhaDTO>  $itens
 * @param  list<array{id: string, label: string}>  $filtro_entregas
 * @param  list<array{id: string, label: string}>  $filtro_unidades
 */
final class ObjetivoPainelEntregasDetalhamentoDTO implements \JsonSerializable
{
    /**
     * @param  list<EntregaDetalheLinhaDTO>  $itens
     * @param  list<array{id: string, label: string}>  $filtro_entregas
     * @param  list<array{id: string, label: string}>  $filtro_unidades
     */
    public function __construct(
        public readonly string $objetivo_id,
        public readonly array $itens,
        public readonly array $filtro_entregas,
        public readonly array $filtro_unidades,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'objetivo_id' => $this->objetivo_id,
            'itens' => $this->itens,
            'filtro_entregas' => $this->filtro_entregas,
            'filtro_unidades' => $this->filtro_unidades,
        ];
    }
}
