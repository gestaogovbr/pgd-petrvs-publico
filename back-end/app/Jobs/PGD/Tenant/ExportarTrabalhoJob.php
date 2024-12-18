<?php
namespace App\Jobs\PGD\Tenant;

use App\Services\API_PGD\DataSources\DataSource;
use App\Models\PlanoTrabalho;
use App\Services\API_PGD\DataSources\PlanoTrabalhoDataSource;
use App\Services\API_PGD\Resources\PlanoTrabalhoResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ExportarTrabalhoJob extends ExportarItemJob
{
    public static function getDescricao(): string
    {
        return 'Exportar Dados do Plano de Trabalho para PGD';
    }

    public function getDataSource(): DataSource {
        return new PlanoTrabalhoDataSource();
    }

    public function getResource($model): PlanoTrabalhoResource {
        return new PlanoTrabalhoResource($model);
    }

    public function getEndpoint($resource): string {
        return "/organizacao/SIAPE/{$this->tenant->api_cod_unidade_autorizadora}/plano_trabalho/{$resource->id}";
    }

    public function atualizarEntidade($id) {
        Log::info("Atualizando PT $id");
        PlanoTrabalho::where('id', $id)->update(array("data_envio_api_pgd"=> Carbon::now()));
    }

    public function addFalha() {
        $this->envio->increment('qtde_trabalhos_falhas');
        parent::addFalha();
    }

    public function addSucesso() {
        $this->envio->increment('qtde_trabalhos_sucessos');
        parent::addSucesso();
    }

}

