<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

/**
 * Agrupamentos (Esforço / Pessoas / Entregas) de uma seção do painel lateral
 * ("Item selecionado" ou "Consolidado").
 */
final class ObjetivoPainelSecaoResumoDTO implements \JsonSerializable
{
    public function __construct(
        public readonly ObjetivoPainelEsforcoResumoDTO $esforco,
        public readonly ObjetivoPainelPessoasResumoDTO $pessoas,
        public readonly ObjetivoPainelEntregasResumoDTO $entregas,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'esforco' => $this->esforco,
            'pessoas' => $this->pessoas,
            'entregas' => $this->entregas,
        ];
    }
}
