<?php

namespace App\Services\API_PGD\Export;

use App\Exceptions\ExportPgdException;
use App\Exceptions\LogError;
use App\Services\API_PGD\DataSources\DataSource;
use App\Services\API_PGD\ExportSource;
use App\Services\API_PGD\PgdService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

abstract class ExportarService
{
    public $token = null;

    public Collection $source;

    public function __construct(
        private PgdService $pgdService
    ) {}

    public function setToken(string $token) {
        $this->token = $token;
        return $this;
    }

    public function load($source) {
        if (!$source instanceof Collection) {
            $this->source = collect([$source]);
        } else {
            $this->source = $source;
        }
        return $this;
    }

    public abstract function getEndpoint($dados): string;

    protected function alterarStatus(mixed $id, bool $status){
        //TODO alterar a tag no banco quando for sucesso ou não
    }

    abstract public function getResource($model): JsonResource;
    
    abstract public function getDataSource(): DataSource;
    
    public function enviar(): void
    {
        $dataSource = $this->getDataSource();

        foreach ($this->source as $source)
        {
            echo "\n[{$source->tipo}] ID {$source->id} [INICIADO]";

            try {
                $data = $dataSource->getData($source);

                $this->sendDependencia($data);

                $resource = $this->getResource($data);

                $body = (object) json_decode($resource->toJson(), true);

                $success = $this->pgdService->enviarDados(
                    $this->token, 
                    $this->getEndpoint($body), 
                    $body
                ); 

                if ($success) {
                    $this->handleSucesso($source);
                } else {
                    $this->handleError('Erro no envio!', $source);
                }

            }catch(ExportPgdException $exception) {
                $this->handleError($exception->getmessage(), $source);
                continue;
            }
        }
    }

    public function sendDependencia($data) {
        return true;
    }

    public function handleError($message, ExportSource $source) {
        
        
        echo "\n[{$source->tipo}] ID {$source->id} [\033[31mERRO\033[0m]";
        echo "\nMensagem: ".$message."\n";

        if (!$source || !$source->auditIds) {
            LogError::newError(
                "Erro ao sincronizar com o PGD:", 
                new ExportPgdException($message),
                $source
            );
            return false;
        }

        try{
            DB::table('audits')
                ->whereIn('id', $source->auditIds)
                ->update(
                    [
                        'tags' => json_encode(['ERRO']),
                        'error_message' => $message
                    ]
                );
            } catch(\Exception $exception) {
                LogError::newError("Erro atualizar audit:", $exception, $source);
            }
    }

    abstract public function atualizarEntidade($id);

    public function handleSucesso(ExportSource $source) {

        $this->atualizarEntidade($source->id);

        if ($source->auditIds) 
        {
            DB::table('audits')
                ->whereIn('id', $source->auditIds)
                ->update([
                    'tags' => json_encode(['SUCESSO']),
                    'error_message' => null
                ]);
        }

        echo "\n[{$source->tipo}] ID {$source->id} [\033[32mSUCESSO\033[0m]";
    }

}
