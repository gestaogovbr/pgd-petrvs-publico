<?php
namespace App\Services\Siape;

use App\Services\Siape\XML\Body\SiapeBody;

abstract class SiapeBaseService {

    protected $contentType = 'application/x-www-form-urlencoded';
    
    abstract public function getToken();

    abstract public function getBody($params): SiapeBody;

    abstract public function buscar($params);

    abstract public function getXMLElement();
}