<?php

namespace App\Services\API_PGD\Contracts;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\API_PGD\HttpSenderService;
use App\Models\ViewApiPgd;
use Illuminate\Database\Eloquent\SoftDeletingScope;

abstract class ExportarService
{
    public $token = null;

    public function __construct(private HttpSenderService $httpSender)
    {
    }

    public function setToken(string $token) {
        $this->token = $token;
        return $this;
    }

    public abstract function getEndpoint(JsonResource $dados): string;

    public function getIds($tipoAudit): array
    {
        return ViewApiPgd::where('tipo', $tipoAudit)
          ->withoutGlobalScope(SoftDeletingScope::class)
          ->pluck('id')
          ->toArray();
    }

    protected function alterarStatus(mixed $id, bool $status){
        //TODO alterar a tag no banco quando for sucesso ou não
    }

    abstract public function getResource($model): JsonResource;
    
    abstract public function getData();
    
    public function enviar(): void
    {
        $data = $this->getData();

        foreach ($data as $model) 
        {
            $resource = $this->getResource($model);

            $success = $this->httpSender->enviarDados($this->token, 
                $this->getEndpoint($resource), 
                json_decode($resource->toJson(), true)
            );

            if ($success) {
                echo 'Sucesso';
            }

            $this->alterarStatus($model->id, $success);
        }
    }

}
