<?php
namespace App\Services\API_PGD\Export;

use App\Models\PlanoEntrega;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\API_PGD\Resources\PlanoEntregaResource;
use App\Services\API_PGD\DataSources\DataSource;
use App\Services\API_PGD\DataSources\PlanoEntregaDataSource;
use Carbon\Carbon;

class ExportarPlanoEntregasService extends ExportarService
{
    public function getResource($model): JsonResource {
        return new PlanoEntregaResource($model);
    }

    public function getDataSource(): DataSource {
       return new PlanoEntregaDataSource();
    }

    public function getEndpoint($resource): string
    {
        return "/organizacao/SIAPE/{$resource->cod_unidade_autorizadora}/plano_entregas/{$resource->id_plano_entregas}";
    }

    public function atualizarEntidade($id) {
        PlanoEntrega::find($id)->update(array("data_envio_api_pgd"=> Carbon::now()));
      }
}

