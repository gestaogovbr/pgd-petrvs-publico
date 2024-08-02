<?php

namespace App\Services\API_PGD\Export;

use App\Models\PlanoTrabalho;
use App\Services\API_PGD\Resources\PlanoTrabalhoResource;
use App\Services\API_PGD\Sources\DataSource;
use App\Services\API_PGD\Sources\PlanoTrabalhoDataSource;
use Carbon\Carbon;

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

  public function atualizarEntidade($id) {
    PlanoTrabalho::find($id)->update(array("data_envio_api_pgd"=> Carbon::now()));
  }
}
