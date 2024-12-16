<?php
namespace App\Jobs\PGD\Tenant;

use App\Services\API_PGD\DataSources\DataSource;
use App\Services\API_PGD\DataSources\ParticipanteDataSource;
use App\Services\API_PGD\Resources\ParticipanteResource;
use App\Models\Usuario;
use Carbon\Carbon;

class ExportarParticipanteJob extends ExportarItemJob
{
    public static function getDescricao(): string
    {
        return 'Exportar Dados de Participante para PGD';
    }

    public function getDataSource(): DataSource {
        return new ParticipanteDataSource();
    }

    public function getResource($model): ParticipanteResource {
        return new ParticipanteResource($model);
    }

    public function getEndpoint($resource): string {
        return "/organizacao/SIAPE/{$this->tenant->api_cod_unidade_autorizadora}/{$resource->cod_unidade_lotacao}/participante/{$resource->matricula_siape}";
    }

    public function atualizarEntidade($id) {
        Usuario::where('id', $id)->update(["data_envio_api_pgd"=> Carbon::now()]);
    }

    public function addFalha() {
        $this->envio->increment('qtde_participantes_falhas');
        parent::addFalha();
    }

    public function addSucesso() {
        $this->envio->increment('qtde_participantes_sucessos');
        parent::addSucesso();
    }
}

