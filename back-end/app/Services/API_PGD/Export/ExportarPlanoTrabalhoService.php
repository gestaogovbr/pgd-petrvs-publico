<?php

namespace App\Services\API_PGD\Export;

use App\Models\PlanoTrabalho;
use App\Services\API_PGD\Resources\PlanoTrabalhoResource;
use App\Services\API_PGD\Sources\DataSource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\API_PGD\Sources\ParticipanteDataSource;

class ExportarPlanoTrabalhoService extends ExportarService
{
  public function getTipoAudit(): string {
    return 'trabalho';
  }

  public function getResource($model): PlanoTrabalhoResource {
    return new PlanoTrabalhoResource($model);
  }

  public function getDataSource(): DataSource {
    return new ParticipanteDataSource();
  }

  public function getEndpoint(JsonResource $resource): string
  {
    return "/organizacao/SIAPE/1/plano_trabalho/{$resource->id}";
  }

  public function getAudits($id) {
    return PlanoTrabalho::find($id)->audits();
  }
}
