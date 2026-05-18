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
    ) {}

    public static function fromArray(array $data, string $planoTrabalhoId, string $ocorrenciaId): self
    {
        return new self(
            planoTrabalhoId: $planoTrabalhoId,
            ocorrenciaId: $ocorrenciaId,
            observacoes: $data['observacoes'] ?? null,
            tipoMotivoAfastamentoId: $data['tipo_motivo_afastamento_id'] ?? null,
            horas: isset($data['horas']) ? (int) $data['horas'] : null,
        );
    }

    public function toPersistArray(): array
    {
        return array_filter([
            'observacoes' => $this->observacoes,
            'tipo_motivo_afastamento_id' => $this->tipoMotivoAfastamentoId,
            'horas' => $this->horas,
        ], fn ($v) => $v !== null);
    }
}
