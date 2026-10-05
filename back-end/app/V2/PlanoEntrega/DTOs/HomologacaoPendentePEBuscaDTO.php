<?php

declare(strict_types=1);

namespace App\V2\PlanoEntrega\DTOs;

/**
 * Parâmetros para a listagem paginada de Planos de Entrega aguardando homologação.
 */
class HomologacaoPendentePEBuscaDTO
{
    /**
     * @param string[] $unidadesIds
     */
    public function __construct(
        public readonly array $unidadesIds,
        public readonly int $page = 1,
        public readonly int $perPage = 15,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            unidadesIds: $data['unidades_ids'] ?? [],
            page: (int) ($data['page'] ?? 1),
            perPage: (int) ($data['per_page'] ?? 15),
        );
    }

    public function toArray(): array
    {
        return [
            'unidades_ids' => $this->unidadesIds,
            'page' => $this->page,
            'per_page' => $this->perPage,
        ];
    }
}
