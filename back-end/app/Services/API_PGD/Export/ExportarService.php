<?php

namespace App\Services\API_PGD\Export;

use App\Exceptions\ExportPgdException;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\API_PGD\PgdService;
use App\Services\API_PGD\Sources\DataSource;
use Illuminate\Support\Facades\DB;

abstract class ExportarService
{
    public $token = null;

    public function __construct(private PgdService $pgdService) {}

    public function setToken(string $token) {
        $this->token = $token;
        return $this;
    }

    public abstract function getEndpoint($dados): string;

    abstract public function getTipoAudit(): string;

    protected function alterarStatus(mixed $id, bool $status){
        //TODO alterar a tag no banco quando for sucesso ou não
    }

    abstract public function getResource($model): JsonResource;
    
    abstract public function getDataSource(): DataSource;
    
    public function enviar(): void
    {
        $dataSource = $this->getDataSource();

        $auditInfos = $dataSource->getAuditInfo();

        foreach ($auditInfos as $auditInfo)
        {
            echo "\n[{$auditInfo->tipo}] ID {$auditInfo->id}...";
            try {
                $data = $dataSource->getData($auditInfo);

                $resource = $this->getResource($data);

                $body = (object) json_decode($resource->toJson(), true);

                $success = $this->pgdService->enviarDados(
                    $this->token, 
                    $this->getEndpoint($body), 
                    $body
                );

                if ($success) {
                    $this->handleSucesso($auditInfo);
                } else {
                    $this->handleError($auditInfo, 'Erro no envio!');
                }

            }catch(ExportPgdException $exception) {
                $this->handleError($auditInfo, $exception->getmessage());
                continue;
            }
        }
    }

    abstract public function getAudits($id);

    public function handleError($auditInfo, $message) {
        
        echo "\033[31mERRO\033[0m ".$message."\n";

        if (!$auditInfo->json_audit) return false;

        $auditIds = json_decode($auditInfo->json_audit);

        DB::table('audits')
            ->whereIn('id', $auditIds)
            ->update(
                [
                    'tags' => json_encode(['ERRO']),
                    'error_message' => $message
                ]
            );
    }

    abstract public function atualizarEntidade($id);

    public function handleSucesso($auditInfo) {

        $this->atualizarEntidade($auditInfo->id);

        if ($auditInfo->json_audit) 
        {
            $auditIds = json_decode($auditInfo->json_audit);

            DB::table('audits')
                ->whereIn('id', $auditIds)
                ->update([
                    'tags' => json_encode(['SUCESSO']),
                    'error_message' => null
                ]);
        }

        echo "\033[32mSUCESSO\033[0m";
    }

}
