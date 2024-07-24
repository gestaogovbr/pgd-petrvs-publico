<?php

namespace App\Services\API_PGD;

use App\Services\API_PGD\Contracts\ExportarService;
use Illuminate\Support\Facades\DB;

class OrgaoCentralService
{
    public function __construct(
        private readonly AuthenticationService $authService,
        private readonly ExportarService $service,
    ) {
    }

    public function exportarDados($tenantId)
    {
        $token = $this->authService->authenticate($tenantId);

        $dados = $this->service->obterDados($tenantId);
        $this->service->enviar($token, $dados);
    }
}
