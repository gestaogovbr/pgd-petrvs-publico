<?php

declare(strict_types=1);

namespace App\DTOs\Sipec;

final readonly class ServidorNaoLotadoDTO
{
    public function __construct(
        public ?string $usuarioId,
        public ?string $unidadeId,
        public ?string $matricula,
    ) {
    }

    public static function fromStdClass(object $row): self
    {
        return new self(
            usuarioId: $row->usuario_id ?? null,
            unidadeId: $row->unidade_id ?? null,
            matricula: $row->matricula ?? null,
        );
    }
}
