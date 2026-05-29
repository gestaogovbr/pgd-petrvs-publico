<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Ocorrencia\DTOs;

class OcorrenciaUpdateDTO
{
    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly string $ocorrenciaId,
        public readonly ?string $observacoes,
        public readonly ?string $tipoMotivoAfastamentoId,
        public readonly ?int $horas,
        public readonly ?string $dataInicio,
        public readonly ?string $dataFim
    ) {}

    public static function fromArray(array $data, string $planoTrabalhoId, string $ocorrenciaId): self
    {
        return new self(
            planoTrabalhoId: $planoTrabalhoId,
            ocorrenciaId: $ocorrenciaId,
            observacoes: $data['observacoes'] ?? null,
            tipoMotivoAfastamentoId: $data['tipo_motivo_afastamento_id'] ?? null,
            horas: isset($data['horas']) ? (int) $data['horas'] : null,
            dataInicio: $data['data_inicio'] ?? null,
            dataFim: $data['data_fim'] ?? null
        );
    }

    public function toPersistArray(): array
    {
        return array_filter([
            'observacoes' => $this->observacoes,
            'tipo_motivo_afastamento_id' => $this->tipoMotivoAfastamentoId,
            'horas' => $this->horas,
            'data_inicio' => $this->dataInicio,
            'data_fim' => $this->dataFim
        ], fn ($v) => $v !== null);
    }
}
