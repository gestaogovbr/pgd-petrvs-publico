<?php

namespace App\Services;

use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Services\ServiceBase;
use App\Exceptions\ServerException;

class ProgramaService extends ServiceBase
{
  public function proxyQuery(&$query, &$data)
  {
    $where = [];
    $vigentesUnidadeExecutora = $this->extractWhere($data, "vigentesUnidadeExecutora");
    $todosUnidadeExecutora = $this->extractWhere($data, "todosUnidadeExecutora");

    $dadosEscolhidos = !empty($vigentesUnidadeExecutora) ? $vigentesUnidadeExecutora : (!empty($todosUnidadeExecutora) ? $todosUnidadeExecutora : null);
    if ($dadosEscolhidos !== null && !parent::loggedUser()->hasPermissionTo('MOD_PRGT_EXT')) {
      /* (RN_PRGT_1) 
          Garantir que apenas os programas associados à **primeira unidade instituidora identificada** sejam exibidos na listagem padrão.
      */
      $unidadeComPrograma = $this->programaUnidadeSuperior($dadosEscolhidos[2]);
      if(!empty($unidadeComPrograma)) $where[] = ['unidade_id', '=', $unidadeComPrograma->id];
      if ($dadosEscolhidos === $vigentesUnidadeExecutora) {
        $where[] = ['data_inicio', '<=', now()];
        $where[] = ['data_fim', '>=', now()];
      }
    }
    foreach ($data["where"] as $condition)
      array_push($where, $condition);
    $data["where"] = $where;
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
    if (!empty($vigentesUnidadeExecutora && !parent::loggedUser()->hasPermissionTo('MOD_PRGT_EXT'))) {
      /* (RN_PRGT_1) 
         Garantir que apenas os programas associados à **primeira unidade instituidora identificada** sejam exibidos na listagem padrão.
     */
      $unidadeComPrograma = $this->programaUnidadeSuperior($vigentesUnidadeExecutora[2]);
      if(!empty($unidadeComPrograma)) array_push($where, ['unidade_id', '=', $unidadeComPrograma->id]);      
      array_push($where, ['data_inicio', '<=', now()]);
      array_push($where, ['data_fim', '>=', now()]);
    }
    foreach ($data["where"] as $condition)
      array_push($where, $condition);
    $data["where"] = $where;
  }

}