<?php

namespace App\Services\Siape;

use App\Services\Siape\BuscarDados\BuscarDadosSiape;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use Exception;
use SimpleXMLElement;

trait DadosExternosSiape
{

    protected BuscarDadosSiape|BuscarDadosSiapeServidor $siapeClassBuscaDados;
    protected $configIntegracaoSiape;


    protected function inicializaSiape($method)
    {
        $this->configIntegracaoSiape = config("integracao")["siape"];

        $this->siapeClassBuscaDados = match ($method) {
            'buscaServidor' => new BuscarDadosSiapeServidor($this->configIntegracaoSiape),
        };
    }

    public function buscaServidor(string $cpf): SimpleXMLElement
    {
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
