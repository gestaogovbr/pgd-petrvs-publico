<?php

namespace App\Services\Siape\BuscarDados;

use App\Exceptions\RequestConectaGovException;
use App\Models\SiapeListaUORGS;
use Exception;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Client\RequestException;

class BuscarDadosSiapeUnidades extends BuscarDadosSiape
{

    public function listaUorgs(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $cpf,
        $siapeCodOrgao,
        $siapeCodUorg
    ): void {

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

        $xmlResponse =  $this->BuscarUorgs($xmlData);
        $entidade = SiapeListaUORGS::create(['response' => $xmlResponse]);
        $entidade->save();
    }

    public function BuscarUorgs(string $xmlData)
    {
        $token = $this->getToken();

        $curl = curl_init();

        $headers = [
            'x-cpf-usuario: ' . $this->getCpf(),
            'Authorization: Bearer ' . $token,
            'Content-Type: application/xml',
        ];

        curl_setopt_array($curl, [
            CURLOPT_URL => $this->geturl() . '/api-consulta-siape/v1/consulta-siape',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $xmlData,
        ]);

        Log::info('Request made to ' . $this->geturl() . '/api-consulta-siape/v1/consulta-siape', [
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
        return $response;
    }

    public function enviar(): void
    {

        $codOrgao = strval(intval($this->getConfig()['codOrgao']));
        $codUorg = strval(intval($this->getConfig()['codUorg']));

        $this->listaUorgs(
            $this->getConfig()['siglaSistema'],
            $this->getConfig()['nomeSistema'],
            $this->getConfig()['senha'],
            $this->getCpf(),
            $codOrgao,
            $codUorg
        );
    }
}
