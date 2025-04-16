<?php

namespace App\Services\Siape;

use App\Services\Siape\BuscarDados\BuscarDadosSiape;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use Exception;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;

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
     * @return SimpleXMLElement[]
     */
    public function buscaServidor(string $cpf): array
    {
        $cpf = preg_replace('/[^0-9]/', '', $cpf);
        $this->inicializaSiape('buscaServidor');
        $codOrgao = strval(intval($this->configIntegracaoSiape['codOrgao']));

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
        // Log::info('======BODE======', [$retornoFuncionais]);
        // Log::info('XML Funcional', [$xmlFuncional]);

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

        $out = isset($xmlPessoal->xpath('//out')[0]) ? $xmlPessoal->xpath('//out')[0] : $xmlPessoal->xpath('//out'); 

        $newXmlPessoal = new SimpleXMLElement('<out/>');

            $fieldsToKeep = ['nome', 'dataNascimento'];

            foreach ($fieldsToKeep as $field) {
                if (isset($out->$field)) {
                    $newXmlPessoal->addChild($field, (string) $out->$field);
                }
            }

        return [
            $xmlFuncional,
            $newXmlPessoal
        ];
    }
}
