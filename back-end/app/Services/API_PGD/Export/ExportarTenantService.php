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

class ExportarTenantService
{
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

        $envio = new Envio;
        $envio->save();

        try {

            if (!$tenant['api_username'] or !$tenant['api_password']) {
                $errorMsg = 'Usuário ou senha da API PGD não definidos no Tenant '.$tenantId;
                LogError::newError($errorMsg);
                $envio->erros = 'Usuário ou senha da API PGD não definidos';
                $envio->finished_at = now();
                $envio->save();
                throw new ExportPgdException($errorMsg);
            }

            $token = $this->authService->authenticate($tenantId, $tenant['api_username'], $tenant['api_password']);

            $this->exportarParticipanteService
                ->setToken($token)
                ->setEnvio($envio)
                ->load($this->participanteAuditSource->getData())
                ->enviar();

            $this->exportarPlanoEntregasService
                ->setToken($token)
                ->setEnvio($envio)
                ->load($this->planoEntregaAuditSource->getData())
                ->enviar();
            
            $this->exportarPlanoTrabalhoService
                ->setToken($token)
                ->setEnvio($envio)
                ->load($this->planoTrabalhoAuditSource->getData())
                ->enviar();

            $envio->finished_at = now();
            $envio->sucesso = true;
            $envio->save();
        
        } catch (\Exception $exception) {
            $envio->erros = $exception->getMessage();
            $envio->finished_at = now();
            $envio->save();
            
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
        echo "\n\n** FINALIZADO!\n\n";

        echo "\033[32mParticipantes\033[0m ".
            "\nSucedidos: ". $this->exportarParticipanteService->getSucessos().
            "\nFalhas: ". $this->exportarParticipanteService->getFalhas().
            "\n\n\033[32mPlanos de Entrega\033[0m ". 
            "\nSucedidos: ". $this->exportarPlanoEntregasService->getSucessos().
            "\nFalhas: ". $this->exportarPlanoEntregasService->getFalhas().
            "\n\n\033[32mPlanos de Trabalho\033[0m ". 
            "\nSucedidos: ". $this->exportarPlanoTrabalhoService->getSucessos().
            "\nFalhas: ". $this->exportarPlanoTrabalhoService->getFalhas().
            "\n\n";
    }
}
