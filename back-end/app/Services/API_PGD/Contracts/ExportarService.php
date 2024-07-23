<?php

namespace App\Services\API_PGD;

use App\Services\API_PGD\Contracts\IExportarService;
use Illuminate\Http\Resources\Json\JsonResource;

abstract class ExportarService
{
    public function __construct(private HttpSenderService $httpSender)
    {
    }

    public abstract function enviar($token, array $ids) : void;

    public function enviarDados($token, JsonResource $dados): bool
    {

        return $this->httpSender->enviarDados($token, $this->getEndpoint($dados), $dados->toJson());
    }


    public abstract function getEndpoint(JsonResource $dados): string;


    protected function alterarStatus(mixed $id, bool $status){
        //TODO alterar a tag no banco quando for sucesso ou não
    }

}
