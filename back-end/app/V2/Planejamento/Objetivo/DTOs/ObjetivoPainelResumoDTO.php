<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

use App\V2\ArvoreInstitucional\DTOs\SecaoResumoDTO;

final class ObjetivoPainelResumoDTO implements \JsonSerializable
{
    public function __construct(
        public readonly string $objetivo_id,
        public readonly string $nome,
        public readonly string $planejamento_nome,
        public readonly string $tipo_objetivo_nome,
        public readonly string $eixo_tematico_nome,
        /** Seção "Item selecionado": somente o objetivo selecionado (RN02). */
        public readonly SecaoResumoDTO $item,
        /** Seção "Consolidado": objetivo selecionado + itens hierarquicamente subordinados (RN15). */
        public readonly SecaoResumoDTO $consolidado,
        /** @var list<array{id: string, label: string}> */
        public readonly array $filtro_unidades = [],
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'objetivo_id' => $this->objetivo_id,
            'nome' => $this->nome,
            'planejamento_nome' => $this->planejamento_nome,
            'tipo_objetivo_nome' => $this->tipo_objetivo_nome,
            'eixo_tematico_nome' => $this->eixo_tematico_nome,
            'item' => $this->item,
            'consolidado' => $this->consolidado,
            'filtro_unidades' => $this->filtro_unidades,
        ];
    }
}
