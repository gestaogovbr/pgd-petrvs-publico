<?php
namespace App\Services\Siape\Consulta;

use App\Services\Siape\Consulta\XML\Body\SiapeBody;

abstract class SiapeBaseService {

    protected $contentType = 'application/x-www-form-urlencoded';
    
    abstract public function getToken();

    abstract public function getBody($params = []): SiapeBody;

    abstract public function buscar($params): string|bool;
}