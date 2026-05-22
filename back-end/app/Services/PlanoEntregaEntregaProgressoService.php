<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoEntregaEntregaProgresso;
use Illuminate\Database\Eloquent\Builder;

class PlanoEntregaEntregaProgressoService extends ServiceBase
{
  private const STATUS_ATIVO = 'ATIVO';

  public function validateStore($data, $unidade, $action)
  {
    $this->validatePlanoEntregaAtivo($data['plano_entrega_entrega_id']);
  }

  public function extraStore($entity, $unidade, $action)
  {
    $this->updateEntrega($entity);
  }

  public function extraUpdate($entity, $unidade)
  {
    $this->validatePlanoEntregaAtivo($entity['plano_entrega_entrega_id']);
    $this->updateEntrega($entity);
  }

  public function extraDestroy($data){
    $this->validatePlanoEntregaAtivo($data['plano_entrega_entrega_id']);
    $this->updateEntrega($data);
  }

  private function validatePlanoEntregaAtivo(string $planoEntregaEntregaId): void
  {
    $entrega = $this->findEntrega($planoEntregaEntregaId);
    $status = $entrega?->planoEntrega?->status;
    if ($status !== self::STATUS_ATIVO) {
      throw new ServerException("ValidatePlanoEntrega", "O progresso só pode ser alterado quando o Plano de Entregas estiver com status ATIVO.");
    }
  }

  protected function findEntrega(string $id): ?PlanoEntregaEntrega
  {
    return PlanoEntregaEntrega::find($id);
  }

  private function updateEntrega($data){
    $entrega = PlanoEntregaEntrega::find($data["plano_entrega_entrega_id"]);
    $progressos = PlanoEntregaEntregaProgresso::where("plano_entrega_entrega_id", $entrega->id)->orderBy('data_progresso', 'desc')->get();
    
    if ($progressos->isNotEmpty()) {
      // Pega o último progresso lançado (mais recente)
      $ultimoProgresso = $progressos->first();
      
      $entrega->update([
        'progresso_esperado' => $ultimoProgresso->progresso_esperado,
        'progresso_realizado' => $ultimoProgresso->progresso_realizado,
        'data_inicio' =>  $ultimoProgresso->data_inicio,
        'data_fim' =>  $ultimoProgresso->data_fim,
        'meta' =>  $ultimoProgresso->meta,
        'realizado' =>  $ultimoProgresso->realizado
      ]);
    }
  }

}
