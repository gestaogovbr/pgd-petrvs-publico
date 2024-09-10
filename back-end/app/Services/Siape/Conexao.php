<?php

namespace App\Services\Siape;

use App\Exceptions\RequestConectaGovException;
use Exception;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;

class Conexao
{
    private $contentType = 'application/x-www-form-urlencoded';
    private string $authorizationHeader;

    public function __construct(
        private readonly string $cpf,
        private readonly string $url,
        private readonly string $client,
        private readonly string $secret
    ) {
        $this->authorizationHeader = 'Basic ' . base64_encode($this->client . ':' . $this->secret);
    }

    public function getToken()
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $this->url . '/oauth2/jwt-token',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                'Content-Type: ' . $this->contentType,
                'Authorization: ' . $this->authorizationHeader,
            ],
            CURLOPT_POSTFIELDS => http_build_query(['grant_type' => 'client_credentials']),
        ]);

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
            curl_close($curl);
            Log::error('cURL error: ' . $error_msg);
            throw new RequestConectaGovException('cURL error: ' . $error_msg);
        }

        curl_close($curl);

        $data = json_decode($response, true);


        if (isset($data['access_token'])) {
            return $data['access_token'];
        }
        throw new RequestConectaGovException('Failed to retrieve JWT token. Response: ' . $response);
    }


    public function listaServidores(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $siapeCpf,
        $siapeCodOrgao,
        $codigoSiape
    ): array {
        Log::info('listaServidores');
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $listaServidores = $body->addChild('ser:listaServidores');
        $listaServidores->addChild('siglaSistema', $siapeSiglaSistema);
        $listaServidores->addChild('nomeSistema', $siapeNomeSistema);
        $listaServidores->addChild('senha', $siapeSenha);
        $listaServidores->addChild('cpf', $siapeCpf);
        $listaServidores->addChild('codOrgao', $siapeCodOrgao);
        $listaServidores->addChild('codUorg', $codigoSiape);

        $xmlData = $xml->asXML();

        $xmlResponse =  $this->enviar($xmlData);

        $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $xmlResponse->registerXPathNamespace('ns2', 'http://entidade.wssiapenet');

        $servidores = $xmlResponse->xpath('//ns2:Servidor');

        $servidoresArray = array_map([$this, 'simpleXmlElementToArray'], $servidores);

        Log::info('Servidores: ', [$servidoresArray]);

        return $servidoresArray;
    }

    public function consultaDadosPessoais(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $cpf,
        $siapeCodOrgao,
        $siapeParmExistPag,
        $siapeParmTipoVinculo
    ): array {
        Log::info('consultaDadosPessoais');
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $consultaDadosPessoais = $body->addChild('ser:consultaDadosPessoais');
        $consultaDadosPessoais->addChild('siglaSistema', $siapeSiglaSistema);
        $consultaDadosPessoais->addChild('nomeSistema', $siapeNomeSistema);
        $consultaDadosPessoais->addChild('senha', $siapeSenha);
        $consultaDadosPessoais->addChild('cpf', $cpf);
        $consultaDadosPessoais->addChild('codOrgao', $siapeCodOrgao);
        $consultaDadosPessoais->addChild('parmExistPag', $siapeParmExistPag);
        $consultaDadosPessoais->addChild('parmTipoVinculo', $siapeParmTipoVinculo);

        $xmlData = $xml->asXML();

        $xmlResponse = $this->enviar($xmlData);

        $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

        $dadosPessoais = $xmlResponse->xpath('//ns1:consultaDadosPessoaisResponse/out')[0];
        $dadosPessoaisArray = $this->simpleXmlElementToArray($dadosPessoais);
        
        return $dadosPessoaisArray;
    }

    public function consultaDadosFuncionais(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $cpf,
        $siapeCodOrgao,
        $siapeParmExistPag,
        $siapeParmTipoVinculo
    ): array {
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $consultaDadosFuncionais = $body->addChild('ser:consultaDadosFuncionais');
        $consultaDadosFuncionais->addChild('siglaSistema', $siapeSiglaSistema);
        $consultaDadosFuncionais->addChild('nomeSistema', $siapeNomeSistema);
        $consultaDadosFuncionais->addChild('senha', $siapeSenha);
        $consultaDadosFuncionais->addChild('cpf', $cpf);
        $consultaDadosFuncionais->addChild('codOrgao', $siapeCodOrgao);
        $consultaDadosFuncionais->addChild('parmExistPag', $siapeParmExistPag);
        $consultaDadosFuncionais->addChild('parmTipoVinculo', $siapeParmTipoVinculo);

        $xmlData = $xml->asXML();

        $xmlResponse = $this->enviar($xmlData);
        $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

        $dadosFuncionais = $xmlResponse->xpath('//tipo:DadosFuncionais')[0];
        $dadosFuncionaisArray = $this->simpleXmlElementToArray($dadosFuncionais);

        return $dadosFuncionaisArray;
    }

    public function listaUorgs(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $cpf,
        $siapeCodOrgao,
        $siapeCodUorg
    ): array {
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $listaUorgs = $body->addChild('ser:listaUorgs');
        $listaUorgs->addChild('siglaSistema', $siapeSiglaSistema);
        $listaUorgs->addChild('nomeSistema', $siapeNomeSistema);
        $listaUorgs->addChild('senha', $siapeSenha);
        $listaUorgs->addChild('cpf', $cpf);
        $listaUorgs->addChild('codOrgao', $siapeCodOrgao);
        $listaUorgs->addChild('codUorg', $siapeCodUorg);

        $xmlData = $xml->asXML();
        
        $xmlResponse =  $this->enviar($xmlData);
        $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $xmlResponse->registerXPathNamespace('ns2', 'http://entidade.wssiapenet');
        $uorgs = $xmlResponse->xpath('//ns2:Uorg');
        $uorgsArray = array_map([$this, 'simpleXmlElementToArray'], $uorgs);
        return $uorgsArray;
    }

    function simpleXmlElementToArray(SimpleXMLElement $element) : array{
        $array = [];
        foreach ($element as $key => $value) {
            $array[$key] = (string) $value; 
        }
        return $array;
    }
    
    public function dadosUorg(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $cpf,
        $siapeCodOrgao,
        $siapeCodUorg
    ): array {
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $dadosUorg = $body->addChild('ser:dadosUorg');
        $dadosUorg->addChild('siglaSistema', $siapeSiglaSistema);
        $dadosUorg->addChild('nomeSistema', $siapeNomeSistema);
        $dadosUorg->addChild('senha', $siapeSenha);
        $dadosUorg->addChild('cpf', $cpf);
        $dadosUorg->addChild('codOrgao', $siapeCodOrgao);
        $dadosUorg->addChild('codUorg', $siapeCodUorg);

        $xmlData = $xml->asXML();

        $responseXml = $this->enviar($xmlData);

        $responseXml->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $responseXml->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $responseXml->registerXPathNamespace('ent', 'http://entidade.wssiapenet');

        $dadosUorg = $responseXml->xpath('//ns1:dadosUorgResponse/out')[0];
        $dadosUorgArray = $this->simpleXmlElementToArray($dadosUorg);

        return $dadosUorgArray;
        
    }


    private function enviar($xmlData) : SimpleXMLElement
    {
        try {
            $token = $this->getToken();

            $curl = curl_init();

            $headers = [
                'x-cpf-usuario: ' . $this->cpf,
                'Authorization: Bearer ' . $token,
                'Content-Type: application/xml',
            ];

            curl_setopt_array($curl, [
                CURLOPT_URL => $this->url . '/api-consulta-siape/v1/consulta-siape',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => true,
                CURLOPT_HTTPHEADER => $headers,
                CURLOPT_POSTFIELDS => $xmlData,
            ]);

            Log::info('Request made to ' . $this->url . '/api-consulta-siape/v1/consulta-siape', [
                'headers' => $headers,
                'body' => $xmlData
            ]);

            $response = curl_exec($curl);

            if (curl_errno($curl)) {
                $error_msg = curl_error($curl);
                curl_close($curl);
                throw new Exception('cURL error: ' . $error_msg);
            }

            curl_close($curl);
            Log::info('Response: ' . $response);
            return $this->prepareResponseXml($response);
        } catch (RequestConectaGovException $e) {
            Log::error('Error: ' . $e->getMessage());
            throw new RequestConectaGovException();
        } catch (Exception $e) {
            return 'Error: ' . $e->getMessage();
        }
    }

    private function prepareResponseXml(string $response) : SimpleXMLElement
    {
        $response = trim($response); 
        $response = str_replace(['&lt;', '&gt;', '&quot;', '&amp;', '&apos;'], ['<', '>', '"', '&', "'"], $response); 
        libxml_use_internal_errors(true); 
        $response = <<<XML
        $response
        XML;
        $responseXml = simplexml_load_string($response, "SimpleXMLElement", LIBXML_NOCDATA);
        if ($responseXml === false) {
            $errors = libxml_get_errors();
            foreach ($errors as $error) {
                Log::error('XML Error: ' . $error->message);
            }
            libxml_clear_errors();
            throw new RequestConectaGovException('Invalid XML response'); 
        }
        Log::info('Response convertido: ' , [$responseXml]);
        return $responseXml;
    }
    
}
