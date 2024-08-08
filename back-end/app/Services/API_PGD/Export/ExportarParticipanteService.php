<?php
namespace App\Services\API_PGD\Export;

use App\Services\API_PGD\DataSources\DataSource;
use App\Services\API_PGD\DataSources\ParticipanteDataSource;
use App\Services\API_PGD\Resources\ParticipanteResource;
use App\Models\Usuario;
use Carbon\Carbon;

class ExportarParticipanteService extends ExportarService
{
    public function getDataSource(): DataSource {
        return new ParticipanteDataSource();
    }

    public function getResource($model): ParticipanteResource {
        return new ParticipanteResource($model);
    }

    public function getEndpoint($resource): string {
        return "/organizacao/SIAPE/{$resource->cod_unidade_autorizadora}/{$resource->cod_unidade_lotacao}/participante/{$resource->matricula_siape}";
    }

    public function atualizarEntidade($id) {
        Usuario::where('id', $id)->update(["data_envio_api_pgd"=> Carbon::now()]);
    }

}

