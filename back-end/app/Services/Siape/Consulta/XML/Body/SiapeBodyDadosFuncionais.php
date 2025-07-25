<?php
namespace App\Services\Siape\Consulta\XML\Body;

class SiapeBodyDadosFuncionais extends SiapeBody
{
    private string $cpf;

    public function __construct($cpf)
    {
        $cpf = preg_replace('/[^0-9]/', '', $cpf);
        $this->cpf = $cpf;
        
        parent::__construct('ser:consultaDadosFuncionais');
        
        $this->addConfig('parmExistPag');
        $this->addConfig('parmTipoVinculo');
    }

    public function addCpf(){
        $this->root->addChild('cpf', $this->cpf); 
    }
}