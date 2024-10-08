<?php

namespace App\Services\Siape;

use App\Exceptions\RequestConectaGovException;
use App\Models\SiapeDadosUORG;
use Exception;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use Illuminate\Support\Facades\DB;

class ProcessaDadosSiapeBD
{

    public function dadosServidor(): array
    {
        $results = DB::table('siape_consultaDadosPessoais AS p')
            ->join('siape_consultaDadosFuncionais AS f', 'p.cpf', '=', 'f.cpf')
            ->select('p.cpf', 'p.response AS responseDadosPessoais', 'f.response AS responseDadosFuncionais', 'p.data_modificacao')
            ->get();
        
        if (!$results) {
            return [];
        }


        $dadosServidorArray = [];

        foreach ($results as $servidor) {
            try {
                $dadosServidorArray[] = [
                    'cpf' => $servidor->cpf,
                    'data_modificacao' => $servidor->data_modificacao,
                    'dadosPessoais' => $this->processaDadosPessoais($servidor->responseDadosPessoais),
                    'dadosFuncionais' => $this->processaDadosFuncionais($servidor->responseDadosFuncionais),
                ];
            } catch (Exception $e) {
                Log::error('Erro ao processar servidor #'.$servidor->cpf, [$e->getMessage()]);
                continue;
            }
            
        }
        
        return $dadosServidorArray;
    }

    private function processaDadosPessoais(
        string $dadosPessoais
    ): array {
        $xmlResponse = $this->prepareResponseXml($dadosPessoais);

        $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

        $dadosPessoais = $xmlResponse->xpath('//ns1:consultaDadosPessoaisResponse/out')[0];
        $dadosPessoaisArray = $this->simpleXmlElementToArray($dadosPessoais);

        return $dadosPessoaisArray;
    }

    private function processaDadosFuncionais(
        string $dadosFuncionais
    ): array {
        $xmlResponse = $this->prepareResponseXml($dadosFuncionais);
        $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

        $dadosFuncionais = $xmlResponse->xpath('//tipo:DadosFuncionais')[0];
        $dadosFuncionaisArray = $this->simpleXmlElementToArray($dadosFuncionais);

        return $dadosFuncionaisArray;
    }
    function simpleXmlElementToArray(SimpleXMLElement $element): array
    {
        $array = [];
        foreach ($element as $key => $value) {
            $array[$key] = (string) $value;
        }
        return $array;
    }

    public function dadosUorg(): array
    {

        $response = SiapeDadosUORG::where('processado', 0)
            ->orderBy('updated_at', 'desc')->get();

        if (!$response) {
            return [];
        }
        $dadosUorgArray = [];
        foreach ($response as $dadosUnidades) {
            try {
                $responseXml = $this->prepareResponseXml($dadosUnidades->response);
            } catch (Exception $e) {
                Log::error('Erro ao processar XML', [$e->getMessage()]);
                continue;
            }

            $responseXml->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
            $responseXml->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
            $responseXml->registerXPathNamespace('ent', 'http://entidade.wssiapenet');

            $dadosUorg = $responseXml->xpath('//ns1:dadosUorgResponse/out')[0];
            $dadosUorgArray[] = [
                'data_modificacao' => $dadosUnidades->data_modificacao,
                'dados' => $this->simpleXmlElementToArray($dadosUorg)
            ];

            $dadosUnidades->processado = 1;
            $dadosUnidades->save();
        }

        return $dadosUorgArray;
    }

    private function prepareResponseXml(string $response): SimpleXMLElement
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

        return $responseXml;
    }
}
