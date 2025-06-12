<?php
namespace App\Services\Siape\Consulta;

use App\Services\Siape\Consulta\XML\Body\SiapeBodyUnidade;

class SiapeUnidadeService extends SiapeService {

    public function getBody($params = []): SiapeBodyUnidade {
        return new SiapeBodyUnidade($params['codUorg']);
    }

    public function buscarUnidade($codUorg) {
        return $this->buscar(['codUorg' => $codUorg]);
    }
}