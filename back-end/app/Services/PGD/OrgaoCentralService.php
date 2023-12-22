<?php
namespace App\Services\PGD;

use Illuminate\Support\Facades\Http;

class OrgaoCentralService
{
    protected $authService;
    protected $exportarPlanoTrabalhoService;
    protected $exportarPlanoEntregasService;

    public function __construct()
    {
        $this->authService = new AuthenticationService();
        $this->exportarPlanoTrabalhoService = new ExportarPlanoTrabalhoService();
        $this->exportarPlanoEntregasService = new ExportarPlanoEntregasService();
    }

    public function exportarDados($dados)
    {
 
        $token = $this->authService->getToken();
         
        switch ($dados['tipo']) {
            case 'PLANO_TRABALHO':
                $this->exportarPlanoTrabalhoService->enviar($token, $dados);
                break;
            case 'PLANO_ENTREGA':
                $this->exportarPlanoEntregasService->enviar($token, $dados);
                break;
        }
    }

}

