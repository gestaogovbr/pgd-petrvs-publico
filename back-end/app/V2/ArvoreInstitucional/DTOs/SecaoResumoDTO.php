<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional\DTOs;

/**
 * Agrupamentos (Esforço / Pessoas / Entregas) de uma seção do painel lateral
 * ("Item selecionado" ou "Consolidado").
 */
final class SecaoResumoDTO implements \JsonSerializable
{
    public function __construct(
        public readonly EsforcoResumoDTO $esforco,
        public readonly PessoasResumoDTO $pessoas,
        public readonly EntregasResumoDTO $entregas,
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
