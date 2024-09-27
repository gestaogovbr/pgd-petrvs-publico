<?php

namespace App\Services\Siape;

use App\Exceptions\RequestConectaGovException;
use App\Models\SiapeListaUORGS;
use Exception;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Client\RequestException;

class BuscarDadosSiapeUnidade extends BuscarDadosSiape
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
        SiapeListaUORGS::create(['response' => $xmlResponse]);
    }

    public function BuscarUorgs($xmlData)
    {

        $httpCliente =  Http::withOptions([
            'verify' => false,
            'timeout' => 0,
        ])
            ->baseUrl($this->getUrl())
            ->withToken($this->getToken())
            ->withHeaders([
                'x-cpf-usuario' => $this->getCpf(),
                'Content-Type' => 'application/xml',
            ]);

        $response =  $httpCliente->post('api-consulta-siape/v1/consulta-siape', $xmlData)
            ->throw(function (Response $response, RequestException $e) {
                Log::error('Erro ao buscar dados no SIAPE: ' . $e->getMessage());
                throw new RequestConectaGovException('Erro ao buscar dados no SIAPE: ' . $e->getMessage());
            });

        if (!$response->successful()) {
            Log::error('Erro ao buscar dados no SIAPE: ' . $response->body());
            throw new RequestConectaGovException('Erro ao buscar dados no SIAPE: ' . $response->body());
        }
        return $response->body();
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
