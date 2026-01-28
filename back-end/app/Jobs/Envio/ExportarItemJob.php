<?php

namespace App\Jobs\Envio;

use App\Exceptions\TokenPgdException;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\API_PGD\PgdService;
use Carbon\Carbon;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

abstract class ExportarItemJob implements ShouldQueue, ContratoJobSchedule
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable;

    protected $timestamp = null;
    public int $execucoes = 1;
    public bool $reagendado = false;

    protected string $api_cod_unidade_autorizadora;

    /*
        @tenantId: ID do Tenant
        @id: ID do item a ser exportado
        @timestamp: Timestamp do agendamento. Usado para evitar envio de itens defasados
    */
    public function __construct(protected string $tenantId, protected string $id)
    {
        $this->queue = 'pgd_queue';

        $tenant = tenancy()->find($tenantId);
        tenancy()->initialize($tenant);

        $model = $this->getModel()->first();
        $model->data_agendamento_envio = Carbon::now();
        $model->saveQuietly();

        $this->timestamp = $model->data_agendamento_envio;
        $this->api_cod_unidade_autorizadora = $tenant->api_cod_unidade_autorizadora;
    }

    abstract public function getModel();

    abstract public function getResource(): JsonResource;

    abstract public function tag();

    protected function logInfo($message) {
        Log::info("[{$this->tenantId}] #{$this->id} - {$message}");
    }

    protected function logError($message) {
        Log::error("[{$this->tenantId}] #{$this->id} - {$message}");
    }

    public function handle(PgdService $pgdService)
    {
        $this->execucoes += 1;

        if (Cache::get("api_down")) {
            $this->logInfo("JOB adiado devido API PGD estar indisponível");
            $this->reagendado = true;
            $this->release(300);
            return;
        }

        $this->logInfo("INICIADO");

        $tenant = tenancy()->find($this->tenantId);
        tenancy()->initialize($tenant);

        try{
            $model = $this->getModel()->first();

            if ($this->timestamp && $this->timestamp->lt($model->data_agendamento_envio)) {
                $this->logInfo("Ignorando envio defasado.");
                return;
            }

            $this->registrarTentativa();

            $resource = $this->getResource();

            $success = $this->enviar(
                $pgdService,
                $resource
            );

            if ($success) {
                $this->sucesso();
            } else {
                $this->logError('Erro no envio!');
                var_dump($resource);
            }

            unset($body);
            unset($resource);

        } catch(TokenPgdException $e) {
            Cache::put('api_down', true, 120); // circuit breaker
            $this->insucesso($e->getmessage());
            $this->logInfo('nova tentativa em 5 minutos');
            $this->reagendado = true;
            $this->release(300);
           // $this->fail($e);
        } catch(Throwable $exception) {
            $this->insucesso($exception->getmessage());
            $this->fail($exception);
        }
    }

    abstract public function enviar(PgdService $pgdService,
                JsonResource $resource): bool;

    public function registrarTentativa() {
        $model = $this->getModel();
        $model->update(["data_tentativa_envio"=> Carbon::now()]);
    }

    public function sucesso() {
        $model = $this->getModel();
        $model->update([
            "data_envio_api_pgd"=> Carbon::now(),
            "log_envio" => null
        ]);
        $this->logInfo("SUCESSO");
    }

    public function insucesso($message) {
        $this->logError($message);

        $model = $this->getModel();
        $model->update([
            "data_tentativa_envio"=> Carbon::now(),
            "log_envio" => $message
        ]);
    }

    public function tags()
    {
        $tags = [
            'Envio',
            $this->tenantId,
            $this->tag(),
            $this->id,
            'Execução '.$this->execucoes,
        ];

        if ($this->reagendado) {
            $tags[] = 'Reagendado';
        }

        return $tags;
    }

    public function failed(?Throwable $exception): void {
        $mensagem = "Falha no ExportarItemJob: ".$exception->getMessage();
        $this->insucesso($mensagem);
    }
}
