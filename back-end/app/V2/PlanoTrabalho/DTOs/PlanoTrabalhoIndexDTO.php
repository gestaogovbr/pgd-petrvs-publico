<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DTOs;

use App\Exceptions\ValidateException;

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
        public readonly ?string $usuarioNome,
        public readonly ?string $unidadeRegramento,
        public readonly int $page,
        public readonly int $perPage,
        public readonly ?string $usuarioLogadoId = null,
        public readonly ?string $orderBy = null,
        public readonly ?string $orderDir = null,
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
            usuarioNome: $this->usuarioNome,
            unidadeRegramento: $this->unidadeRegramento,
            page: $this->page,
            perPage: $this->perPage,
            usuarioLogadoId: $this->usuarioLogadoId,
            orderBy: $this->orderBy,
            orderDir: $this->orderDir,
        );
    }

    public static function fromRequest(array $data, ?string $usuarioLogadoId = null): self
    {
        $filters = $data['filters'] ?? [];
        $filters['page'] = $data['page'] ?? 1;
        $filters['size'] = $data['size'] ?? 15;
        $filters['usuarioLogadoId'] = $usuarioLogadoId;
        $filters['hierarquia'] = $data['hierarquia'] ?? true;
        $filters['order_by'] = $data['order_by'] ?? null;
        $filters['order_dir'] = $data['order_dir'] ?? null;

        return self::fromArray($filters);
    }

    public static function fromArray(array $filters): self
    {
        $dataInicio = $filters['data_inicio'] ?? null;
        $dataFim = $filters['data_fim'] ?? null;
        $vigentes = (bool) ($filters['vigentes'] ?? false);
        $arquivados = (bool) ($filters['arquivados'] ?? false);
        $unidadesId = $filters['unidade_id'] ?? null;
        if (is_string($unidadesId)) {
            $unidadesId = [$unidadesId];
        }
        $hierarquia = $filters['hierarquia'] ?? null;
        $numero = isset($filters['numero']) ? (int) $filters['numero'] : null;
        $tipoModalidadeId = $filters['tipo_modalidade_id'] ?? null;
        $status = $filters['status'] ?? null;
        $usuarioLogadoId = $filters['usuarioLogadoId'] ?? null;
        $usuarioId = $filters['usuario_id'] ?? null;
        $incluirSubordinadas = $filters['incluir_subordinadas'] ?? null;

        if ($dataInicio === null && $dataFim === null && !$vigentes && !$arquivados && $usuarioId === null && $numero === null && $tipoModalidadeId === null && $status === null && $unidadesId === null && $incluirSubordinadas == null) {
            throw new ValidateException("Informe ao menos um filtro para a busca.");
        }

        return new self(
            dataInicio: $dataInicio,
            dataFim: $dataFim,
            vigentes: $vigentes,
            arquivados: $arquivados,
            usuarioId: $usuarioId,
            unidadesId: $unidadesId,
            subordinadas: (bool) ($incluirSubordinadas),
            hierarquia: $hierarquia,
            numero: $numero,
            tipoModalidadeId: $tipoModalidadeId,
            status: $status,
            usuarioNome: $filters['usuario_nome'] ?? null,
            unidadeRegramento: $filters['unidade_regramento'] ?? null,
            page: (int) ($filters['page'] ?? 1),
            perPage: (int) ($filters['size'] ?? 15),
            usuarioLogadoId: $usuarioLogadoId,
            orderBy: $filters['order_by'] ?? null,
            orderDir: $filters['order_dir'] ?? null,
        );
    }
}
