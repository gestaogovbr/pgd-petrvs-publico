<?php

namespace App\Services\Siape\BuscarDados;

use App\Models\IntegracaoUnidade;
use App\Models\SiapeDadosUORG;
use App\Models\SiapeListaUORGS;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;

class BuscarDadosSiapeUnidade extends BuscarDadosSiape
{

    public function listaUorg(): void
    {

        $unidades = IntegracaoUnidade::all();

        $xmlsUnidades = [];
        foreach ($unidades as $unidade) {
            $codigoSiape = $unidade->codigo_siape;
            $codOrgao = strval(intval($this->getConfig()['codOrgao']));

            array_push($xmlsUnidades, $this->dadosUorg(
                $this->getConfig()['siglaSistema'],
                $this->getConfig()['nomeSistema'],
                $this->getConfig()['senha'],
                $this->getCpf(),
                $codOrgao,
                $codigoSiape
            ));
        }

        $xmlResponse =  $this->BuscarUorgs($xmlsUnidades);
        $inserts =[];
        foreach ($xmlResponse as $xml) {
            array_push($inserts, ['response' => $xml]);
        }
        SiapeDadosUORG::insert($inserts);
    }

    public function dadosUorg(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $cpf,
        $siapeCodOrgao,
        $siapeCodUorg
    ): string {
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $dadosUorg = $body->addChild('ser:dadosUorg');
        $dadosUorg->addChild('siglaSistema', $siapeSiglaSistema);
        $dadosUorg->addChild('nomeSistema', $siapeNomeSistema);
        $dadosUorg->addChild('senha', $siapeSenha);
        $dadosUorg->addChild('cpf', $cpf);
        $dadosUorg->addChild('codOrgao', $siapeCodOrgao);
        $dadosUorg->addChild('codUorg', $siapeCodUorg);

        return $xml->asXML();
    }

    public function BuscarUorgs(array $xmlData)
    {
        $token = $this->getToken();

        $url = $this->getUrl() . '/api-consulta-siape/v1/consulta-siape';

        $headers = [
            'x-cpf-usuario: ' . $this->getCpf(),
            'Authorization: Bearer ' . $token,
            'Content-Type: application/xml',
        ];

        $multiCurl = curl_multi_init();
        $curlHandles = [];

        foreach ($xmlData as $key => $xmlData) {
            $curlHandles[$key] = curl_init();

            curl_setopt_array($curlHandles[$key], [
                CURLOPT_URL => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => true,
                CURLOPT_HTTPHEADER => $headers,
                CURLOPT_POSTFIELDS => $xmlData,
            ]);

            curl_multi_add_handle($multiCurl, $curlHandles[$key]);

            Log::info('Request made to ' . $this->geturl() . '/api-consulta-siape/v1/consulta-siape', [
                'headers' => $headers,
                'body' => $xmlData
            ]);
        }

        do {
            $status = curl_multi_exec($multiCurl, $active);
            curl_multi_select($multiCurl);
        } while ($active && $status == CURLM_OK);

        $respostas = [];
        foreach ($curlHandles as $key => $ch) {
            if (curl_errno($ch)) {
                $errorLog[] = "Erro na requisição $key: " . curl_error($ch);
                continue;
            }

            $response = curl_multi_getcontent($ch);
            array_push($respostas, $response);
            Log::info('Response: ' . $response);

            curl_multi_remove_handle($multiCurl, $ch);

            curl_close($ch);
        }

        curl_multi_close($multiCurl);

        if (!empty($errorLog)) {
            Log::error('Erros na requisição: ' . json_encode($errorLog));
        }

        return $response;
    }

    public function enviar(): void
    {
        $this->listaUorg();
    }
}
