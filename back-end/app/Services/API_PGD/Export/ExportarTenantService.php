<?php

namespace App\Services\API_PGD\Export;

use App\Services\API_PGD\AuthenticationService;

class ExportarTenantService
{
    public function __construct(
        private readonly AuthenticationService $authService,
        private readonly ExportarPlanoTrabalhoService $exportarPlanoTrabalhoService,
        private readonly ExportarPlanoEntregasService $exportarPlanoEntregasService,
        private readonly ExportarParticipanteService $exportarParticipanteService
    ) {
    }

    public function exportar(string $tenantId)
    {
        $token = $this->authService->authenticate($tenantId);

        $tenant = tenancy()->find($tenantId);
        tenancy()->initialize($tenant);

        //$this->exportarParticipanteService->setToken($token)->enviar();
        $this->exportarPlanoTrabalhoService->setToken($token)->enviar();
        //$this->exportarPlanoTrabalhoService->setToken($token)->enviar();
        

        $this->finalizar();
    }

    public function finalizar() {
        echo "** FINALIZADO!\n";
    }
}
