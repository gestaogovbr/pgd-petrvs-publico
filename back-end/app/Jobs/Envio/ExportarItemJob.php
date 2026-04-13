<?php

namespace App\Jobs\Envio;

use App\Exceptions\TokenPgdException;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Repository\Interfaces\EnvioRepositoryInterface;
use App\Services\API_PGD\PgdService;
use Carbon\Carbon;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\TimeoutExceededException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * @phpstan-consistent-constructor
 */
abstract class ExportarItemJob implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable;

    protected const CIRCUIT_BREAKER_TIMEOUT = 300; // 5 minutos
    protected $timestamp = null;
    public bool $reagendado = false;
    public int $timeout = 30;
    public $tries = 1;

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

        //$tenant = tenancy()->find($tenantId);
        //tenancy()->initialize($tenant);

        $model = $this->getRepository()->findById($this->id);
        $dataAgendamento = Carbon::now();
        if ($model !== null) {
            $this->getRepository()->agendarEnvio($model, $dataAgendamento);
        }

        $this->timestamp = $dataAgendamento;
    }

    public function getModel(): ?Model {
        return $this->getRepository()->findOneParaEnvio($this->id);
    }

    abstract public function getRepository(): EnvioRepositoryInterface;

    abstract public function getResource(): JsonResource;

    abstract public function tag();

    protected function logInfo($message) {
        Log::info("ENVIO [{$this->tenantId}] ".$this->tag()." #{$this->id} - {$message}".($this->origem ? " (Origem: {$this->origem}, Tentativa: {$this->execucoes})" : ''));
    }

    protected function logError($message) {
        Log::error("ENVIO [{$this->tenantId}] ".$this->tag()." #{$this->id} - {$message}".($this->origem ? " (Origem: {$this->origem}, Tentativa: {$this->execucoes})" : ''));
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
            /** @var Usuario|PlanoEntrega|PlanoTrabalho $model */
            $model = $this->getModel();

             if (!$model) {
                $this->logInfo("Item não encontrado para envio.");
                return;
            }

            if ($this->timestamp && $this->timestamp->lt($model->data_agendamento_envio)) {
                $this->logInfo("Ignorando envio defasado.");
                return;
            }

            $this->registrarTentativa($model);

            $resource = $this->getResource();

            $success = $this->enviar($resource);

            if ($success) {
                $this->sucesso();
            } else {
                $this->logError('Erro no envio!');
                Log::info($resource->toArray(request()));
            }

            unset($resource);

        } catch(TokenPgdException $e) {
            Cache::put('api_down', true, self::CIRCUIT_BREAKER_TIMEOUT); // circuit breaker
            $this->insucesso($e->getmessage());
            $this->logInfo('nova tentativa em 5 minutos');
            $this->reagendar();
            return;
        } catch(Throwable $exception) {
            $this->logError($exception->getmessage());
            $repository = $this->getRepository();
            if (!$model) {
                $model = $repository->findById($this->id);
                $repository->registrarConclusao($model, $exception->getmessage());
            }
            throw $exception;
        }
    }

    abstract public function enviar(JsonResource $resource): bool;

    public function registrarTentativa(Model $model): void
    {
        $this->getRepository()->registrarTentativa($model);
    }

    public function sucesso() {
        $model = $this->getModel();
        if ($model === null) {
            $this->logError('Modelo não encontrado ao registrar sucesso de envio.');
            return;
        }

        $this->getRepository()->registrarSucesso($model);

        $this->logInfo("SUCESSO");
    }

    public function insucesso($message) {
        $this->logError($message);

        $model = $this->getModel();
        if ($model === null) {
            return;
        }

        $this->getRepository()->registrarInsucesso($model, $message);
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

        if ($exception instanceof TimeoutExceededException) {
            $this->logInfo('Timeout excedido. Nova tentativa em 5 minutos');
            $this->reagendar();
        }
    }

    public function reagendar() {
        $this->reagendado = true;
        dispatch(new static($this->tenantId, $this->id, $this->origem, $this->execucoes + 1))
            ->delay(now()->addSeconds(300))
            ->onConnection('rabbitmq')
            ->onQueue('pgd_queue_delay');
    }
}
