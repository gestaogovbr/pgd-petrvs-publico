<?php

namespace App\Services\Siape;

use App\DTOs\Siape\SiapeServidorPendenteDTO;
use App\Exceptions\ErrorDataSiapeException;
use App\Exceptions\ErrorDataSiapeFaultCodeException;
use App\Exceptions\RequestConectaGovException;
use App\Facades\SiapeLog;
use App\Repository\SiapeBlacklistUnidade\Contracts\SiapeBlacklistUnidadeWriteRepositoryContract;
use App\Repository\SiapeConsultaDadosFuncionais\Contracts\SiapeConsultaDadosFuncionaisWriteRepositoryContract;
use App\Repository\SiapeConsultaDadosPessoais\Contracts\SiapeConsultaDadosPessoaisReadRepositoryContract;
use App\Repository\SiapeConsultaDadosPessoais\Contracts\SiapeConsultaDadosPessoaisWriteRepositoryContract;
use App\Repository\SiapeDadosUORG\Contracts\SiapeDadosUORGReadRepositoryContract;
use App\Repository\SiapeDadosUORG\Contracts\SiapeDadosUORGWriteRepositoryContract;
use App\Services\CodigoOrgaoService;
use App\Services\Siape\Servidor\SiapeServidorBlacklistLifecycleService;
use Exception;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use App\Services\Siape\Unidade\SiapeUnidadeLifecycleService;

class ProcessaDadosSiapeBD
{
    private const DATA_MODIFICACAO_PADRAO = '1970-01-01 00:00:00';

    public function __construct(
        private readonly ?SiapeConsultaDadosPessoaisReadRepositoryContract $dadosPessoaisReadRepository = null,
        private readonly ?SiapeConsultaDadosPessoaisWriteRepositoryContract $dadosPessoaisWriteRepository = null,
        private readonly ?SiapeConsultaDadosFuncionaisWriteRepositoryContract $dadosFuncionaisWriteRepository = null,
        private readonly ?SiapeDadosUORGReadRepositoryContract $dadosUorgReadRepository = null,
        private readonly ?SiapeDadosUORGWriteRepositoryContract $dadosUorgWriteRepository = null,
        private readonly ?SiapeServidorBlacklistLifecycleService $servidorLifecycleService = null,
        private readonly ?SiapeBlacklistUnidadeWriteRepositoryContract $blacklistUnidadeWriteRepository = null,
    ) {
    }

    public function dadosServidor(): array
    {
        $results = $this->dadosPessoaisRead()->pendentesComDadosFuncionais();

        if ($results->isEmpty()) {
            return [];
        }


        $dadosServidorArray = [];
        $cpfsProcessados = [];

        foreach ($results as $servidor) {
            try {
                $dadosFuncionais = $this->processaDadosFuncionais($servidor->cpf, $servidor->responseDadosFuncionais);
                $dadosPessoais = $this->processaDadosPessoais($servidor->cpf, $servidor->responseDadosPessoais);
                $dadosServidorArray[] = [
                    'cpf' => $servidor->cpf,
                    'data_modificacao' => $this->previneDataNula($servidor),
                    'dadosPessoais' => $dadosPessoais,
                    'dadosFuncionais' => $dadosFuncionais,
                ];
                $cpfsProcessados[] = $servidor->cpf;
            } catch (ErrorDataSiapeException $e) {
                report($e);
                continue;
            } catch (Exception $e) {
                report($e);
                SiapeLog::error('Erro ao processar servidor SIAPE.', [
                    'cpf_final' => substr((string) $servidor->cpf, -4),
                    'exception' => $e::class,
                ]);
                continue;
            }
        }

        if (!empty($cpfsProcessados)) {
            $this->dadosPessoaisWrite()->markProcessados($cpfsProcessados);
            $this->dadosFuncionaisWrite()->markProcessados($cpfsProcessados);
        }
        return $dadosServidorArray;
    }

    private function previneDataNula(SiapeServidorPendenteDTO $servidor): string
    {
        return $servidor->dataModificacao ?? self::DATA_MODIFICACAO_PADRAO;
    }

