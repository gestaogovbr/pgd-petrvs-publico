<?php

namespace App\Services\Siape;

use App\Exceptions\ErrorDataSiapeException;
use App\Exceptions\ErrorDataSiapeFaultCodeException;
use App\Exceptions\RequestConectaGovException;
use App\Facades\SiapeLog;
use App\Models\SiapeBlackListServidores;
use App\Models\SiapeConsultaDadosFuncionais;
use App\Models\SiapeConsultaDadosPessoais;
use App\Models\SiapeDadosUORG;
use Exception;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
                if($this->cpfNaBlackList($servidor->cpf)){
                    SiapeLog::info('Servidor na blacklist: ' . $servidor->cpf);
                    continue; 
                }

                $dadosServidorArray[] = [
                    'cpf' => $servidor->cpf,
                    'data_modificacao' => $this->previneDataNula($servidor),
                    'dadosPessoais' => $this->processaDadosPessoais($servidor->cpf, $servidor->responseDadosPessoais),
                    'dadosFuncionais' => $this->processaDadosFuncionais($servidor->cpf, $servidor->responseDadosFuncionais),
                ];
            } catch (ErrorDataSiapeException $e) {
                report($e);
                continue;
            } catch (Exception $e) {
                report($e);
                Log::channel('siape')->error('Erro ao processar servidor #' . $servidor->cpf, [$e]);
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

    public function processaDadosPessoais(
        string $cpf,
        string $dadosPessoais
    ): array {
        try {
            $xmlResponse = $this->prepareResponseServidorXml($cpf, $dadosPessoais);

            $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
            $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
            $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

            $dadosPessoais = $xmlResponse->xpath('//ns1:consultaDadosPessoaisResponse/out')[0];
            $dadosPessoaisArray = $this->simpleXmlElementToArray($dadosPessoais);

            return $dadosPessoaisArray;
        } catch (Exception $e) {
            report($e);
            SiapeLog::error(sprintf("CPF:#%s Falha nos dados pessoais:", $cpf), [$dadosPessoais]);
            throw new ErrorDataSiapeException("Falha ao tratar dados pessoais do Siape, para informações detalhadas verificar storage/logs/laravel.log ou storage/logs/siape.log");
        }
    }

    public function processaDadosFuncionais(
        string $cpf,
        string $dadosFuncionais
    ): array {
        try {
            $xmlResponse = $this->prepareResponseServidorXml($cpf, $dadosFuncionais);
            $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
            $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
            $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

            $dadosFuncionais = $xmlResponse->xpath('//tipo:DadosFuncionais');
            $dadosFuncionaisArray = $this->decideDadosFuncionais($dadosFuncionais);

            return $dadosFuncionaisArray;
        } catch (Exception $e) {
            report($e);
           SiapeLog::error(sprintf("CPF:#%s Falha nos dados funcionais:", $cpf), [$dadosFuncionais]);
            throw new ErrorDataSiapeException("Falha ao tratar dados funcionais do Siape, para informações detalhadas verificar storage/logs/laravel.log ou storage/logs/siape.log");
        }
    }

    private function decideDadosFuncionais(array $dadosfuncionaisArray)
    {
        if (count($dadosfuncionaisArray) == 1) {
            return $this->simpleXmlElementToArray($dadosfuncionaisArray[0]);
        }

        $retorno = [];
        foreach ($dadosfuncionaisArray as $dadosFuncionais) {
            $dados = $this->simpleXmlElementToArray($dadosFuncionais);
            if (!empty($dados['dataOcorrExclusao'])) continue;

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
                $dadosUorg = $this->processaDadosUorg($dadosUnidades->response);
            } catch (Exception $e) {
                report($e);
                SiapeLog::error('Erro ao processar XML da Unidade: ' . $e->getMessage(), [$dadosUnidades->response]);
                continue;
            }

            if (is_null($dadosUorg)) {
                SiapeLog::error('Retorno nulo do array: ', [$dadosUnidades->response]);
                continue;
            }

            $dadosUorgArray[] = [
                'data_modificacao' => $dadosUnidades->data_modificacao,
                'dados' => $this->simpleXmlElementToArray($dadosUorg)
            ];

            $dadosUnidades->processado = 1;
            $dadosUnidades->save();
        }

        return $dadosUorgArray;
    }

    public function processaDadosUorg($dados): SimpleXMLElement|null
    {
        try {
            $responseXml = $this->prepareResponseXml($dados);
        } catch (Exception $e) {
            report($e);
            throw new ErrorDataSiapeException("Erro ao processar XML da Unidade");
        }

        $responseXml->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $responseXml->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $responseXml->registerXPathNamespace('ent', 'http://entidade.wssiapenet');

        $out = $responseXml->xpath('//ns1:dadosUorgResponse/out');

        if (!$out) {
            return null;
        }

        return $out[0];
    }

    private function sanitizeXml(string &$response): void
    {
        $response = trim($response);
        $response = preg_replace('/&(?!amp;|lt;|gt;|quot;|apos;)/', '&amp;', $response);
        $response = preg_replace('/[^\P{C}\t\n\r]/u', '', $response);
        $response = preg_replace('/xmlns=""/', '', $response);
    }


    private function prepareResponseServidorXml(string $cpf, string $response): SimpleXMLElement
    {
        $responseXml = $this->prepareResponseXml($response);

        $fault = $responseXml->xpath('//soap:Fault');
        if ($fault && isset($fault[0]->faultcode) && (string) $fault[0]->faultcode === Erros::faultcode 
        && isset($fault[0]->faultstring) && 
        (string) $fault[0]->faultstring === Erros::getFaultStringNaoExistemDados()) {
            SiapeBlackListServidores::firstOrCreate(
                ['cpf' => $cpf],
                ['id' => (string) Str::uuid(), 'response' => $response]
            );

            throw new ErrorDataSiapeFaultCodeException(sprintf('faultcode #%s: ', (string) $fault[0]->faultcode) . (string) $fault[0]->faultstring);
        }
        return $responseXml;
    }

    private function prepareResponseXml(string $response): SimpleXMLElement
    {
        $this->sanitizeXml($response);
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

    private function cpfNaBlackList(string $cpf): bool
    {
        return SiapeBlackListServidores::where('cpf', $cpf)
            ->exists();
    }
}
