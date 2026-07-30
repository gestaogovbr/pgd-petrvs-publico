<?php

declare(strict_types=1);

namespace App\V2\Indicadores\DTOs;

class IndicadoresHorasFilterDTO
{
    public function __construct(
        public readonly string $unidadeId,
        public readonly bool $incluirSubordinadas,
        public readonly ?string $dataInicial,
        public readonly ?string $dataFinal,
        public readonly bool $somenteVigentes,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            unidadeId: $data['unidade_id'],
            incluirSubordinadas: (bool) ($data['incluir_subordinadas'] ?? false),
            dataInicial: $data['data_inicial'] ?? null,
            dataFinal: $data['data_final'] ?? null,
            somenteVigentes: (bool) ($data['somente_vigentes'] ?? false),
        );
    }
}
