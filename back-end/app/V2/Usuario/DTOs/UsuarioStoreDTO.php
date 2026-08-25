<?php

declare(strict_types=1);

namespace App\V2\Usuario\DTOs;

class UsuarioStoreDTO
{
    /**
     * @param array<int, array{unidade_id: string, atribuicoes?: string[]}> $atribuicoes
     */
    public function __construct(
        public readonly string $cpf,
        public readonly string $email,
        public readonly string $nome,
        public readonly string $perfilId,
        public readonly array $atribuicoes,
        public readonly ?string $apelido = null,
        public readonly ?string $telefone = null,
        public readonly ?string $dataNascimento = null,
        public readonly ?string $uf = null,
        public readonly ?string $sexo = null,
        public readonly ?string $matricula = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            cpf: $data['cpf'],
            email: $data['email'],
            nome: $data['nome'],
            perfilId: $data['perfil_id'],
            atribuicoes: $data['atribuicoes'],
            apelido: $data['apelido'] ?? null,
            telefone: $data['telefone'] ?? null,
            dataNascimento: $data['data_nascimento'] ?? null,
            uf: $data['uf'] ?? null,
            sexo: $data['sexo'] ?? null,
            matricula: $data['matricula'] ?? null,
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'nome' => $this->nome,
            'email' => $this->email,
            'cpf' => $this->cpf,
            'apelido' => $this->apelido ?? $this->nome,
            'telefone' => $this->telefone,
            'data_nascimento' => $this->dataNascimento,
            'uf' => $this->uf,
            'sexo' => $this->sexo,
            'matricula' => $this->matricula,
            'perfil_id' => $this->perfilId,
            'usuario_externo' => true,
        ];
    }
}
