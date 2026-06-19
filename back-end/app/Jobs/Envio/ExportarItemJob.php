<?php

namespace App\Jobs\Envio;

use App\Exceptions\ExportPgdException;
use App\Exceptions\TokenPgdException;
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
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * @phpstan-consistent-constructor
 */
abstract class ExportarItemJob implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable;

    protected $timestamp = null;
    public int $timeout = 30;
    public int $tries = 1;

    protected ?PgdService $pgdService;

    private bool $agendamentoPersistido = false;

    /*
        @tenantId: ID do Tenant
        @id: ID do item a ser exportado
        @timestamp: Timestamp do agendamento. Usado para evitar envio de itens defasados
    */
    public function __construct(protected string $tenantId, protected string $id, protected $origem = '')
    {
        $this->queue = 'pgd_queue';
        $this->connection = 'rabbitmq';
        $this->timestamp = Carbon::now();

        if (tenancy()->initialized) {
            $this->persistirAgendamento();
        }
    }

    private function persistirAgendamento(): void
    {
        if ($this->agendamentoPersistido) {
            return;
        }

        $model = $this->getRepository()->findById($this->id);
        if ($model !== null) {
            $this->getRepository()->agendarEnvio($model, $this->timestamp);
            $this->agendamentoPersistido = true;
        }
    }

    public function getModel(): ?Model {
        return $this->getRepository()->findOneParaEnvio($this->id);
    }

    abstract public function getRepository(): EnvioRepositoryInterface;

    abstract public function getResource(): JsonResource;

    abstract public function tag();

    protected function logItemLabel(): string
    {
        return $this->tag().' #'.$this->id;
    }

    protected function logInfo(string $message) {
        Log::info("ENVIO [{$this->tenantId}] ".$this->logItemLabel()." - {$message}".($this->origem ? " (Origem: {$this->origem})" : ''));
    }

    protected function logError(string $message) {
        Log::error("ENVIO [{$this->tenantId}] ".$this->logItemLabel()." - {$message}".($this->origem ? " (Origem: {$this->origem})" : ''));
    }

    public function handle(PgdService $pgdService)
    {
        $this->pgdService = $pgdService;
        $this->initializeTenantContext();
        $this->persistirAgendamento();

        $this->logInfo("INICIADO");

        $model = null;

        try{
            /** @var Usuario|PlanoEntrega|PlanoTrabalho $model */
            $model = $this->getModel();

             if (!$model) {
                $this->logInfo("Item não encontrado para envio.");
                $modelIndisponivel = $this->getRepository()->findById($this->id);
                if ($modelIndisponivel !== null) {
                    $this->getRepository()->registrarLog($modelIndisponivel, 'Item não encontrado para envio.');
                }
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
            }

            unset($resource);

        } catch(TokenPgdException $e) {
            $this->insucesso($e->getmessage());
            return;
        } catch(Throwable $exception) {
            $this->logError($exception->getmessage());
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

        $model = $this->getModel() ?? $this->getRepository()->findById($this->id);
        if ($model === null) {
            return;
        }

        $this->getRepository()->registrarInsucesso($model, $message);
    }

    public function tags()
    {
        return [
            $this->tenantId,
            $this->id,
        ];
    }

    public function failed(?Throwable $exception): void {
        $this->initializeTenantContext();

        if ($exception instanceof TimeoutExceededException) {
            $this->insucesso($exception->getMessage() ?: 'Tempo de envio excedido');
            return;
        }

        if ($exception instanceof ExportPgdException) {
            $model = $this->getModel() ?? $this->getRepository()->findById($this->id);
            if ($model !== null) {
                $this->getRepository()->registrarConclusao($model, $exception->getMessage());
            }

            return;
        }

        $this->insucesso($exception?->getMessage() ?? 'Falha desconhecida no envio');
    }

    protected function initializeTenantContext(): void
    {
        $tenant = tenancy()->find($this->tenantId);
        if ($tenant === null) {
            return;
        }

        $tenantKey = (string) $tenant->getTenantKey();

        if (tenancy()->initialized && (string) tenant()->getTenantKey() === $tenantKey) {
            return;
        }

        if (tenancy()->initialized) {
            tenancy()->end();
        }

        tenancy()->initialize($tenant);
    }
}
