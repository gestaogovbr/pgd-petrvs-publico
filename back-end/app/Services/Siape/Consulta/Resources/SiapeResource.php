<?php
namespace App\Services\Siape\Consulta\Resources;

use App\Exceptions\SiapeRequestException;
use SimpleXMLElement;

abstract class SiapeResource
{
    protected string $path;
    protected SimpleXMLElement $xmlElement;
    public $data;

    public function __construct(string $path, string $xml)
    {
        $this->path = $path;

        $this->xmlElement = new SimpleXMLElement($xml);
        $this->xmlElement->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $this->xmlElement->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $this->xmlElement->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');
        $this->xmlElement->registerXPathNamespace('ns2', 'http://entidade.wssiapenet');


        $this->data = $this->xmlElement->xpath($this->path);
    }

    abstract public function toArray();
}