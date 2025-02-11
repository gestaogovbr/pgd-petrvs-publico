<?php

namespace App\Services\Siape;

use App\Services\Siape\BuscarDados\BuscarDadosSiape;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use Exception;
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
            $this->getCpf(),
            $codOrgao,
            $codigoSiape
        );

        $retorno = $this->siapeClassBuscaDados->buscaSincrona($xmlData);
        return $this->siapeClassBuscaDados->prepareResponseXml($retorno);
    }

    public function buscaServidor(string $cpf): SimpleXMLElement
    {
        $cpf = preg_replace('/[^0-9]/', '', $cpf);
        $this->inicializaSiape('buscaServidor');
        $codOrgao = strval(intval($this->configIntegracaoSiape['codOrgao']));

        $xmlData = $this->siapeClassBuscaDados->consultaDadosFuncionais(
            $this->configIntegracaoSiape['siglaSistema'],
            $this->configIntegracaoSiape['nomeSistema'],
            $this->configIntegracaoSiape['senha'],
            $cpf,
            $codOrgao,
            $this->configIntegracaoSiape['parmExistPag'],
            $this->configIntegracaoSiape['parmTipoVinculo']
        );

        $retorno = $this->siapeClassBuscaDados->buscaSincrona($xmlData);
        return $this->siapeClassBuscaDados->prepareResponseXml($retorno);
    }
}
