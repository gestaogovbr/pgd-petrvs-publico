<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor\DTOs;

use App\V2\ArvoreInstitucional\DTOs\SecaoResumoDTO;

final class CadeiaValorPainelResumoDTO implements \JsonSerializable
{
    /**
     * @param list<array{id: string, label: string}> $filtro_unidades
     */
    public function __construct(
        public readonly string $processo_id,
        public readonly string $processo_nome,
        public readonly string $tipo_elemento_nome,
        public readonly int $nivel,
        public readonly SecaoResumoDTO $item,
        public readonly SecaoResumoDTO $consolidado,
        public readonly array $filtro_unidades = [],
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'processo_id' => $this->processo_id,
            'processo_nome' => $this->processo_nome,
            'tipo_elemento_nome' => $this->tipo_elemento_nome,
            'nivel' => $this->nivel,
            'item' => $this->item,
            'consolidado' => $this->consolidado,
            'filtro_unidades' => $this->filtro_unidades,
        ];
    }
}
