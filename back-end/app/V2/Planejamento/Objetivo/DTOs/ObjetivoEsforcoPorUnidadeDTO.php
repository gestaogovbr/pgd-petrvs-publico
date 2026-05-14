<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

/** Somatório de esforço (horas) por unidade do plano de trabalho (apenas PT concluído). */
final class ObjetivoEsforcoPorUnidadeDTO implements \JsonSerializable
{
    public function __construct(
        public readonly string $unidade_id,
        public readonly string $unidade_nome,
        public readonly string $unidade_sigla,
        public readonly float $esforco_horas_total,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'unidade_id' => $this->unidade_id,
            'unidade_nome' => $this->unidade_nome,
            'unidade_sigla' => $this->unidade_sigla,
            'esforco_horas_total' => $this->esforco_horas_total,
        ];
    }
}
