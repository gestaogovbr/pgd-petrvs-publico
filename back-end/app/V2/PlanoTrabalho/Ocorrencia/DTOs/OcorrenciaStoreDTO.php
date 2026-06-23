<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Ocorrencia\DTOs;

class OcorrenciaStoreDTO
{
    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly string $observacoes,
        public readonly string $dataInicio,
        public readonly string $dataFim,
        public readonly string $tipoMotivoAfastamentoId,
        public readonly ?int $horas,
    ) {}

    public static function fromArray(array $data, string $planoTrabalhoId): self
    {
        return new self(
            planoTrabalhoId: $planoTrabalhoId,
            observacoes: $data['observacoes'],
            dataInicio: $data['data_inicio'],
            dataFim: $data['data_fim'],
            tipoMotivoAfastamentoId: $data['tipo_motivo_afastamento_id'],
            horas: isset($data['horas']) ? (int) $data['horas'] : null,
        );
    }

    public function toPersistArray(string $usuarioId): array
    {
        return [
            'observacoes' => $this->observacoes,
            'data_inicio' => $this->dataInicio,
            'data_fim' => $this->dataFim,
            'tipo_motivo_afastamento_id' => $this->tipoMotivoAfastamentoId,
            'horas' => $this->horas,
            'usuario_id' => $usuarioId,
        ];
    }
}
