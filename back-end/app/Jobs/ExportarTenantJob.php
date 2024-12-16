<?php

namespace App\Jobs;

use App\Exceptions\ExportPgdException;
use Exception;
use App\Models\Envio;
use App\Models\Tenant;
use App\Exceptions\LogError;
use App\Jobs\Contratos\ContratoJobSchedule;
use App\Jobs\PGD\Tenant\ExportarParticipantesBatch;
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
use Throwable;

class ExportarTenantJob implements ShouldQueue, ContratoJobSchedule
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable; 

    private $tenant;
    private $token;
    private Envio $envio;
    private AuthenticationService $authService;
    private ParticipanteAuditSource $participanteAuditSource;
    private PlanoEntregaAuditSource $planoEntregaAuditSource;
    private PlanoTrabalhoAuditSource $planoTrabalhoAuditSource;

    public function __construct(private readonly ?string $tenantId = null)
    {
        $this->queue = 'pgd_queue';
        $this->tenant = Tenant::find($tenantId);
    }

    public static function getDescricao(): string
    {
        return "Enviar Dados do Tenant para API do PGD";
    }

    public function handle(
        AuthenticationService $authService,
        ExportarParticipantesBatch $exportarParticipantesBatch
    ) {
        ini_set('memory_limit', '-1');
        
        Log::info("Exportação do Tenant ".$this->tenant->id);
       
        $this->envio = new Envio;
        $this->authService = $authService;

        try{
            $this->autenticar();

            $exportarParticipantesBatch->setToken($this->token);
            $exportarParticipantesBatch->setEnvio($this->envio);
            $exportarParticipantesBatch->setTenant($this->tenant);
            $exportarParticipantesBatch->send();
        } catch (Throwable $e) {
            tenancy()->end();

            Log::error("Erro ao processar Tenant {$this->tenant->id} interrompida! Erro: " . $e->getMessage());

            $tenant = tenancy()->find($this->tenant->id);
            tenancy()->initialize($tenant);

            $this->envio->erros = $e->getMessage();
            $this->envio->finished_at = now();
            $this->envio->save();            
            
            LogError::newError("Erro ao processar Tenant {$this->tenant->id} interrompida! Erro: " . $e->getMessage());  
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
            'tenant:' . $this->tenant->id,
        ];
    }
}
