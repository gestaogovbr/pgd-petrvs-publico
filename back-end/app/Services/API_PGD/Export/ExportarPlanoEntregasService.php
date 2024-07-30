<?php
namespace App\Services\API_PGD\Export;

use App\Models\PlanoEntrega;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\API_PGD\Resources\PlanoEntregaResource;
use App\Services\API_PGD\Sources\DataSource;
use App\Services\API_PGD\Sources\ParticipanteDataSource;

class ExportarPlanoEntregasService extends ExportarService
{
    public function getTipoAudit(): string {
        return 'entrega';
    }

    public function getResource($model): JsonResource {
        return new PlanoEntregaResource($model);
    }

    public function getDataSource(): DataSource {
       return new ParticipanteDataSource();
    }

    public function getEndpoint(JsonResource $resource): string
    {
        return "/organizacao/{$resource->unidade->codigo}/plano_entregas/{$resource->id}";
    }

    public function getAudits($id) {
        return PlanoEntrega::find($id)->audits();
      }
}

