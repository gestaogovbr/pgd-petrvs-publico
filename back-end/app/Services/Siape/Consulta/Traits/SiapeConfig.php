<?php
namespace App\Services\Siape\Consulta\Traits;

trait SiapeConfig
{
    protected $config;
    protected string $codOrgao;
    protected string $url;
    protected string $cpf;
    protected string $client;
    protected string $secret;

    public function setConfig()
    {
        $this->config = config("integracao")["siape"];
        $this->codOrgao = strval(intval($this->config['codOrgao']));
        $this->url      = $this->config["url"];
        $this->cpf      = $this->config["cpf"];
        $this->client   = $this->config["conectagov_chave"];
        $this->secret   = $this->config["conectagov_senha"];
    }

    public function getUrl(): string
    {
        return $this->url;
    }
    

    public function getCpf(): string
    {
        return $this->cpf;
    }

    public function getParmExistPag() {
        return $this->config['parmExistPag'];
    }

    public function getParmTipoVinculo() {
        return $this->config['parmTipoVinculo'];
    }
}