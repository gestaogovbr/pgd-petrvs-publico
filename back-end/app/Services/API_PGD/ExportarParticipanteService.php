<?php
namespace App\Services\API_PGD;

use App\Services\API_PGD\Contracts\ExportarService;
use App\Models\Usuario;
use App\Services\API_PGD\Resources\ParticipanteResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ExportarParticipanteService extends ExportarService
{
    public function __construct(private HttpSenderService $httpSender)
    {
    }

    public function enviar($token, array $ids): void
    {
        $participantes = Usuario::whereIn('id', $ids)->get();

        foreach ($participantes as $participante) {
            $resource = new ParticipanteResource($participante);

            $success = $this->enviarDados($token, $resource);

            $this->alterarStatus($participante->id, $success);
        }
        
    }

    public function getEndpoint(JsonResource $dados): string
    {
        return "/organizacao/{$dados['cod_SIAPE_instituidora']}/participante/{$dados['cpf_participante']}";
    }

    public function obterDados($tenantId): array
    {
        return Usuario::where('id', $tenantId)->pluck('id')->toArray();
    }
}

