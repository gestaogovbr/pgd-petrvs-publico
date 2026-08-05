<?php

declare(strict_types=1);

namespace App\DTOs\Sipec;

final readonly class ServidorAusenteDTO
{
    public function __construct(
        public ?string $matricula,
        public ?string $nome,
        public ?string $cpf,
        public ?string $emailfuncional,
        public ?string $sexo,
        public ?string $uf,
        public ?string $dataNascimento,
        public ?string $telefone,
        public ?string $apelido,
        public ?string $exercicio,
        public ?string $situacaoFuncional,
        public ?string $dataModificacao,
        public ?string $identUnica,
        public ?string $modalidadePgd,
    ) {
    }

    public static function fromStdClass(object $row): self
    {
        return new self(
            matricula: $row->matricula ?? null,
            nome: $row->nome ?? null,
            cpf: $row->cpf ?? null,
            emailfuncional: $row->emailfuncional ?? null,
            sexo: $row->sexo ?? null,
            uf: $row->uf ?? null,
            dataNascimento: $row->data_nascimento ?? null,
            telefone: $row->telefone ?? null,
            apelido: $row->apelido ?? null,
            exercicio: $row->exercicio ?? null,
            situacaoFuncional: $row->situacao_funcional ?? null,
            dataModificacao: $row->data_modificacao ?? null,
            identUnica: $row->ident_unica ?? null,
            modalidadePgd: $row->modalidade_pgd ?? null,
        );
    }
}