    public function processaDadosPessoais(
        string $cpf,
        string $dadosPessoais
    ): array {
        try {
            $xmlResponse = $this->prepareResponseServidorXml($cpf, $dadosPessoais, TipoDadoServidorSiape::PESSOAL);

            $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
            $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
            $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

            $out = $xmlResponse->xpath('//ns1:consultaDadosPessoaisResponse/out');
            if (empty($out) || !isset($out[0])) {
                throw new ErrorDataSiapeException('Retorno vazio para consulta de dados pessoais');
            }
            $dadosPessoais = $out[0];
            $dadosPessoaisArray = $this->simpleXmlElementToArray($dadosPessoais);

            return $dadosPessoaisArray;
        } catch (Exception $e) {
            report($e);
            SiapeLog::error('Falha nos dados pessoais SIAPE.', ['cpf_final' => substr($cpf, -4)]);
            $tenantId = function_exists('tenant') ? (tenant('id') ?? 'central') : 'central';
            throw new ErrorDataSiapeException("Falha ao tratar dados pessoais do Siape, para informações detalhadas verificar storage/logs/laravel.log ou storage/logs/siape_{$tenantId}.log");
        }
    }

    public function processaDadosFuncionais(
        string $cpf,
        string $dadosFuncionais
    ): array {
        try {
            $dadosFuncionaisOrigem = $dadosFuncionais;
            $xmlResponse = $this->prepareResponseServidorXml($cpf, $dadosFuncionais, TipoDadoServidorSiape::FUNCIONAL);
            $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
            $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
            $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

            $dadosFuncionais = $xmlResponse->xpath('//tipo:DadosFuncionais');
            $dadosFuncionaisArray = $this->decideDadosFuncionais($dadosFuncionais);
            $this->servidorLifecycle()->reconciliarRetornoFuncional(
                $cpf,
                $this->obterMatriculasAtivas($dadosFuncionaisArray),
                $dadosFuncionaisOrigem,
            );

            return $dadosFuncionaisArray;
        } catch (Exception $e) {
            report($e);
            SiapeLog::error('Falha nos dados funcionais SIAPE.', ['cpf_final' => substr($cpf, -4)]);
            $tenantId = function_exists('tenant') ? (tenant('id') ?? 'central') : 'central';
            throw new ErrorDataSiapeException("Falha ao tratar dados funcionais do Siape, para informações detalhadas verificar storage/logs/laravel.log ou storage/logs/siape_{$tenantId}.log");
        }
    }

    public function processaDadosFuncionaisParaRelatorio(
        string $cpf,
        string $dadosFuncionais
    ): array {
        try {
            $xmlResponse = $this->prepareResponseXml($dadosFuncionais);
            $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
            $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
            $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

            $dadosFuncionaisElements = $xmlResponse->xpath('//tipo:DadosFuncionais') ?: [];

            return array_map(
                fn(SimpleXMLElement $dadosFuncionais) => $this->simpleXmlElementToArray($dadosFuncionais),
                $dadosFuncionaisElements
            );
        } catch (Exception $e) {
            report($e);
            SiapeLog::error('Falha nos dados funcionais SIAPE para relatório.', ['cpf_final' => substr($cpf, -4)]);
            $tenantId = function_exists('tenant') ? (tenant('id') ?? 'central') : 'central';
            throw new ErrorDataSiapeException("Falha ao tratar dados funcionais do Siape para relatorio, para informações detalhadas verificar storage/logs/laravel.log ou storage/logs/siape_{$tenantId}.log");
        }
    }

    private function decideDadosFuncionais(array $dadosfuncionaisArray): array
    {
        if (count($dadosfuncionaisArray) == 1) {
            return [$this->simpleXmlElementToArray($dadosfuncionaisArray[0])];
        }

        $retorno = [];
        foreach ($dadosfuncionaisArray as $dadosFuncionais) {
            $dados = $this->simpleXmlElementToArray($dadosFuncionais);
            if (!empty($dados['dataOcorrExclusao'])) continue;

            array_push($retorno, $dados);
        }
        return $retorno;
    }

