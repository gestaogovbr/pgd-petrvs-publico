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
      
        $unidadesComPrograma = $this->programaUnidadeSuperior($dadosEscolhidos[2]);
        if (!empty($unidadesComPrograma)) {
            $where[] = ['unidade_id', 'in', $unidadesComPrograma->pluck('id')->toArray()];
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

  public function validateStore($data, $unidade, $action)
  {
    $unidade  = Unidade::find($data['unidade_id']);
    if (!empty($unidade) && !$unidade->instituidora) throw new ServerException("ValidatePrograma", "Não é possível criar um regramento para uma unidade que não seja instituidora.");

    if (!$this->isUniquePeriod($data)) {
      throw new ServerException("ValidatePrograma", "Há outro regramento na mesma unidade instituidora com prazo vigente.");
    }
    if ($data['data_inicio'] == $data['data_fim']) {
      throw new ServerException("ValidatePrograma", "As datas de início e fim do regramento não podem ser iguais.");
    }
  }

  public function programaVigente($programa)
  {
    return $programa->data_fim >= now()->toDateTimeString();
  }

  public function programaUnidadeSuperior($unidadeId)
  {
    $unidades = $this->unidadeService->linhaAscendente($unidadeId);
    $unidades[] = $unidadeId;

    return Unidade::whereIn('id', $unidades)
      ->whereHas('programas')
      ->orderByDesc("path")
      ->get();
  }

  public function proxySearch(&$query, &$data, &$text)
  {
    $where = [];
    $vigentesUnidadeExecutora = $this->extractWhere($data, "vigentesUnidadeExecutora");
    if (!empty($vigentesUnidadeExecutora)) {
      if (!parent::loggedUser()->hasPermissionTo('MOD_PRGT_EXT')) {
        $unidadesComPrograma = $this->programaUnidadeSuperior($vigentesUnidadeExecutora[2]);
        if (!empty($unidadesComPrograma)) array_push($where, ['unidade_id', 'in', $unidadesComPrograma->pluck('id')->toArray()]);
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
        if (collect(['INCLUIDO', 'HOMOLOGANDO'])->contains($planoEntrega->status)) {
          $this->statusService->atualizaStatus($planoEntrega, 'CANCELADO', "Conclusão do regramento");
        } else if ($planoEntrega->status == 'ATIVO'){
          $this->statusService->atualizaStatus($planoEntrega, 'CONCLUIDO', "Conclusão do regramento");
        }
      }

      foreach ($planosTrabalho as $planoTrabalho) {
        if (collect(['INCLUIDO', 'AGUARDANDO_ASSINATURA'])->contains($planoTrabalho->status)) {
          $this->statusService->atualizaStatus($planoEntrega, 'CANCELADO', "Conclusão do regramento");
        } else if ($planoTrabalho->status == 'ATIVO'){
          $this->statusService->atualizaStatus($planoEntrega, 'CONCLUIDO', "Conclusão do regramento");
        }
      }


      foreach ($participantes as $participante) {
        $participante->delete();
      }

      $programa->data_fim = now()->toDateTimeString();
      $programa->save();

      DB::commit();
    } catch (Throwable $e) {
      DB::rollback();
      throw $e;
    }
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
