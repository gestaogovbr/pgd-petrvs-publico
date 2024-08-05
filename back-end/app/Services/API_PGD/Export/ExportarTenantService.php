<?php

namespace App\Services\API_PGD\Export;

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
        $token = $this->authService->authenticate($tenantId);

        $tenant = tenancy()->find($tenantId);
        tenancy()->initialize($tenant);

        /*$this->exportarParticipanteService
            ->setToken($token)
            ->load($this->participanteAuditSource->getData())
            ->enviar();*/

        
        $this->exportarPlanoTrabalhoService
            ->setToken($token)
            ->load($this->planoTrabalhoAuditSource->getData())
            ->enviar();
            
/*
        $this->exportarPlanoEntregasService
            ->setToken($token)
            ->load($this->planoEntregaAuditSource->getData())
            ->enviar();*/
        
        $this->finalizar();
    }

    public function finalizar() {
        echo "** FINALIZADO!\n";
    }
}
