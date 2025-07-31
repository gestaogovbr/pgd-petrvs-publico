<?php

namespace App\Services\Siape\Servidor;

class ServidorDTO
{
    public string $id;
    public ?string $cpf_ativo;
    public ?string $data_modificacao;
    public string $cpf;
    public string $nome;
    public string $emailfuncional;
    public ?string $sexo;
    public ?string $municipio;
    public ?string $uf;
    public ?string $data_nascimento;
    public ?string $telefone;
    public ?string $vinculo_ativo;
    public ?string $matriculasiape;
    public ?string $codigo_cargo;
    public ?string $coduorgexercicio;
    public ?string $coduorglotacao;
    public ?string $codigo_servo_exercicio;
    public string $nomeguerra;
    public ?string $codigo_situacao_funcional;
    public string $situacao_funcional;
    public ?string $codupag;
    public ?string $dataexercicionoorgao;
    public ?string $funcoes;
    public ?string $cpf_chefia_imediata;
    public ?string $email_chefia_imediata;
    public ?string $modalidade_pgd;
    public ?string $participa_pgd;
    public ?string $deleted_at;

    public function __construct(array $data)
    {

        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }
}
