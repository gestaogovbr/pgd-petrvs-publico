<?php

namespace App\Services\API_PGD\Export;

use App\Models\PlanoTrabalho;
use App\Services\API_PGD\Resources\PlanoTrabalhoResource;
use App\Services\API_PGD\Sources\DataSource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\API_PGD\Sources\PlanoTrabalhoDataSource;

class ExportarPlanoTrabalhoService extends ExportarService
{
  public function getTipoAudit(): string {
    return 'trabalho';
  }

  public function getResource($model): PlanoTrabalhoResource {
    return new PlanoTrabalhoResource($model);
  }

  public function getDataSource(): DataSource {
    return new PlanoTrabalhoDataSource();
  }

  public function getEndpoint($resource): string
  {
    return "/organizacao/SIAPE/{$resource->cod_unidade_autorizadora}/plano_trabalho/{$resource->id}";
  }

  public function getAudits($id) {
    return PlanoTrabalho::find($id)->audits();
  }
}
