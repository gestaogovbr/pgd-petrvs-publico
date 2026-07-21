<?php

declare(strict_types=1);

namespace App\V2\Ocorrencia\DTOs;

class OcorrenciaOperacaoDTO
{
    public function __construct(
        public readonly string $usuarioId,
        public readonly string $dataInicio,
        public readonly string $dataFim,
        public readonly ?string $ocorrenciaId,
        public readonly string $operacao,
        public readonly ?string $tipoMotivoAfastamentoId = null,
    ) {}

    public function isExclusao(): bool
    {
        return $this->operacao === 'excluir';
    }

    public static function fromArray(array $data): self
    {
        return new self(
            usuarioId: $data['usuario_id'],
            dataInicio: $data['data_inicio'],
            dataFim: $data['data_fim'],
            ocorrenciaId: $data['ocorrencia_id'] ?? null,
            operacao: $data['operacao'],
            tipoMotivoAfastamentoId: $data['tipo_motivo_afastamento_id'] ?? null,
        );
    }
}
