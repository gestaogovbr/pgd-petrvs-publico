<?php
namespace App\Services\Siape\Consulta\XML;

use SimpleXMLElement;

abstract class SiapeXMLElement
{
    const NS_SOAP = 'http://schemas.xmlsoap.org/soap/envelope/';
    const NS_SERVICO = 'http://servico.wssiapenet';

    public SimpleXMLElement $xmlElement;

    public function __construct()
    {
        $this->xmlElement = new SimpleXMLElement(
            '<soapenv:Envelope xmlns:soapenv="'.self::NS_SOAP.'" xmlns:ser="'.self::NS_SERVICO.'"/>'
        );
    }

    public function getXml(): string
    {
        return $this->xmlElement->asXML();
    }
}