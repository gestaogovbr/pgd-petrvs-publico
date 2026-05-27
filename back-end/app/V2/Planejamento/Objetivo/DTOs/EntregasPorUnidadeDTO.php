<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo\DTOs;

use App\Models\PlanoEntregaEntrega;
use Illuminate\Support\Collection;

class EntregasPorUnidadeDTO implements \JsonSerializable
{
    public function __construct(
        public readonly string $unidade_id,
        public readonly string $unidade_nome,
        public readonly string $unidade_sigla,
        public readonly array $entregas,
    ) {}

    /** @param Collection<int, PlanoEntregaEntrega> $entregas */
    public static function fromEntregas(Collection $entregas): self
    {
        $unidade = $entregas->first()->unidade;

        return new self(
            unidade_id: $unidade->id,
            unidade_nome: $unidade->nome,
            unidade_sigla: $unidade->sigla,
            entregas: $entregas->map(fn(PlanoEntregaEntrega $e) => [
                'id' => $e->id,
                'descricao_entrega' => $e->descricao_entrega,
                'data_inicio' => $e->data_inicio,
                'data_fim' => $e->data_fim,
                'progresso_esperado' => $e->progresso_esperado,
                'progresso_realizado' => $e->progresso_realizado,
                'homologado' => (bool) $e->homologado,
            ])->values()->all(),
        );
    }

    public function jsonSerialize(): array
    {
        return [
            'unidade_id' => $this->unidade_id,
            'unidade_nome' => $this->unidade_nome,
            'unidade_sigla' => $this->unidade_sigla,
            'entregas' => $this->entregas,
        ];
    }
}
