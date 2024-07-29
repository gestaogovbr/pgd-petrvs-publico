<?php

namespace App\Services;

use App\Models\Afastamento;
use App\Services\ServiceBase;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento; // Importar o model

class AfastamentoService extends ServiceBase {
  public function afterStore($entity, $data) {
    $afastamentoConsolidacao = PlanoTrabalhoConsolidacaoAfastamento::where("afastamento_id", $entity->id)->first();
    if($afastamentoConsolidacao->exists()) {
      $snapshot = (object) $afastamentoConsolidacao->snapshot;
      $snapshot->data_inicio = $entity->data_inicio;
      $snapshot->data_fim = $entity->data_fim;
      $afastamentoConsolidacao->save();
    }
  }
}
