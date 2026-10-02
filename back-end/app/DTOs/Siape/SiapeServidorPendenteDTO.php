<?php

declare(strict_types=1);

namespace App\DTOs\Siape;

final readonly class SiapeServidorPendenteDTO
{
    public function __construct(
        public string $cpf,
        public string $responseDadosPessoais,
        public string $responseDadosFuncionais,
        public ?string $dataModificacao,
    ) {
    }

    public static function fromDatabaseRow(object $row): self
    {
        return new self(
            cpf: (string) $row->cpf,
            responseDadosPessoais: (string) $row->responseDadosPessoais,
            responseDadosFuncionais: (string) $row->responseDadosFuncionais,
            dataModificacao: $row->data_modificacao === null ? null : (string) $row->data_modificacao,
        );
    }
}
