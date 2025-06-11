<?php
namespace App\Services\Siape\Consulta;

use App\Services\Siape\Consulta\XML\Body\SiapeBodyDadosFuncionais;

class SiapeDadosFuncionaisService extends SiapeService {

    public function getBody($params = []): SiapeBodyDadosFuncionais {
        return new SiapeBodyDadosFuncionais($params['cpf']);
    }

    public function buscarCPF($cpf) {
        return $this->buscar(['cpf' => $cpf]);
    }
}