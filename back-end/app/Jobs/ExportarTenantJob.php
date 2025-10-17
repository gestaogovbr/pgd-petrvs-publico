<?php

namespace App\Jobs;

use App\Exceptions\LogError;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Jobs\PGD\Tenant\ExportarParticipantesBatch;
use App\Jobs\PGD\Tenant\ExportarTrabalhosBatch;
use App\Models\Envio;
use App\Models\Tenant;
use App\Services\API_PGD\AuditSources\ParticipanteAuditSource;
use App\Services\API_PGD\AuthenticationService;
use App\Services\API_PGD\PgdService;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

class ExportarTenantJob implements ShouldQueue, ContratoJobSchedule
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, InteractsWithQueue;

    public $tries = 1;
    public $timeout = 60 * 60 * 2; //2h
    private $tenant;
    private Envio|null $envio = null;
    private AuthenticationService $authService;
    private ParticipanteAuditSource $participanteAuditSource;

    public function __construct(private readonly ?string $tenantId = null)
    {
        $this->queue = 'pgd_queue';
        $this->tenant = Tenant::find($tenantId);

        if ($tenantId) {
            $tenant = tenancy()->find($tenantId);
            tenancy()->initialize($tenant);

            $this->envio = new Envio;
            $this->envio->sucesso = false;
            $this->envio->save();

            Cache::put('pgd_tenantId', $this->tenant->id);
            Cache::put('pgd_autorizadora', $this->tenant->api_cod_unidade_autorizadora);
            Cache::put('pgd_url', $this->tenant->api_url);
            Cache::put('pgd_envioId', $this->envio->id);
            Cache::put('pgd_envioNumero', $this->envio->numero);
        }
    }

    public function displayName()
    {
        return "Exportar {$this->tenant->id}";
    }

    public static function getDescricao(): string
    {
        return "Enviar para API do PGD";
    }

    public function handle(
        PgdService $pgdService,
        ExportarParticipantesBatch $exportarParticipantesBatch
    ) {
        ini_set('memory_limit', '-1');

        Log::info("Exportação do Tenant ".$this->tenant->id);

        try{
            $pgdService->authenticate($this->tenant->id);

            //$exportarParticipantesBatch->setEnvio($this->envio);
            // $exportarParticipantesBatch->setTenant($this->tenant);
            $exportarParticipantesBatch->send();
        } catch (Throwable $e) {

            tenancy()->end();

            $message = "[{$this->tenant->id}] [{$this->envio->numero}] Erro: " . $e->getMessage();
            Log::error($message);

            $tenant = tenancy()->find($this->tenant->id);
            tenancy()->initialize($tenant);

            $this->envio->erros = $e->getMessage();
            $this->envio->finished_at = now();
            $this->envio->save();

            LogError::newError($message);

            $this->fail($e);
        }
    }

    public function tags()
    {
        return [
            'tenant ' . $this->tenant->id,
            'envio #'. $this->envio?->numero
        ];
    }

    public function failed(?Throwable $exception): void
    {
        Log::error("Falha ao executar ExportarTenantJob: ".$exception->getMessage().'. Job abortado');

        if ($this->envio) {
            $this->envio->erros = $exception->getMessage();
            $this->envio->finished_at = now();
            $this->envio->save();
        }
    }
}
