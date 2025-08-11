<?php

namespace App\Jobs\PGD\Tenant;

use App\Exceptions\ExportPgdException;
use App\Exceptions\LogError;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\Envio;
use App\Models\EnvioItem;
use App\Models\Tenant;
use App\Services\API_PGD\DataSources\DataSource;
use App\Services\API_PGD\ExportSource;
use App\Services\API_PGD\PgdService;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

abstract class ExportarItemJob implements ShouldQueue, ContratoJobSchedule
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable;

    public $tries = 1;
    public $timeout = 120; //2m
    //protected Tenant $tenant;
    protected string $tenantId;
    protected int $jobNumber;
    protected string $url;
    protected string $token;
    protected string $api_cod_unidade_autorizadora;
    //protected Envio|null $envio = null;
    protected string $envioId = "";
    protected string $envioNumero;
    protected ExportSource $source;

    public function __construct(
        int $jobNumber,
        ExportSource $source
    ) {
        $this->queue = 'pgd_queue';

        $this->jobNumber = $jobNumber;
        // $this->token = $token;
        $this->tenantId = Cache::get('pgd_tenantId');
        $this->envioId = Cache::get('pgd_envioId');
        $this->envioNumero = Cache::get('pgd_envioNumero');
        $this->source = $source;
        $this->url = Cache::get('pgd_url');
        $this->api_cod_unidade_autorizadora = Cache::get('pgd_autorizadora');
    }

    public abstract function getEndpoint($dados): string;

    abstract public function getResource($model): JsonResource;

    abstract public function getDataSource(): DataSource;

    public function handle(PgdService $pgdService)
    {
        if ($this->batch()?->canceled()) {
            return;
        }

        Log::info("[{$this->tenantId}] ".$this->batch()->pendingJobs.'/'.$this->batch()->totalJobs);
        Log::info("[{$this->tenantId}] {$this->source->tipo} #{$this->source->id} [INICIADO] ");

        $envioItem = new EnvioItem;
        $envioItem->envio_id    = $this->envioId;
        $envioItem->tipo        = $this->source->tipo;
        $envioItem->uid         = $this->source->id;
        $envioItem->fonte       = $this->source->fonte;
        $envioItem->save();

        try {
            $data = $this->getDataSource()->getData($this->source);
            $resource = $this->getResource($data);

            unset($data);

            $body = (object) json_decode($resource->toJson(), true);
            $body->cod_unidade_autorizadora = $this->api_cod_unidade_autorizadora;

            unset($resource);

            $success = $pgdService->enviarDados(
                $this->tenantId,
                $this->url,
                $this->getEndpoint($body),
                $body
            );

            if ($success) {
                $this->handleSucesso($envioItem);
            } else {
                $this->handleError('Erro no envio!', $envioItem, $this->source);
                var_dump($body);
            }

            unset($body);

        }catch(ExportPgdException $exception) {
            $this->handleError($exception->getmessage(), $envioItem);
            $this->fail($exception);
            //throw $exception;
        }
    }

    public function addFalha() {}

    public function addSucesso() {}

    public function handleError($message, EnvioItem $envioItem)
    {
        Log::error("Erro: $message
            Tenant: {$this->tenantId}
            Tipo: {$this->source->tipo}
            ID: {$this->source->id}
            Fonte:  {$this->source->fonte}
            \n");

        $envioItem->sucesso = false;
        $envioItem->erros = $message;
        $envioItem->save();

        $this->addFalha();

        LogError::newError(
            "[{$this->tenantId}] Erro ao sincronizar com o PGD: ",
            new ExportPgdException($message),
            $this->source
        );

        if ($this->source->auditIds) {
            try{
                DB::table('audits')
                    ->whereIn('id', $this->source->auditIds)
                    ->update(
                        [
                            'tags' => json_encode(['ERRO']),
                            'error_message' => $message
                        ]
                    );
            } catch(\Throwable $exception) {
                Log::error("[{$this->tenantId}] Erro atualizar audit: ".$exception->getMessage());
                LogError::newError("[{$this->tenantId}] Erro atualizar audit: ", $exception, $this->source);
            }
        }
    }

    abstract public function atualizarEntidade($id);

    public function handleSucesso(EnvioItem $envioItem) {

        $envioItem->sucesso = true;
        $envioItem->save();

        $this->addSucesso();

        $this->atualizarEntidade($this->source->id);

        if ($this->source->auditIds)
        {
            DB::table('audits')
                ->whereIn('id', $this->source->auditIds)
                ->update([
                    'enviado' => true,
                    'error_message' => null
                ]);
        }

        Log::info("[{$this->tenantId}] {$this->source->tipo}: {$this->source->id} - SUCESSO");
    }

    abstract protected function getAuditableType();

    public function tags()
    {
        return [
            'tenant '.$this->tenantId,
            'envio #'.$this->envioNumero,
            'id: '.$this->source->id
        ];
    }

    public function failed(?Throwable $exception): void
    {
        Log::error("Falha no ExportarItemJob: ".$exception->getMessage());

        $envio = Envio::find($this->envioId);

        if ($envio) {
            $envio->erros = $exception->getMessage();
            $envio->finished_at = now();
            $envio->save();
        }
    }
}
