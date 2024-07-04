<?php

namespace App\Services;

use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Services\ServiceBase;
use App\Exceptions\ServerException;
use Carbon\Carbon;

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

    if (!$this->isUniquePeriod($data)) {
        throw new ServerException("ValidatePrograma", "Há outro regramento na mesma unidade instituidora com prazo vigente.");
    }
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

  public function isUniquePeriod($data)
  {
        $dataInicio = Carbon::parse($data['data_inicio']);
        $dataFim = Carbon::parse($data['data_fim']);
        $query = Programa::where('unidade_id', $data['unidade_id'])
            ->where(function ($query) use ($dataInicio, $dataFim) {
                $query->whereBetween('data_inicio', [$dataInicio, $dataFim])
                    ->orWhereBetween('data_fim', [$dataInicio, $dataFim])
                    ->orWhere(function ($query) use ($dataInicio, $dataFim) {
                        $query->where('data_inicio', '<=', $dataInicio)
                                ->where('data_fim', '>=', $dataFim);
                    });
            });

        if ($data['id']) {
            $query = $query->where('id', '!=', $data['id']);
        }

        $conflictingProgram = $query->exists();

        return !$conflictingProgram;
    }

}
