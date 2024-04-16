<?php
namespace App\Services\Siape\DTO;

namespace App\Services\Siape\DTO;

class ServidorDTO {
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
    public array $funcoes;
    public ?string $cpf_chefia_imediata;
    public ?string $email_chefia_imediata;
    public ?string $deleted_at;

    public function __construct(array $data) {
        $utilService = app()->make('UtilService');
        $directSetFields = [
            $this->data_modificacao, $this->nome, $this->emailfuncional, $this->data_nascimento, $this->nomeguerra, $this->dataexercicionoorgao, $this->deleted_at,
            $this->email_chefia_imediata, $this->cpf_chefia_imediata, $this->funcoes
        ];

        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = in_array($key, $directSetFields) ? $value : $utilService->valueOrDefault($value);
            }
        }
    }
}
