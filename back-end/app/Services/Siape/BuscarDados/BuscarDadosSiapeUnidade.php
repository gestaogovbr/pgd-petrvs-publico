<?php

namespace App\Services\Siape\BuscarDados;

use App\Models\IntegracaoUnidade;
use App\Models\SiapeDadosUORG;
use App\Models\SiapeListaUORGS;
use Faker\Core\Uuid;
use Google\Service\CloudControlsPartnerService\Console;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use Illuminate\Support\Str;

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
        $inserts = [];
        foreach ($xmlResponse as $xml) {
            array_push($inserts, [
                'id' => Str::uuid(),
                'response' => $xml
            ]);
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

    public function BuscarUorgs(array $xmlsData) : array
    {
        $lotes = array_chunk($xmlsData, 15);
        $respostas = [];
        foreach ($lotes as $lote) {
            $respostas = array_merge($respostas, $this->executaRequisicoes($lote));
        }
        return $respostas;
    }

    private function executaRequisicoes(array $xmlsData){
        $token = $this->getToken();

        $url = $this->getUrl() . '/api-consulta-siape/v1/consulta-siape';

        $headers = [
            'x-cpf-usuario: ' . $this->getCpf(),
            'Authorization: Bearer ' . $token,
            'Content-Type: application/xml',
        ];

        $multiCurl = curl_multi_init();
        $curlHandles = [];

        foreach ($xmlsData as $key => $xmlData) {
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

        Log::info("quantidade de requisições abertas" . count($xmlsData));
        $esperar = 1;

        do {
            $status = curl_multi_exec($multiCurl, $active);
            curl_multi_select($multiCurl);
            sleep($esperar);
        } while ($active && $status == CURLM_OK);

        $respostas = [];
        foreach ($curlHandles as $key => $ch) {
            if (curl_errno($ch)) {
                $errorLog[] = "Erro na requisição $key: " . curl_error($ch);
                continue;
            }

            $responsesCurl = curl_multi_getcontent($ch);

            if(empty($responsesCurl)){
                Log::alert('Response vazio');
                continue;
            }
            array_push($respostas, $responsesCurl);

            curl_multi_remove_handle($multiCurl, $ch);

            curl_close($ch);
        }

        curl_multi_close($multiCurl);

        if (!empty($errorLog)) {
            Log::error('Erros na requisição: ' . json_encode($errorLog));
        }

        return $respostas;
    }

    public function enviar(): void
    {
        $this->listaUorg();
    }
}
