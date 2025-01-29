<?php

namespace App\Services\Siape;

use App\Exceptions\ErrorDataSiapeException;
use App\Exceptions\RequestConectaGovException;
use App\Models\SiapeConsultaDadosFuncionais;
use App\Models\SiapeConsultaDadosPessoais;
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
                    'data_modificacao' => $this->previneDataNula($servidor),
                    'dadosPessoais' => $this->processaDadosPessoais($servidor->responseDadosPessoais),
                    'dadosFuncionais' => $this->processaDadosFuncionais($servidor->responseDadosFuncionais),
                ];
            }
            catch(ErrorDataSiapeException $e){
                continue;
            } 
            catch (Exception $e) {
                Log::error('Erro ao processar servidor #' . $servidor->cpf, [$e]);
                continue;
            }
        }


        SiapeConsultaDadosPessoais::query()->update(['processado' => 1]);
        SiapeConsultaDadosFuncionais::query()->update(['processado' => 1]);
        return $dadosServidorArray;
    }

    private function previneDataNula($servidor): string
    {
        return $servidor->data_modificacao ?? '1970-01-01 00:00:00';
    }

    private function processaDadosPessoais(
        string $dadosPessoais
    ): array {
        try {
            $xmlResponse = $this->prepareResponseXml($dadosPessoais);

            $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
            $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
            $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

            $dadosPessoais = $xmlResponse->xpath('//ns1:consultaDadosPessoaisResponse/out')[0];
            $dadosPessoaisArray = $this->simpleXmlElementToArray($dadosPessoais);

            return $dadosPessoaisArray;
        } catch (Exception $e) {
            Log::error("Falha nos dados pessoais:", [$dadosPessoais]);
            throw new ErrorDataSiapeException("Falha ao tratar dados do Siape");
        }
    }

    private function processaDadosFuncionais(
        string $dadosFuncionais
    ): array {
        try {
            $xmlResponse = $this->prepareResponseXml($dadosFuncionais);
            $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
            $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
            $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

            $dadosFuncionais = $xmlResponse->xpath('//tipo:DadosFuncionais');
            $dadosFuncionaisArray = $this->decideDadosFuncionais($dadosFuncionais);

            return $dadosFuncionaisArray;
        } catch (Exception $e) {
            Log::error("Falha nos dados funcionais:", [$dadosFuncionais]);
            throw new ErrorDataSiapeException("Falha ao tratar dados do Siape");
        }
    }
    
    private function decideDadosFuncionais(array $dadosfuncionaisArray){
        if(count($dadosfuncionaisArray) == 1) return $this->simpleXmlElementToArray($dadosfuncionaisArray[0]);

        $retorno = [];
        foreach($dadosfuncionaisArray as $dadosFuncionais){
            $dados = $this->simpleXmlElementToArray($dadosFuncionais);
            if(!empty($dados['dataOcorrExclusao'])) continue;

            $retorno = $dados;
        }
        return $retorno;
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
                Log::error('Erro ao processar XML da Unidade', [$e->getMessage()]);
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
