<?php
namespace App\Services\API_PGD;

use Illuminate\Support\Facades\Http;

class OrgaoCentralService
{
    public function __construct(
        private AuthenticationService $authService,
        private ExportarPlanoTrabalhoService $exportarPlanoTrabalhoService,
        private ExportarPlanoEntregasService $exportarPlanoEntregasService
    )
    {}

    public function exportarDados($tenantId, $dados)
    {
        $token = $this->authService->authenticate($tenantId);

        switch ($dados['tipo']) {
            case 'PLANO_TRABALHO':
                return $this->exportarPlanoTrabalhoService->enviar($token, $dados);
                break;
            case 'PLANO_ENTREGA':
                return $this->exportarPlanoEntregasService->enviar($token, $dados);
                break;
        }
    }

}

