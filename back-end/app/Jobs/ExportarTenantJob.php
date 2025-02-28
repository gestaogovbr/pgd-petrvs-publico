<?php

namespace App\Jobs;

use App\Exceptions\ExportPgdException;
use Exception;
use App\Models\Envio;
use App\Models\Tenant;
use App\Exceptions\LogError;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Jobs\PGD\Tenant\ExportarParticipantesBatch;
use App\Jobs\PGD\Tenant\ExportarTrabalhosBatch;
use App\Services\API_PGD\AuditSources\ParticipanteAuditSource;
use App\Services\API_PGD\AuditSources\PlanoEntregaAuditSource;
use App\Services\API_PGD\AuditSources\PlanoTrabalhoAuditSource;
use App\Services\API_PGD\AuthenticationService;
use Illuminate\Support\Facades\Log;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Bus\Batchable;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Throwable;

class ExportarTenantJob implements ShouldQueue, ContratoJobSchedule
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, InteractsWithQueue; 

    public $tries = 1;
    public $timeout = 60 * 60 * 2; //2h
    private $tenant;
    private $token;
    private Envio|null $envio = null;
    private AuthenticationService $authService;
    private ParticipanteAuditSource $participanteAuditSource;
    private PlanoEntregaAuditSource $planoEntregaAuditSource;
    private PlanoTrabalhoAuditSource $planoTrabalhoAuditSource;

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
        }
    }

    public function displayName()
    {
        return "Exportar {$this->tenant->id}";
    }

    public static function getDescricao(): string
    {
        return "Enviar Tenant Individual para API do PGD";
    }

    /*public function middleware()
    {
        return [new WithoutOverlapping()];
    }*/

    public function handle(
        AuthenticationService $authService,
        ExportarParticipantesBatch $exportarParticipantesBatch,
        ExportarTrabalhosBatch $exportarTrabalhosBatch
    ) {
        ini_set('memory_limit', '-1');
        
        Log::info("Exportação do Tenant ".$this->tenant->id);

        $this->authService = $authService;

        try{
            $this->autenticar();

            $exportarParticipantesBatch->setToken($this->token);
            $exportarParticipantesBatch->setEnvio($this->envio);
            $exportarParticipantesBatch->setTenant($this->tenant);
            $exportarParticipantesBatch->send();

            /*$exportarTrabalhosBatch->setToken($this->token);
            $exportarTrabalhosBatch->setEnvio($this->envio);
            $exportarTrabalhosBatch->setTenant($this->tenant);
            $exportarTrabalhosBatch->send();*/
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

            $this->fail($message);
            // throw $e;
        }
    }

    public function autenticar() {
        $tenant = tenancy()->find($this->tenant->id);
        tenancy()->initialize($tenant);

        $this->envio->save();

        if (!$this->tenant['api_url']) {
            $errorMsg = 'Endereço URL da API PGD não definidos no Tenant '.$this->tenant->id;
            LogError::newError($errorMsg);
            $this->envio->erros = $errorMsg;
            $this->envio->finished_at = now();
            $this->envio->save();
            throw new ExportPgdException($errorMsg);
        }

        if (!$this->tenant['api_cod_unidade_autorizadora']) {
            $errorMsg = 'Unidade Autorizadora não definida no Tenant '.$this->tenant->id;
            LogError::newError($errorMsg);
            $this->envio->erros = $errorMsg;
            $this->envio->finished_at = now();
            $this->envio->save();
            throw new ExportPgdException($errorMsg);
        }

        if (!$this->tenant['api_username'] or !$this->tenant['api_password']) {
            $errorMsg = 'Usuário ou senha da API PGD não definidos no Tenant '.$this->tenant->id;
            LogError::newError($errorMsg);
            $this->envio->erros = 'Usuário ou senha da API PGD não definidos';
            $this->envio->finished_at = now();
            $this->envio->save();
            throw new ExportPgdException($errorMsg);
        }

        $this->token = $this->authService->authenticate($this->tenant, $this->tenant['api_username'], $this->tenant['api_password']);
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
