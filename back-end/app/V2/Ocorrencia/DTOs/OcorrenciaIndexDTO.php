<?php

declare(strict_types=1);

namespace App\V2\Ocorrencia\DTOs;

class OcorrenciaIndexDTO
{
    public function __construct(
        public readonly string $usuarioLogadoId,
        public readonly array $unidadeIds,
        public readonly int $page,
        public readonly int $perPage,
        public readonly ?string $usuarioId = null,
        public readonly ?string $tipoMotivoAfastamentoId = null,
        public readonly ?string $dataInicio = null,
        public readonly ?string $dataFim = null,
    ) {}

    public static function fromRequest(array $data, string $usuarioLogadoId, array $unidadeIds): self
    {
        return new self(
            usuarioLogadoId: $usuarioLogadoId,
            unidadeIds: $unidadeIds,
            page: (int) ($data['page'] ?? 1),
            perPage: (int) ($data['size'] ?? 15),
            usuarioId: $data['usuario_id'] ?? null,
            tipoMotivoAfastamentoId: $data['tipo_motivo_afastamento_id'] ?? null,
            dataInicio: $data['data_inicio'] ?? null,
            dataFim: $data['data_fim'] ?? null,
        );
    }
}
