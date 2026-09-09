<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\DTOs;

class FiltrosPainelDTO
{
    public function __construct(
        public readonly string $tipoConsulta,
        public readonly string $unidadeId,
        public readonly ?string $dataInicio,
        public readonly ?string $dataFim,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            tipoConsulta: $data['tipo_consulta'],
            unidadeId: $data['unidade_id'],
            dataInicio: $data['data_inicio'] ?? null,
            dataFim: $data['data_fim'] ?? null,
        );
    }

    public function isSituacaoAtual(): bool
    {
        return $this->tipoConsulta === 'situacao_atual';
    }

    public function isHistorico(): bool
    {
        return $this->tipoConsulta === 'historico';
    }
}
