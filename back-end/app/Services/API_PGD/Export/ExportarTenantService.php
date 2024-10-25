<?php

namespace App\Services\API_PGD\Export;

use App\Exceptions\ExportPgdException;
use App\Exceptions\LogError;
use App\Exceptions\UnauthorizedException;
use App\Models\Envio;
use App\Models\Tenant;
use App\Services\API_PGD\AuditSources\PlanoTrabalhoAuditSource;
use App\Services\API_PGD\AuditSources\PlanoEntregaAuditSource;
use App\Services\API_PGD\AuditSources\ParticipanteAuditSource;
use App\Services\API_PGD\AuthenticationService;
use Illuminate\Support\Facades\Log;

class ExportarTenantService
{
    private $envio;

    public function __construct(
        private readonly AuthenticationService $authService,
        private readonly PlanoTrabalhoAuditSource   $planoTrabalhoAuditSource,
        private readonly ParticipanteAuditSource    $participanteAuditSource,
        private readonly PlanoEntregaAuditSource   $planoEntregaAuditSource,
        private readonly ExportarPlanoTrabalhoService $exportarPlanoTrabalhoService,
        private readonly ExportarPlanoEntregasService $exportarPlanoEntregasService,
        private readonly ExportarParticipanteService $exportarParticipanteService,
    ) {
    }

    public function exportar(string $tenantId)
    {
        $tenant = Tenant::find($tenantId) ?? throw new UnauthorizedException('Tenant não encontrado');

        $tenant = tenancy()->find($tenantId);
        tenancy()->initialize($tenant);

        $this->envio = new Envio;
        $this->envio->save();

        try {

            if (!$tenant['api_username'] or !$tenant['api_password']) {
                $errorMsg = 'Usuário ou senha da API PGD não definidos no Tenant '.$tenantId;
                LogError::newError($errorMsg);
                $this->envio->erros = 'Usuário ou senha da API PGD não definidos';
                $this->envio->finished_at = now();
                $this->envio->save();
                throw new ExportPgdException($errorMsg);
            }

            $token = $this->authService->authenticate($tenantId, $tenant['api_username'], $tenant['api_password']);

            $this->exportarParticipanteService
                ->setToken($token)
                ->setEnvio($this->envio)
                ->load($this->participanteAuditSource->getData())
                ->enviar();

            $this->exportarPlanoEntregasService
                ->setToken($token)
                ->setEnvio($this->envio)
                ->load($this->planoEntregaAuditSource->getData())
                ->enviar();
            
            $this->exportarPlanoTrabalhoService
                ->setToken($token)
                ->setEnvio($this->envio)
                ->load($this->planoTrabalhoAuditSource->getData())
                ->enviar();

            $this->envio->finished_at = now();
            $this->envio->sucesso = true;
            $this->envio->save();
        
        } catch (\Exception $exception) {
            $this->envio->erros = $exception->getMessage();
            $this->envio->finished_at = now();
            $this->envio->save();
            
            LogError::newError(
                "Erro ao sincronizar com o PGD: ", 
                new ExportPgdException($exception->getMessage())
            );

            throw $exception;
        }

        tenancy()->end();
        
        $this->finalizar();
    }

    public function finalizar() {

        Log::info("** RESULTADOS **");
        Log::info("Participantes com sucesso: ".$this->exportarParticipanteService->getSucessos());
        Log::info("Participantes com Falhas: ".$this->exportarParticipanteService->getFalhas());
        Log::info("Planos de Entrega com sucesso: ".$this->exportarPlanoEntregasService->getSucessos());
        Log::info("Planos de Entrega com falhas: ".$this->exportarPlanoEntregasService->getFalhas());
        Log::info("Planos de Trabalho com sucesso: ".$this->exportarPlanoTrabalhoService->getSucessos());
        Log::info("Planos de Trabalho com falhas: ".$this->exportarPlanoTrabalhoService->getFalhas());
        Log::info("** FINALIZADO!");

        $this->envio->erros = 'Finalizado com sucesso';
        $this->envio->finished_at = now();
        $this->envio->save();
    }
}
