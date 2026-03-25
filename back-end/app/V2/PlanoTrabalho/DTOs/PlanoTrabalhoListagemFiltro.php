<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DTOs;

use App\Exceptions\ServerException;

class PlanoTrabalhoListagemFiltro
{
    public function __construct(
        public readonly ?string $dataInicio,
        public readonly ?string $dataFim,
        public readonly bool $vigentes,
        public readonly bool $arquivados,
        public readonly ?string $usuarioId,
        public readonly ?array $unidadesId,
        public readonly int $page,
        public readonly int $perPage,
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
            page: $this->page,
            perPage: $this->perPage,
        );
    }

    public static function fromArray(array $filters): self
    {
        $dataInicio = $filters['data_inicio'] ?? null;
        $dataFim = $filters['data_fim'] ?? null;
        $vigentes = (bool) ($filters['vigentes'] ?? false);
        $arquivados = (bool) ($filters['arquivados'] ?? false);
        $usuarioId = $filters['usuario_id'] ?? null;
        $unidadesId = $filters['unidade_id'] ?? null;

        if (($dataInicio === null) !== ($dataFim === null)) {
            throw new ServerException("ValidateFiltros", "As datas de início e fim devem ser preenchidas juntas.");
        }

        if ($dataInicio === null && !$vigentes && !$arquivados && $usuarioId === null) {
            throw new ServerException("ValidateFiltros", "Informe ao menos um filtro para a busca.");
        }

        return new self(
            dataInicio: $dataInicio,
            dataFim: $dataFim,
            vigentes: $vigentes,
            arquivados: $arquivados,
            usuarioId: $usuarioId,
            unidadesId: $unidadesId,
            page: (int) ($filters['page'] ?? 1),
            perPage: (int) ($filters['size'] ?? 15),
        );
    }
}
