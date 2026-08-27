<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor\DTOs;

use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelEntregasResumoDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelEsforcoResumoDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelPessoasResumoDTO;

final class CadeiaValorPainelResumoDTO implements \JsonSerializable
{
    /**
     * @param list<array{id: string, label: string}> $filtro_unidades
     */
    public function __construct(
        public readonly string $processo_id,
        public readonly string $processo_nome,
        public readonly int $nivel,
        public readonly ObjetivoPainelEsforcoResumoDTO $esforco,
        public readonly ObjetivoPainelPessoasResumoDTO $pessoas,
        public readonly ObjetivoPainelEntregasResumoDTO $entregas,
        public readonly array $filtro_unidades = [],
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'processo_id' => $this->processo_id,
            'processo_nome' => $this->processo_nome,
            'nivel' => $this->nivel,
            'esforco' => $this->esforco,
            'pessoas' => $this->pessoas,
            'entregas' => $this->entregas,
            'filtro_unidades' => $this->filtro_unidades,
        ];
    }
}
