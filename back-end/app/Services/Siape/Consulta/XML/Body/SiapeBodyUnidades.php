<?php
namespace App\Services\Siape\Consulta\XML\Body;

class SiapeBodyUnidades extends SiapeBody
{
    public function __construct()
    {
        parent::__construct('ser:listaUorgs');

        $this->root->addChild('codUorg', null);
    }
}