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
            CURLOPT_URL => $this->url.'/oauth2/jwt-token',
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
        $codigo_siape
    ): mixed {
        Log::info('listaServidores');
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $listaServidores = $body->addChild('ser:listaServidores');
        $listaServidores->addChild('siglaSistema', $siapeSiglaSistema);
        $listaServidores->addChild('nomeSistema', $siapeNomeSistema);
        $listaServidores->addChild('senha', $siapeSenha);
        $listaServidores->addChild('cpf', $siapeCpf);
        $listaServidores->addChild('codOrgao', $siapeCodOrgao);
        $listaServidores->addChild('codigo', $codigo_siape);

        $xmlData = $xml->asXML();

        return $this->enviar($xmlData); 
    }

    public function consultaDadosPessoais(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $cpf,
        $siapeCodOrgao,
        $siapeParmExistPag,
        $siapeParmTipoVinculo
    ): mixed {
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

        return $this->enviar($xmlData);
        
    }

    public function consultaDadosFuncionais(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $cpf,
        $siapeCodOrgao,
        $siapeParmExistPag,
        $siapeParmTipoVinculo
    ): mixed {
        Log::info('consultaDadosFuncionais');
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

        return $this->enviar($xmlData);
    }

    public function listaUorgs(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $siapeCodOrgao,
        $siapeCodUorg
    ): mixed {
        Log::info('listaUorgs');
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $listaUorgs = $body->addChild('ser:listaUorgs');
        $listaUorgs->addChild('siglaSistema', $siapeSiglaSistema);
        $listaUorgs->addChild('nomeSistema', $siapeNomeSistema);
        $listaUorgs->addChild('senha', $siapeSenha);
        $listaUorgs->addChild('cpf', $this->cpf);
        $listaUorgs->addChild('codOrgao', $siapeCodOrgao);
        $listaUorgs->addChild('coduorg', $siapeCodUorg);

        $xmlData = $xml->asXML();

        return $this->enviar($xmlData);
       
    }

    public function dadosUorg(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $siapeCodOrgao,
        $siapeCodUorg
    ): mixed {
        Log::info('dadosUorg');
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $dadosUorg = $body->addChild('ser:dadosUorg');
        $dadosUorg->addChild('siglaSistema', $siapeSiglaSistema);
        $dadosUorg->addChild('nomeSistema', $siapeNomeSistema);
        $dadosUorg->addChild('senha', $siapeSenha);
        $dadosUorg->addChild('cpf', $this->cpf);
        $dadosUorg->addChild('codOrgao', $siapeCodOrgao);
        $dadosUorg->addChild('codUorg', $siapeCodUorg);

        $xmlData = $xml->asXML();

        return $this->enviar($xmlData);
    }


    private function enviar($xmlData){
        try {
            $token = $this->getToken();

            $curl = curl_init();

            curl_setopt_array($curl, [
                CURLOPT_URL => $this->url.'/api-consulta-siape/v1/consulta-siape',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => true,
                CURLOPT_HTTPHEADER => [
                    'x-cpf-usuario: ' . $this->cpf,
                    'Authorization: Bearer ' . $token,
                    'Content-Type: application/xml',
                ],
                CURLOPT_POSTFIELDS => $xmlData,
            ]);

            $response = curl_exec($curl);

            if (curl_errno($curl)) {
                $error_msg = curl_error($curl);
                curl_close($curl);
                throw new Exception('cURL error: ' . $error_msg);
            }

            curl_close($curl);
            Log::info('Response: ' . $response);
            return $response;
        }
        catch (RequestConectaGovException $e) {
            Log::error('Error: ' . $e->getMessage());
            throw new RequestConectaGovException();
        } 
        catch (Exception $e) {
            return 'Error: ' . $e->getMessage();
        }
    }
}
