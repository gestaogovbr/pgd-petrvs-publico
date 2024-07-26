<?php
namespace App\Services\API_PGD;

use App\Services\API_PGD\Contracts\ExportarService;
use App\Models\Usuario;
use App\Services\API_PGD\Resources\ParticipanteResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ExportarParticipanteService extends ExportarService
{
    const TIPO_AUDIT_PARTICIPANTE = 'participante';

    public function getResource($model): ParticipanteResource {
        return new ParticipanteResource($model);
    }

    public function getData() {
        return Usuario::whereIn('id', $this->getIds(self::TIPO_AUDIT_PARTICIPANTE))->get();
    }

    public function getEndpoint(JsonResource $resource): string
    {
        return "/organizacao/{$resource->unidade->codigo}/participante/{$resource->cpf}";
    }

}

