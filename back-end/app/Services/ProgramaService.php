<?php

namespace App\Services;

use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Services\ServiceBase;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\DB;
use Throwable;

class ProgramaService extends ServiceBase
{
  public function proxyQuery(&$query, &$data)
  {
    $where = [];
    $vigentesUnidadeExecutora = $this->extractWhere($data, "vigentesUnidadeExecutora");
    $todosUnidadeExecutora = $this->extractWhere($data, "todosUnidadeExecutora");

    $dadosEscolhidos = !empty($vigentesUnidadeExecutora) ? $vigentesUnidadeExecutora : (!empty($todosUnidadeExecutora) ? $todosUnidadeExecutora : null);
    if ($dadosEscolhidos !== null) {
     if(!parent::loggedUser()->hasPermissionTo('MOD_PRGT_EXT')){
        $unidadeComPrograma = $this->programaUnidadeSuperior($dadosEscolhidos[2]);
        if(!empty($unidadeComPrograma)) $where[] = ['unidade_id', '=', $unidadeComPrograma->id];
      }
      if ($dadosEscolhidos === $vigentesUnidadeExecutora) {
        $where[] = ['data_inicio', '<=', now()];
        $where[] = ['data_fim', '>=', now()];
      }
    }
    foreach ($data["where"] as $condition)
      array_push($where, $condition);
    $data["where"] = $where;
  }

  public function validateStore($data, $unidade, $action) {
    $unidade  = Unidade::find($data['unidade_id']);    
    if(!empty($unidade) && !$unidade->instituidora) throw new ServerException("ValidatePrograma", "Não é possível criar um regramento para uma unidade que não seja instituidora.");
  }

  public function programaVigente($programa){
    return $programa->data_fim >= now();
  }

  public function programaUnidadeSuperior($unidadeId)
  {
    $unidades = $this->unidadeService->linhaAscendente($unidadeId);
    $unidades[] = $unidadeId; 

    return Unidade::whereIn('id', $unidades)
                  ->whereHas('programas')
                  ->orderByDesc("path")
                  ->first();
  }

  public function proxySearch(&$query, &$data, &$text)
  {
    $where = [];
    $vigentesUnidadeExecutora = $this->extractWhere($data, "vigentesUnidadeExecutora");
    if (!empty($vigentesUnidadeExecutora)) {
      if(!parent::loggedUser()->hasPermissionTo('MOD_PRGT_EXT')){
        $unidadeComPrograma = $this->programaUnidadeSuperior($vigentesUnidadeExecutora[2]);
        if(!empty($unidadeComPrograma)) array_push($where, ['unidade_id', '=', $unidadeComPrograma->id]);      
      }
      array_push($where, ['data_inicio', '<=', now()]);
      array_push($where, ['data_fim', '>=', now()]);
    }
    foreach ($data["where"] as $condition)
      array_push($where, $condition);
    $data["where"] = $where;
  }

  public function concluir($programaId)
  {
    $programa = Programa::where('id', $programaId)->firstOrFail();
    if (!$programa) {
      throw new ServerException("ValidatePrograma", "Programa não encontrado.");
    }
    
    $planosTrabalho = $programa->planosTrabalho()->get();
    $planosEntrega = $programa->planosEntrega()->get();
    $participantes = $programa->participantes()->get();

    try {
      DB::beginTransaction();
      foreach ($planosEntrega as $planoEntrega) {
        if (collect(['INCLUIDO', 'HOMOLOGANDO', 'ATIVO'])->contains($planoEntrega->status)) {
          $this->statusService->atualizaStatus($planoEntrega, 'CONCLUIDO', "Conclusão do regramento");
        }
      }

      foreach ($planosTrabalho as $planoTrabalho) {
        if (collect(['INCLUIDO', 'AGUARDANDO_ASSINATURA', 'ATIVO'])->contains($planoTrabalho->status)) {
          $this->statusService->atualizaStatus($planoEntrega, 'CONCLUIDO', "Conclusão do regramento");
        }
      }

      
      foreach ($participantes as $participante) {
        $participante->delete();
      }

      $programa->data_fim = now()->subDay();
      $programa->save();
      
      DB::commit();
    } catch (Throwable $e) {
      DB::rollback();
      throw $e;
    }  
  }
  
}