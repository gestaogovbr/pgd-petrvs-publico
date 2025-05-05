<?php
namespace App\Services\Siape\Consulta\XML\Body;

use SimpleXMLElement;
use App\Services\Siape\Consulta\XML\SiapeXMLElement;

abstract class SiapeBody extends SiapeXMLElement
{
    public $root;

    public function __construct(string $servico)
    {
        parent::__construct();
       
        $body = $this->xmlElement->addChild('soapenv:Body');
        $root = $body->addChild($servico);
        $this->root = $root;

        $this->addConfig('siglaSistema');
        $this->addConfig('nomeSistema');
        $this->addConfig('senha');
        $this->addCpf();
        $this->addCodOrgao();
    }

    public function addConfig($key){
        $config = config("integracao")["siape"];
        $this->root->addChild($key, $config[$key]);
    }

    public function addCodOrgao(){
        $config = config("integracao")["siape"];
        $this->root->addChild('codOrgao', strval(intval($config['codOrgao'])));
    }

    public function addCpf(){
        $config = config("integracao")["siape"];
        $this->root->addChild('cpf', $config['cpf']);
    }
}