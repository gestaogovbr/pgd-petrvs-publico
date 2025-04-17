<?php
namespace App\Services\Siape;

use App\Services\Siape\XML\Body\SiapeBodyDadosFuncionais;

class SiapeDadosFuncionaisService extends SiapeService {

    public function getBody($params): SiapeBodyDadosFuncionais {
        return new SiapeBodyDadosFuncionais($params['cpf']);
    }

    public function buscarCPF($cpf) {
        return $this->buscar(['cpf' => $cpf]);
    }

    public function getXMLElement() {
    }

}