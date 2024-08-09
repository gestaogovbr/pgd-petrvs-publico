<?php

namespace App\Services\API_PGD\Export;

use App\Models\PlanoTrabalho;
use App\Services\API_PGD\PgdService;
use App\Services\API_PGD\Resources\PlanoTrabalhoResource;
use App\Services\API_PGD\DataSources\DataSource;
use App\Services\API_PGD\DataSources\PlanoTrabalhoDataSource;
use App\Services\API_PGD\ExportSource;
use Carbon\Carbon;

class ExportarPlanoTrabalhoService extends ExportarService
{
  public function __construct(
    private PgdService $pgdService,
    private readonly ExportarParticipanteService $exportarParticipanteService,
    private readonly ExportarPlanoEntregasService $exportarPlanoEntregaService
  ) {
    parent::__construct($pgdService);
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

  public function atualizarEntidade($id) {
    PlanoTrabalho::where('id', $id)->update(array("data_envio_api_pgd"=> Carbon::now()));
  }

  public function setToken($token) {
    $this->exportarParticipanteService->setToken($token);
    $this->exportarPlanoEntregaService->setToken($token);
    parent::setToken($token);
    return $this;
  }

  // envia participante juntamente com plano de trabalho
  public function sendDependencia($data) 
  {
    echo "\nInserindo dependências do Plano de Trabalho [{$data->id}]\n";
    $this->exportarParticipanteService
      ->load(new ExportSource('participante', $data->usuario->id))
      ->enviar();

    foreach($data->entregas as $planoTrabalhoEntrega) {
      if ($planoTrabalhoEntrega->planoEntregaEntrega &&
        $planoTrabalhoEntrega->planoEntregaEntrega->plano_entrega_id &&
        $planoTrabalhoEntrega->planoEntregaEntrega->planoEntrega &&
        in_array($planoTrabalhoEntrega->planoEntregaEntrega->planoEntrega->status, ['ATIVO', 'CONCLUIDO', 'AVALIADO', 'CANCELADO'])
      ) {
        $this->exportarPlanoEntregaService
          ->load(new ExportSource('entrega', $planoTrabalhoEntrega->planoEntregaEntrega->plano_entrega_id))
          ->enviar();
      }
    }
  }
}
