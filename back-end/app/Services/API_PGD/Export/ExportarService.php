<?php

namespace App\Services\API_PGD\Export;

use App\Exceptions\ExportPgdException;
use App\Exceptions\LogError;
use App\Models\Envio;
use App\Models\EnvioItem;
use App\Services\API_PGD\DataSources\DataSource;
use App\Services\API_PGD\ExportSource;
use App\Services\API_PGD\PgdService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

abstract class ExportarService
{
    public $token = null;

    public Collection $source;

    public int $sucessos;
    public int $falhas;

    protected Envio $envio;

    public function __construct(
        private PgdService $pgdService
    ) {
        $this->sucessos = 0;
        $this->falhas = 0;
    }

    public function setToken(string $token) {
        $this->token = $token;
        return $this;
    }

    public function setEnvio(Envio $envio) {
        $this->envio = $envio;
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
            Log::info("[{$source->tipo}] ID {$source->id} [INICIADO]");

            $envioItem = new EnvioItem;
            $envioItem->envio_id    = $this->envio->id;
            $envioItem->tipo        = $source->tipo;
            $envioItem->uid         = $source->id;
            $envioItem->fonte       = $source->fonte;
            $envioItem->save();

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
                    $this->handleSucesso($envioItem, $source);
                } else {
                    $this->handleError('Erro no envio!', $envioItem, $source);
                    var_dump($body);
                }

            }catch(ExportPgdException $exception) {
                $this->handleError($exception->getmessage(), $envioItem, $source);
                continue;
            }
        }
        
    }

    public function sendDependencia($data) {
        return true;
    }

    public function handleError($message, EnvioItem $envioItem, ExportSource $source) 
    {
        Log::error("[{$source->tipo}] ID {$source->id} - ERRO!");
        Log::error("Mensagem: ".$message);

        $this->falhas++;

        LogError::newError(
            "Erro ao sincronizar com o PGD: ", 
            new ExportPgdException($message),
            $source
        );

        if ($source->auditIds) {
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
                Log::error("Erro atualizar audit: ".$exception->getMessage());
                LogError::newError("Erro atualizar audit: ", $exception, $source);
            }
        }
    }

    abstract public function atualizarEntidade($id);

    public function handleSucesso(EnvioItem $envioItem, ExportSource $source) {

        $envioItem->sucesso = true;
        $envioItem->save();

        $this->atualizarEntidade($source->id);

        $this->sucessos++;

        if ($source->auditIds) 
        {
            DB::table('audits')
                ->whereIn('id', $source->auditIds)
                ->update([
                    'tags' => json_encode(['SUCESSO']),
                    'error_message' => null
                ]);
        }

        Log::info("[{$source->tipo}] ID {$source->id} - SUCESSO");
    }

    public function getSucessos() {
        return $this->sucessos;
    }

    public function getFalhas() {
        return $this->falhas;
    }
}
