<?php
namespace App\Services\API_PGD;

use Illuminate\Support\Facades\Http;
use App\Models\PlanoEntrega;
use Illuminate\Http\Resources\Json\JsonResource;

class ExportarPlanoEntregasService extends ExportarService
{
    protected $httpSender;
    
    public function __construct()
    {
        $this->httpSender = new HttpSenderService();
    }

    public function enviar($token, array $ids): void
    {
        $planos_entrega = PlanoEntrega::whereIn('id', $ids)->get();

        foreach ($planos_entrega as $plano_entrega) {
            $resource = new PlanoEntregaResource($plano_entrega);

            $success = $this->enviarDados($token, $resource);

            $this->alterarStatus($plano_entrega->id, $success);
        }
    }

    public function getEndpoint(JsonResource $dados): string
    {
        return "/organizacao/{$dados->cod_SIAPE_instituidora}/plano_entregas/{$dados->id_plano_entrega_unidade}";
    }
}

