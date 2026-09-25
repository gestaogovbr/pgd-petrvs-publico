<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\DTOs;

final class SomatoriosEsforcoDTO
{
    public const CARGA_HORARIA_COMPLETA = 100.0;

    private const TOLERANCIA = 0.01;

    public function __construct(
        public readonly float $somatorioPlanejado,
        public readonly float $somatorioExecutado,
    ) {}

    public function planejadoIgualExecutado(): bool
    {
        return abs($this->somatorioPlanejado - $this->somatorioExecutado) < self::TOLERANCIA;
    }

    public function exigeJustificativaCargaHoraria(): bool
    {
        return abs($this->somatorioPlanejado - self::CARGA_HORARIA_COMPLETA) >= self::TOLERANCIA
            || abs($this->somatorioExecutado - self::CARGA_HORARIA_COMPLETA) >= self::TOLERANCIA;
    }
}
