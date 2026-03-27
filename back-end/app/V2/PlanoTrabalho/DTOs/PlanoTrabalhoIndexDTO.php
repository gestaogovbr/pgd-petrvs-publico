<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DTOs;

use App\Exceptions\ServerException;

class PlanoTrabalhoIndexDTO
{
    public function __construct(
        public readonly ?string $dataInicio,
        public readonly ?string $dataFim,
        public readonly bool $vigentes,
        public readonly bool $arquivados,
        public readonly ?string $usuarioId,
        public readonly ?array $unidadesId,
        public readonly bool $subordinadas,
        public readonly ?bool $hierarquia,
        public readonly ?int $numero,
        public readonly ?string $tipoModalidadeId,
        public readonly ?string $status,
        public readonly int $page,
        public readonly int $perPage,
        public readonly ?string $usuarioLogadoId = null,
    ) {}

    public function withUnidadesId(array $unidadesId): self
    {
        return new self(
            dataInicio: $this->dataInicio,
            dataFim: $this->dataFim,
            vigentes: $this->vigentes,
            arquivados: $this->arquivados,
            usuarioId: $this->usuarioId,
            unidadesId: $unidadesId,
            subordinadas: $this->subordinadas,
            hierarquia: $this->hierarquia,
            numero: $this->numero,
            tipoModalidadeId: $this->tipoModalidadeId,
            status: $this->status,
            page: $this->page,
            perPage: $this->perPage,
            usuarioLogadoId: $this->usuarioLogadoId,
        );
    }

    public static function fromRequest(array $data, ?string $usuarioLogadoId = null): self
    {
        $filters = $data['filters'] ?? [];
        $filters['page'] = $data['page'] ?? 1;
        $filters['size'] = $data['size'] ?? 15;
        $filters['usuarioLogadoId'] = $usuarioLogadoId;
        $filters['hierarquia'] = $data['hierarquia'] ?? true;

        return self::fromArray($filters);
    }

    public static function fromArray(array $filters): self
    {
        $dataInicio = $filters['data_inicio'] ?? null;
        $dataFim = $filters['data_fim'] ?? null;
        $vigentes = (bool) ($filters['vigentes'] ?? false);
        $arquivados = (bool) ($filters['arquivados'] ?? false);
        $unidadesId = $filters['unidade_id'] ?? null;
        $hierarquia = $filters['hierarquia'] ?? null;
        $numero = isset($filters['numero']) ? (int) $filters['numero'] : null;
        $tipoModalidadeId = $filters['tipo_modalidade_id'] ?? null;
        $status = $filters['status'] ?? null;
        $usuarioLogadoId = $filters['usuarioLogadoId'] ?? null;
        $usuarioId = $filters['usuario_id'] ?? $usuarioLogadoId;

        if (($dataInicio === null) !== ($dataFim === null)) {
            throw new ServerException("ValidateFiltros", "As datas de início e fim devem ser preenchidas juntas.");
        }

        if ($dataInicio === null && !$vigentes && !$arquivados && $usuarioId === null && $numero === null && $tipoModalidadeId === null && $status === null && $unidadesId === null) {
            throw new ServerException("ValidateFiltros", "Informe ao menos um filtro para a busca.");
        }

        return new self(
            dataInicio: $dataInicio,
            dataFim: $dataFim,
            vigentes: $vigentes,
            arquivados: $arquivados,
            usuarioId: $usuarioId,
            unidadesId: $unidadesId,
            subordinadas: (bool) ($filters['subordinadas'] ?? false),
            hierarquia: $hierarquia,
            numero: $numero,
            tipoModalidadeId: $tipoModalidadeId,
            status: $status,
            page: (int) ($filters['page'] ?? 1),
            perPage: (int) ($filters['size'] ?? 15),
            usuarioLogadoId: $usuarioLogadoId,
        );
    }
}
