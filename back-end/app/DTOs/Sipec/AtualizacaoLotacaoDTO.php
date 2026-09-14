<?php

declare(strict_types=1);

namespace App\DTOs\Sipec;

final readonly class AtualizacaoLotacaoDTO
{
    public function __construct(
        public ?string $usuarioId,
        public ?string $exercicioAtualId,
    ) {
    }

    public static function fromStdClass(object $row): self
    {
        return new self(
            usuarioId: $row->usuario_id ?? null,
            exercicioAtualId: $row->exercicio_atual_id ?? null,
        );
    }
}
