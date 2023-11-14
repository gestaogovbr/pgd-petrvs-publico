<?php

namespace App\Services;

use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoEntregaEntregaProgresso;
use Illuminate\Database\Eloquent\Builder;

class PlanoEntregaEntregaProgressoService extends ServiceBase
{
  public function afterStore($data, $action)
  {
    $this->updateEntrega($data);
  }

  public function afterUpdate($data, $action)
  {    
    $this->updateEntrega($data);
  }

  public function extraDestroy($data){
    $this->updateEntrega($data);
  }

  private function updateEntrega($data){
    $entrega = PlanoEntregaEntrega::find($data["plano_entrega_entrega_id"]);
    $progressos = PlanoEntregaEntregaProgresso::where("plano_entrega_entrega_id", $entrega->id)->orderBy('data_progresso', 'desc')->get();
    if ($progressos->isNotEmpty()) {
      $ultimoProgresso = $progressos->first();
      $entrega->update([
        'progresso_esperado' => $ultimoProgresso->progresso_esperado,
        'progresso_realizado' => $ultimoProgresso->progresso_realizado,
        'data_inicio' =>  $ultimoProgresso->data_inicio,
        'data_fim' =>  $ultimoProgresso->data_fim,
        'meta' =>  $ultimoProgresso->meta,
        'realizado' =>  $ultimoProgresso->realizado,
      ]);
    }
  }
}
