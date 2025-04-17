<?php
namespace App\Services\Siape;

use App\Services\Siape\XML\Body\SiapeBodyDadosPessoais;

class SiapeDadosPessoaisService extends SiapeService {

    public function getBody($params): SiapeBodyDadosPessoais {
        return new SiapeBodyDadosPessoais($params['cpf']);
    }

    public function buscarCPF($cpf) {
        return $this->buscar(['cpf' => $cpf]);
    }

    public function getXMLElement() {
    }

}