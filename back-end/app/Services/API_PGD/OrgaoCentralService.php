<?php
namespace App\Services\API_PGD;

use App\Exceptions\NotFoundException;
use Illuminate\Support\Facades\Http;

class OrgaoCentralService
{
    public function __construct(
        private AuthenticationService $authService,
        private ExportarPlanoTrabalhoService $exportarPlanoTrabalhoService,
        private ExportarPlanoEntregasService $exportarPlanoEntregasService,
        private ExportarParticipanteService $exportarParticipanteService
    )
    {}

    public function exportarDados($tenantId, $dados)
    {
        $token = $this->authService->authenticate($tenantId);
        if(!isset($dados['tipo'])) {
            throw new NotFoundException("Tipo não informado");
        }
        
        return match ($dados['tipo']) {
            'PLANO_TRABALHO' => $this->exportarPlanoTrabalhoService->enviar($token, $dados),
            'PLANO_ENTREGA' => $this->exportarPlanoEntregasService->enviar($token, $dados),
            'PARTICIPANTE' => $this->exportarParticipanteService->enviar($token, $dados),
            default => throw new NotFoundException("Tipo desconhecido: " . $dados['tipo']),
        };
    }
}
