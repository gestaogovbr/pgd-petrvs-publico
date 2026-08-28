<?php

declare(strict_types=1);

namespace App\V2\Usuario\DTOs;

class UsuarioAtribuicoesDTO
{
    /**
     * @param array<int, array{unidade_id: string, atribuicoes?: string[]}> $atribuicoes
     */
    public function __construct(
        public readonly string $usuarioId,
        public readonly array $atribuicoes,
    ) {}

    public static function fromArray(array $data, string $usuarioId): self
    {
        return new self(
            usuarioId: $usuarioId,
            atribuicoes: $data['atribuicoes'],
        );
    }

    /**
     * Retorna os vínculos prontos para o salvarIntegrantes (com usuario_id injetado).
     * @return array<int, array{unidade_id: string, usuario_id: string, atribuicoes?: string[]}>
     */
    public function toVinculos(): array
    {
        return array_map(
            fn (array $item) => array_merge($item, ['usuario_id' => $this->usuarioId]),
            $this->atribuicoes
        );
    }
}
