<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Ocorrencia\DTOs;

class OcorrenciaImpactoDTO
{
    public function __construct(
        public readonly bool $temImpacto,
        public readonly bool $operacaoBloqueada,
    ) {}

    public static function semImpacto(): self
    {
        return new self(temImpacto: false, operacaoBloqueada: false);
    }

    public static function comImpacto(): self
    {
        return new self(temImpacto: true, operacaoBloqueada: false);
    }

    public static function bloqueada(): self
    {
        return new self(temImpacto: true, operacaoBloqueada: true);
    }

    /** @return array<string, bool> */
    public function toArray(): array
    {
        return [
            'tem_impacto' => $this->temImpacto,
            'operacao_bloqueada' => $this->operacaoBloqueada,
        ];
    }
}
