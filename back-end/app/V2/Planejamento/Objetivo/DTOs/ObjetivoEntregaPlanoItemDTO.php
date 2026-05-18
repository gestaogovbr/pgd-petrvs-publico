<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

/**
 * Entrega do plano de entregas vinculada ao objetivo, com progresso no PE e esforço agregado
 * (somente planos de trabalho concluídos que usam essa entrega).
 */
final class ObjetivoEntregaPlanoItemDTO implements \JsonSerializable
{
    public function __construct(
        public readonly string $plano_entrega_entrega_id,
        public readonly string $entrega_titulo,
        public readonly ?string $entrega_catalogo_id,
        public readonly ?string $entrega_catalogo_nome,
        public readonly string $entrega_unidade_id,
        public readonly string $entrega_unidade_nome,
        public readonly string $entrega_unidade_sigla,
        public readonly float $progresso_esperado,
        public readonly float $progresso_realizado,
        public readonly bool $homologado,
        public readonly float $esforco_horas_total,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'plano_entrega_entrega_id' => $this->plano_entrega_entrega_id,
            'entrega_titulo' => $this->entrega_titulo,
            'entrega_catalogo_id' => $this->entrega_catalogo_id,
            'entrega_catalogo_nome' => $this->entrega_catalogo_nome,
            'entrega_unidade_id' => $this->entrega_unidade_id,
            'entrega_unidade_nome' => $this->entrega_unidade_nome,
            'entrega_unidade_sigla' => $this->entrega_unidade_sigla,
            'progresso_esperado' => $this->progresso_esperado,
            'progresso_realizado' => $this->progresso_realizado,
            'homologado' => $this->homologado,
            'esforco_horas_total' => $this->esforco_horas_total,
        ];
    }
}
