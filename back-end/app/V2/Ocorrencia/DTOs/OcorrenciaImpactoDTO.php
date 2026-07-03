<?php

declare(strict_types=1);

namespace App\V2\Ocorrencia\DTOs;

class OcorrenciaImpactoDTO
{
    public function __construct(
        public readonly bool $operacaoBloqueada,
        public readonly bool $geraDispensa = false,
        public readonly bool $removeDispensa = false,
        public readonly bool $ptConcluido = false,
    ) {}

    public static function semImpacto(): self
    {
        return new self(operacaoBloqueada: false);
    }

    public static function fromFlags(bool $geraDispensa, bool $removeDispensa, bool $bloqueada, bool $ptConcluido): self
    {
        return new self(
            operacaoBloqueada: $bloqueada,
            geraDispensa: $geraDispensa,
            removeDispensa: $removeDispensa,
            ptConcluido: $ptConcluido,
        );
    }

    public function temImpacto(): bool
    {
        return $this->geraDispensa || $this->removeDispensa;
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'operacao_bloqueada' => $this->operacaoBloqueada,
            'gera_dispensa' => $this->geraDispensa,
            'remove_dispensa' => $this->removeDispensa,
            'pt_concluido' => $this->ptConcluido,
        ];
    }
}
