<?php

namespace App\Services\API_PGD;

use App\Models\PlanoTrabalho;
use App\Services\API_PGD\Contracts\ExportarService;
use App\Services\API_PGD\Resources\PlanoTrabalhoResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ExportarPlanoTrabalhoService extends ExportarService
{
  const TIPO_AUDIT_TRABALHO = 'trabalho';

  public function getResource($model): PlanoTrabalhoResource {
    return new PlanoTrabalhoResource($model);
  }

  public function getData() {
    return PlanoTrabalho::whereIn('id', $this->getIds(self::TIPO_AUDIT_TRABALHO))->get();
  }

  public function getEndpoint(JsonResource $resource): string
  {
    return "/organizacao/SIAPE/1/plano_trabalho/{$resource->id}";
  }
}
