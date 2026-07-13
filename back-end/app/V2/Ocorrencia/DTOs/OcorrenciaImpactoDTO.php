<?php

declare(strict_types=1);

namespace App\V2\Ocorrencia\DTOs;

class OcorrenciaImpactoDTO
{
    public function __construct(
        public readonly bool $operacaoBloqueada = false,
        public readonly bool $geraDispensa = false,
        public readonly bool $removeDispensa = false,
    ) {}

    public static function semImpacto(): self
    {
        return new self();
    }

    public static function bloqueada(): self
    {
        return new self(operacaoBloqueada: true);
    }

    public static function fromFlags(bool $geraDispensa, bool $removeDispensa): self
    {
        return new self(
            geraDispensa: $geraDispensa,
            removeDispensa: $removeDispensa,
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
        ];
    }
}
