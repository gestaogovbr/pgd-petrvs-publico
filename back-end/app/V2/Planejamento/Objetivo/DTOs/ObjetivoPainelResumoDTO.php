<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

final class ObjetivoPainelResumoDTO implements \JsonSerializable
{
    public function __construct(
        public readonly string $objetivo_id,
        public readonly string $nome,
        public readonly string $planejamento_nome,
        public readonly string $tipo_objetivo_nome,
        public readonly string $eixo_tematico_nome,
        public readonly ObjetivoPainelEsforcoResumoDTO $esforco,
        public readonly ObjetivoPainelPessoasResumoDTO $pessoas,
        public readonly ObjetivoPainelEntregasResumoDTO $entregas,
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
            'esforco' => $this->esforco,
            'pessoas' => $this->pessoas,
            'entregas' => $this->entregas,
        ];
    }
}
