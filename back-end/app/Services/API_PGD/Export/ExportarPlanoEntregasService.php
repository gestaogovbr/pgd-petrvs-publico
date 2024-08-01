<?php
namespace App\Services\API_PGD\Export;

use App\Models\PlanoEntrega;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\API_PGD\Resources\PlanoEntregaResource;
use App\Services\API_PGD\Sources\DataSource;
use App\Services\API_PGD\Sources\PlanoEntregaDataSource;

class ExportarPlanoEntregasService extends ExportarService
{
    public function getTipoAudit(): string {
        return 'entrega';
    }

    public function getResource($model): JsonResource {
        return new PlanoEntregaResource($model);
    }

    public function getDataSource(): DataSource {
       return new PlanoEntregaDataSource();
    }

    public function getEndpoint($resource): string
    {
        return "/organizacao/SIAPE/{$resource->cod_unidade_autorizadora}/plano_entregas/{$resource->id}";
    }

    public function getAudits($id) {
        return PlanoEntrega::find($id)->audits();
      }
}

