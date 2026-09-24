<?php

declare(strict_types=1);

namespace App\DTOs\Sipec;

final readonly class AtualizacaoDadosPessoaisDTO
{
    public function __construct(
        public ?string $id,
        public ?string $matriculasiape,
        public ?string $cpfServidor,
        public ?string $nomeServidor,
        public ?string $nomeGuerra,
        public ?string $emailfuncional,
        public ?string $telefone,
        public ?string $dataModificacao,
        public ?string $dataNascimento,
        public ?string $identUnica,
        public ?string $nomeJornada,
        public ?string $codJornada,
        public ?string $modalidadePgd,
        public ?string $participaPgd,
    ) {
    }

    public static function fromStdClass(object $row): self
    {
        return new self(
            id: $row->id ?? null,
            matriculasiape: $row->matriculasiape ?? null,
            cpfServidor: $row->cpf_servidor ?? null,
            nomeServidor: $row->nome_servidor ?? null,
            nomeGuerra: $row->nome_guerra ?? null,
            emailfuncional: $row->emailfuncional ?? null,
            telefone: $row->telefone ?? null,
            dataModificacao: $row->data_modificacao ?? null,
            dataNascimento: $row->data_nascimento ?? null,
            identUnica: $row->ident_unica ?? null,
            nomeJornada: $row->nome_jornada ?? null,
            codJornada: $row->cod_jornada ?? null,
            modalidadePgd: $row->modalidade_pgd ?? null,
            participaPgd: $row->participa_pgd ?? null,
        );
    }
}
