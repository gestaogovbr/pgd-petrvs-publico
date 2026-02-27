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
    public bool $reagendado = false;
    protected ?PgdService $pgdService;

    /*
        @tenantId: ID do Tenant
        @id: ID do item a ser exportado
        @timestamp: Timestamp do agendamento. Usado para evitar envio de itens defasados
    */
    public function __construct(protected string $tenantId, protected string $id, protected $origem = '', protected $execucoes = 1)
    {
        $this->queue = 'pgd_queue';
        $this->connection = 'rabbitmq';

        $tenant = tenancy()->find($tenantId);
        tenancy()->initialize($tenant);

        $model = $this->getModel()->first();
        $model->data_agendamento_envio = Carbon::now();
        $model->saveQuietly();

        $this->timestamp = $model->data_agendamento_envio;
    }

    abstract public function getModel();

    abstract public function getResource(): JsonResource;

    abstract public function tag();

    protected function logInfo($message) {
        Log::info("ENVIO [{$this->tenantId}] ".$this->tag()." #{$this->id} - {$message}".($this->origem ? " (Origem: {$this->origem})" : ''));
    }

    protected function logError($message) {
        Log::error("ENVIO [{$this->tenantId}] ".$this->tag()." #{$this->id} - {$message}".($this->origem ? " (Origem: {$this->origem})" : ''));
    }

    public function handle(PgdService $pgdService)
    {
        $this->pgdService = $pgdService;

        if (Cache::get("api_down")) {
            $this->insucesso("Tentativa de envio reagendada devido API estar indisponível");
            $this->reagendar();
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

            $success = $this->enviar($resource);

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
            $this->reagendar();
            return;
        } catch(Throwable $exception) {
            $this->insucesso($exception->getmessage());
            $this->fail($exception);
        }
    }

    abstract public function enviar(JsonResource $resource): bool;

    public function registrarTentativa() {
        $model = $this->getModel()->first();
        $model->data_tentativa_envio = Carbon::now();
        $model->saveQuietly();
    }

    public function sucesso() {
        $model = $this->getModel()->first();
        $model->data_envio_api_pgd = Carbon::now();
        $model->log_envio = null;
        $model->saveQuietly();

        $this->logInfo("SUCESSO");
    }

    public function insucesso($message) {
        $this->logError($message);

        $model = $this->getModel()->first();
        $model->data_tentativa_envio = Carbon::now();
        $model->log_envio = $message;
        $model->saveQuietly();
    }

    public function tags()
    {
        $tags = [
            $this->tenantId,
            $this->id,
            'Execução '.$this->execucoes,
        ];

        if ($this->reagendado) {
            $tags[] = 'Reagendado';
        }

        return $tags;
    }

    public function failed(?Throwable $exception): void {
        $this->insucesso($exception->getMessage());
    }

    public function reagendar() {
        $this->reagendado = true;
        dispatch(new static($this->tenantId, $this->id, $this->origem, $this->execucoes + 1))
            ->delay(now()->addSeconds(300))
            ->onConnection('rabbitmq')
            ->onQueue('pgd_queue');
    }
}
