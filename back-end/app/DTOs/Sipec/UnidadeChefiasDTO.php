<?php

declare(strict_types=1);

namespace App\DTOs\Sipec;

final readonly class UnidadeChefiasDTO
{
    public function __construct(
        public ?string $unidadeId,
        public ?string $codigoUnidade,
        public ?string $cpfTitular,
        public ?string $cpfSubstituto,
    ) {
    }

    public static function fromStdClass(object $row): self
    {
        return new self(
            unidadeId: $row->id_unidade ?? null,
            codigoUnidade: $row->codigo_unidade ?? null,
            cpfTitular: $row->cpf_titular ?? null,
            cpfSubstituto: $row->cpf_substituto ?? null,
        );
    }

    public function hasTitular(): bool
    {
        return !empty($this->cpfTitular);
    }

    public function hasSubstituto(): bool
    {
        return !empty($this->cpfSubstituto);
    }
}
