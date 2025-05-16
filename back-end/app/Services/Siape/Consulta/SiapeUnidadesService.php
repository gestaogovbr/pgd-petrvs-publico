<?php
namespace App\Services\Siape\Consulta;

use App\Services\Siape\Consulta\XML\Body\SiapeBodyUnidades;

class SiapeUnidadesService extends SiapeService {

    public function getBody($params = []): SiapeBodyUnidades {
        return new SiapeBodyUnidades();
    }
}