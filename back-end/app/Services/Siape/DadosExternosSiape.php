<?php

namespace App\Services\Siape;

use App\Services\Siape\BuscarDados\BuscarDadosSiape;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\SiapeServidorFaultProcessor;
use Exception;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use function simpleXmlElementToArray;

trait DadosExternosSiape
{

    protected BuscarDadosSiape|BuscarDadosSiapeServidor|BuscarDadosSiapeUnidade $siapeClassBuscaDados;
    protected $configIntegracaoSiape;


    protected function inicializaSiape($method)
    {
        $this->configIntegracaoSiape = config("integracao")["siape"];

        $this->siapeClassBuscaDados = match ($method) {
            'buscaServidor' => new BuscarDadosSiapeServidor($this->configIntegracaoSiape),
            'buscaDadosUnidade' => new BuscarDadosSiapeUnidade($this->configIntegracaoSiape),
        };
    }

    public function buscaDadosUnidade(string $codigoSiape): SimpleXMLElement
    {
        $this->inicializaSiape('buscaDadosUnidade');
        $codOrgao = strval(intval($this->configIntegracaoSiape['codOrgao']));

        $xmlData =  $this->siapeClassBuscaDados->getUorgAsXml(
            $this->configIntegracaoSiape['siglaSistema'],
            $this->configIntegracaoSiape['nomeSistema'],
            $this->configIntegracaoSiape['senha'],
            $this->configIntegracaoSiape['cpf'],
            $codOrgao,
            $codigoSiape
        );

        $retorno = $this->siapeClassBuscaDados->buscaSincrona($xmlData);
        return $this->siapeClassBuscaDados->prepareResponseXml($retorno);
    }

    /**
     *
     * @param string $cpf
     * @return array [dadosFuncionais[], dadosPessoais]
     */
    public function buscaServidor(string $cpf): array
    {
        $cpf = preg_replace('/[^0-9]/', '', $cpf);
        $this->inicializaSiape('buscaServidor');
        $codOrgao = strval(intval($this->configIntegracaoSiape['codOrgao']));

        // Dados funcionais
        $xmlDataFuncionais = $this->siapeClassBuscaDados->consultaDadosFuncionais(
            $this->configIntegracaoSiape['siglaSistema'],
            $this->configIntegracaoSiape['nomeSistema'],
            $this->configIntegracaoSiape['senha'],
            $cpf,
            $codOrgao,
            $this->configIntegracaoSiape['parmExistPag'],
            $this->configIntegracaoSiape['parmTipoVinculo']
        );

        $retornoFuncionais = $this->siapeClassBuscaDados->buscaSincrona($xmlDataFuncionais);
        $xmlFuncional = $this->siapeClassBuscaDados->prepareResponseXml($retornoFuncionais);
        (new SiapeServidorFaultProcessor($xmlFuncional, $cpf, $retornoFuncionais, 'FUNCIONAL'))->process();

        // Tratar múltiplos dados funcionais seguindo ProcessaDadosSiapeBD
        $xmlFuncional->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xmlFuncional->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $xmlFuncional->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

        $dadosFuncionaisElements = $xmlFuncional->xpath('//tipo:DadosFuncionais') ?: [];
        $dadosFuncionaisArray = [];

        if (count($dadosFuncionaisElements) === 1) {
            $dadosFuncionaisArray = [simpleXmlElementToArray($dadosFuncionaisElements[0])];
        } else {
            foreach ($dadosFuncionaisElements as $df) {
                $dados = simpleXmlElementToArray($df);
                if (!empty($dados['dataOcorrExclusao'])) {
                    continue;
                }
                $dadosFuncionaisArray[] = $dados;
            }
        }

        // Dados pessoais (manter saída mínima necessária)
        $xmlDataPessoais = $this->siapeClassBuscaDados->consultaDadosPessoais(
            $this->configIntegracaoSiape['siglaSistema'],
            $this->configIntegracaoSiape['nomeSistema'],
            $this->configIntegracaoSiape['senha'],
            $cpf,
            $codOrgao,
            $this->configIntegracaoSiape['parmExistPag'],
            $this->configIntegracaoSiape['parmTipoVinculo']
        );

        $retornoPessoais = $this->siapeClassBuscaDados->buscaSincrona($xmlDataPessoais);
        $xmlPessoal = $this->siapeClassBuscaDados->prepareResponseXml($retornoPessoais);
        (new SiapeServidorFaultProcessor($xmlPessoal, $cpf, $retornoPessoais, 'PESSOAL'))->process();

        $outNodes = $xmlPessoal->xpath('//out');
        $out = isset($outNodes[0]) ? $outNodes[0] : null;
        $dadosPessoaisArray = [];

        if ($out instanceof SimpleXMLElement) {
            $todosCampos = simpleXmlElementToArray($out);
            foreach (['nome', 'dataNascimento'] as $field) {
                if (array_key_exists($field, $todosCampos)) {
                    $dadosPessoaisArray[$field] = $todosCampos[$field];
                }
            }
        }

        return [
            $dadosFuncionaisArray,
            $dadosPessoaisArray
        ];
    }
}
