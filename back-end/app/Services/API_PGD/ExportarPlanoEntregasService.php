<?php
namespace App\Services\API_PGD;

use App\Services\API_PGD\Contracts\ExportarService;
use App\Models\PlanoEntrega;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\API_PGD\Resources\PlanoTrabalhoResource;

class ExportarPlanoEntregasService extends ExportarService
{
    const TIPO_AUDIT_ENTREGA = 'entrega';

    public function getResource($model): JsonResource {
        return new PlanoEntregaResource($model);
    }

    public function getData() {
        return PlanoEntrega::whereIn('id', $this->getIds(self::TIPO_AUDIT_ENTREGA))->get();
    }

    public function getEndpoint(JsonResource $resource): string
    {
        return "/organizacao/{$resource->unidade->codigo}/plano_entregas/{$resource->id}";
    }
}

