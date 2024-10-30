<?php

namespace App\Jobs\PGD;

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

    private $tenantId;
    private $token;
    private Envio $envio;
    private AuthenticationService $authService;
    private ParticipanteAuditSource $participanteAuditSource;
    private PlanoEntregaAuditSource $planoEntregaAuditSource;
    private PlanoTrabalhoAuditSource $planoTrabalhoAuditSource;

    public function __construct($tenantId)
    {
        $this->queue = 'pgd_queue';
        $this->tenantId = $tenantId;
    }

    public static function getDescricao(): string
    {
        return "Enviar Dados do Tenant para API do PGD";
    }

    public function handle(
        AuthenticationService $authService,
        PlanoTrabalhoAuditSource $planoTrabalhoAuditSource,
        ParticipanteAuditSource $participanteAuditSource,
        PlanoEntregaAuditSource $planoEntregaAuditSource,
        ExportarParticipantesBatch $exportarParticipantesBatch
    ) {
        Log::info("Exportação do Tenant ".$this->tenantId);
       
        $this->envio = new Envio;
        $this->authService = $authService;
        $this->planoTrabalhoAuditSource = $planoTrabalhoAuditSource;
        $this->participanteAuditSource = $participanteAuditSource;
        $this->planoEntregaAuditSource = $planoEntregaAuditSource;

        try{
            $this->autenticar();

            $exportarParticipantesBatch->setToken($this->token);
            $exportarParticipantesBatch->setEnvio($this->envio);
            $exportarParticipantesBatch->setTenantId($this->tenantId);
            $exportarParticipantesBatch->send();
        } catch (Exception $e) {
            tenancy()->end();

            Log::error("Erro ao processar Tenant {$this->tenantId} interrompida! Erro: " . $e->getMessage());

            $tenant = tenancy()->find($this->tenantId);
            tenancy()->initialize($tenant);

            $this->envio->erros = $e->getMessage();
            $this->envio->finished_at = now();
            $this->envio->save();            
            
            LogError::newError("Erro ao processar Tenant {$this->tenantId} interrompida! Erro: " . $e->getMessage());  

            $this->fail();
        }
    }

    public function autenticar() {
        $tenantData = Tenant::find($this->tenantId);

        $tenant = tenancy()->find($this->tenantId);
        tenancy()->initialize($tenant);

        $this->envio->save();

        if (!$tenantData['api_username'] or !$tenantData['api_password']) {
            $errorMsg = 'Usuário ou senha da API PGD não definidos no Tenant '.$this->tenantId;
            LogError::newError($errorMsg);
            $this->envio->erros = 'Usuário ou senha da API PGD não definidos';
            $this->envio->finished_at = now();
            $this->envio->save();
            throw new ExportPgdException($errorMsg);
        }

        $this->token = $this->authService->authenticate($this->tenantId, $tenantData['api_username'], $tenantData['api_password']);
    }

    public function tags()
    {
        return [
            'tenant:' . tenant('id'),
        ];
    }
}
