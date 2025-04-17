<?php
namespace App\Services\Siape\XML\Body;

class SiapeBodyDadosPessoais extends SiapeBody
{
    public function __construct($cpf)
    {
        parent::__construct('ser:consultaDadosPessoais');
        
        $cpf = preg_replace('/[^0-9]/', '', $cpf);

        $this->root->addChild('cpf', $cpf); 
        $this->addCodOrgao();
        $this->addConfig('parmExistPag');
        $this->addConfig('parmTipoVinculo');
    }
}