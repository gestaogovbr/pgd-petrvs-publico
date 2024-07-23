<?php
namespace App\Services\API_PGD;

use Illuminate\Support\Facades\DB;

class OrgaoCentralService
{
    public function __construct(
        private AuthenticationService $authService,
        private ExportarPlanoTrabalhoService $exportarPlanoTrabalhoService,
        private ExportarPlanoEntregasService $exportarPlanoEntregasService,
        private ExportarParticipanteService $exportarParticipanteService
    )
    {}

    public function exportarDados($tenantId)
    {
        $token = $this->authService->authenticate($tenantId);

        $tenant = tenancy()->find($tenantId);
        tenancy()->initialize($tenant);

        $planos_trabalho_ids = DB::table('view_api_pgd')
            ->where('tipo', 'trabalho')
            ->pluck('id')
            ->toArray();

        $this->exportarPlanoTrabalhoService->enviar($token, $planos_trabalho_ids);

        /*
        $this->exportarPlanoEntregasService->enviar($token, $planos_entrega_ids);

        $participantes_ids = ViewApiPgd::where('tipo', 'entrega')->pluck('id');
        $this->exportarParticipanteService->enviar($token, $participantes_ids);
        */
    }
}
