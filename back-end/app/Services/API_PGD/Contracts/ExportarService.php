<?php

namespace App\Services\API_PGD;

use App\Services\API_PGD\Contracts\IExportarService;

abstract class ExportarService implements IExportarService
{
    public function __construct(private HttpSenderService $httpSender)
    {
    }

    public function enviar($token, $dados): void
    {
        $body = $dados['mock'] ? $this->getBodyMock($dados) : $this->getBody($dados);

         $this->httpSender->enviarDados($token, $this->getEndpoint($dados), $body);
    }

    public abstract function getBody($dados): array;


    public abstract function getEndpoint(array $dados): string;
    

    public abstract function getBodyMock($dados): array;
    

}
