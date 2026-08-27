<?php

declare(strict_types=1);

namespace App\V2\Usuario\DTOs;

class UsuarioDadosPessoaisDTO
{
    public function __construct(
        public readonly ?string $telefone,
        public readonly ?string $nome,
        public readonly ?string $email,
        public readonly ?string $cpf,
        public readonly ?string $dataNascimento,
        public readonly ?string $uf,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            telefone: $data['telefone'] ?? null,
            nome: $data['nome'] ?? null,
            email: $data['email'] ?? null,
            cpf: $data['cpf'] ?? null,
            dataNascimento: $data['data_nascimento'] ?? null,
            uf: $data['uf'] ?? null,
        );
    }

    /** @return array<string, string|null> Todos os campos para persistência de usuário externo */
    public function toArray(): array
    {
        return [
            'telefone' => $this->telefone,
            'nome' => $this->nome,
            'email' => $this->email,
            'cpf' => $this->cpf,
            'data_nascimento' => $this->dataNascimento,
            'uf' => $this->uf,
        ];
    }

    /** @return array<string, string|null> Apenas telefone para persistência de usuário interno */
    public function toArrayInterno(): array
    {
        return [
            'telefone' => $this->telefone,
        ];
    }
}
