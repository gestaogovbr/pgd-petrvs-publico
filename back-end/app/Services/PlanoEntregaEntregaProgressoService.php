<?php

namespace App\Services;

use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoEntregaEntregaProgresso;
use Illuminate\Database\Eloquent\Builder;

class PlanoEntregaEntregaProgressoService extends ServiceBase
{

  public function extraStore($entity, $unidade, $action)
  {
    $this->updateEntrega($entity);
  }

  public function extraUpdate($entity, $unidade)
  {    
    $this->updateEntrega($entity);
  }

  public function extraDestroy($data){
    $this->updateEntrega($data);
  }

  private function updateEntrega($data){
    $entrega = PlanoEntregaEntrega::find($data["plano_entrega_entrega_id"]);
    $progressos = PlanoEntregaEntregaProgresso::where("plano_entrega_entrega_id", $entrega->id)->orderBy('data_progresso', 'asc')->get();
    
    if ($progressos->isNotEmpty()) {
      // Pega o último progresso para dados gerais (datas, meta)
      $ultimoProgresso = $progressos->last();
      
      // Calcula o progresso realizado acumulado
      $progressoRealizadoAcumulado = $this->calcularProgressoAcumulado($progressos);
      
      $entrega->update([
        'progresso_esperado' => $ultimoProgresso->progresso_esperado,
        'progresso_realizado' => $progressoRealizadoAcumulado,
        'data_inicio' =>  $ultimoProgresso->data_inicio,
        'data_fim' =>  $ultimoProgresso->data_fim,
        'meta' =>  $ultimoProgresso->meta,
        'realizado' =>  $ultimoProgresso->realizado
      ]);
    }
  }

  /**
   * Calcula o progresso realizado acumulado somando todos os progressos
   * de forma incremental, respeitando o limite máximo de 100%
   */
  private function calcularProgressoAcumulado($progressos) {
    $totalAcumulado = 0;
    
    foreach ($progressos as $progresso) {
      // Soma o progresso realizado de cada registro
      $totalAcumulado += $progresso->progresso_realizado ?? 0;
    }
    
    // Limita o máximo a 100%
    return min($totalAcumulado, 100);
  }
}