    private function obterMatriculasAtivas(array $dadosFuncionaisArray): array
    {
        return collect($dadosFuncionaisArray)
            ->map(function ($dados) {
                if (is_array($dados)) {
                    return $dados['matriculaSiape'] ?? null;
                }
                return null;
            })
            ->filter()
            ->unique()
            ->values()
            ->all();
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
        $response = $this->dadosUorgRead()->pendentes(CodigoOrgaoService::atual());

        if ($response->isEmpty()) {
            return [];
        }
        $dadosUorgArray = [];
        foreach ($response as $dadosUnidades) {
            try {
                $dadosUorg = $this->processaDadosUorg($dadosUnidades->codigo, (string) $dadosUnidades->response);
            } catch (Exception $e) {
                report($e);
                SiapeLog::error('Erro ao processar XML da Unidade.', ['exception' => $e::class]);
                continue;
            }

            if (is_null($dadosUorg)) {
                SiapeLog::error('Retorno nulo ao processar XML da Unidade.');
                continue;
            }

            app(SiapeUnidadeLifecycleService::class)->reativarUnidadeEncontradaNoSiape(
                (string) $dadosUnidades->codigo,
                (string) $dadosUnidades->codigo_orgao
            );

            $dadosUorgArray[] = [
                'data_modificacao' => $dadosUnidades->data_modificacao,
                'dados' => $this->simpleXmlElementToArray($dadosUorg)
            ];

            $this->dadosUorgWrite()->markProcessado((string) $dadosUnidades->id);
        }

        return $dadosUorgArray;
    }

    public function processaDadosUorg(string $codigo, $dados): SimpleXMLElement|null
    {
        try {
            $responseXml = $this->prepareResponseUorgXml($codigo, $dados);
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


    private function prepareResponseServidorXml(
        string $cpf,
        string $response,
        TipoDadoServidorSiape $tipoDado = TipoDadoServidorSiape::FUNCIONAL,
    ): SimpleXMLElement
    {
        $responseXml = $this->prepareResponseXml($response);
        (new SiapeServidorFaultProcessor(
            $responseXml,
            $cpf,
            $response,
            $tipoDado->name,
            $tipoDado === TipoDadoServidorSiape::FUNCIONAL,
        ))->process();

        return $responseXml;
    }

    public function prepareResponseUorgXml(string $codigo, string $response): SimpleXMLElement
    {
        $responseXml = $this->prepareResponseXml($response);

        $fault = $responseXml->xpath('//soap:Fault');

        if (
            $fault && isset($fault[0]->faultcode) && (string) $fault[0]->faultcode === Erros::faultcode
            && isset($fault[0]->faultstring)
            && (function () use ($fault) {
                $faultString = trim((string) $fault[0]->faultstring);
                $faultStrings = Erros::getFaultStringNaoExistemDados();
                $decoded = html_entity_decode($faultString, ENT_QUOTES | ENT_HTML5, 'UTF-8');
                return in_array($faultString, $faultStrings, true) || in_array($decoded, $faultStrings, true);
            })()
        ) {
            $codigoOrgao = CodigoOrgaoService::atual();
            $this->blacklistUnidadeWrite()->firstOrCreate($codigoOrgao, $codigo, $response);

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

    private function dadosPessoaisRead(): SiapeConsultaDadosPessoaisReadRepositoryContract
    {
        return $this->dadosPessoaisReadRepository ?? app(SiapeConsultaDadosPessoaisReadRepositoryContract::class);
    }

    private function dadosPessoaisWrite(): SiapeConsultaDadosPessoaisWriteRepositoryContract
    {
        return $this->dadosPessoaisWriteRepository ?? app(SiapeConsultaDadosPessoaisWriteRepositoryContract::class);
    }

    private function dadosFuncionaisWrite(): SiapeConsultaDadosFuncionaisWriteRepositoryContract
    {
        return $this->dadosFuncionaisWriteRepository ?? app(SiapeConsultaDadosFuncionaisWriteRepositoryContract::class);
    }

    private function dadosUorgRead(): SiapeDadosUORGReadRepositoryContract
    {
        return $this->dadosUorgReadRepository ?? app(SiapeDadosUORGReadRepositoryContract::class);
    }

    private function dadosUorgWrite(): SiapeDadosUORGWriteRepositoryContract
    {
        return $this->dadosUorgWriteRepository ?? app(SiapeDadosUORGWriteRepositoryContract::class);
    }

    private function servidorLifecycle(): SiapeServidorBlacklistLifecycleService
    {
        return $this->servidorLifecycleService ?? app(SiapeServidorBlacklistLifecycleService::class);
    }

    private function blacklistUnidadeWrite(): SiapeBlacklistUnidadeWriteRepositoryContract
    {
        return $this->blacklistUnidadeWriteRepository ?? app(SiapeBlacklistUnidadeWriteRepositoryContract::class);
    }
}
