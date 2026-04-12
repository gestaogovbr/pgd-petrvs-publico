<?php

namespace App\Services;

use App\Models\Afastamento;
use App\Services\ServiceBase;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento; // Importar o model

class AfastamentoService extends ServiceBase {
  public function afterStore($entity, $data) {
    $afastamentoConsolidacao = PlanoTrabalhoConsolidacaoAfastamento::where("afastamento_id", $entity->id)->first();
    if($afastamentoConsolidacao && $afastamentoConsolidacao->exists()) {
      $snapshot = (object) $afastamentoConsolidacao->snapshot;
      $snapshot->data_inicio = $entity->data_inicio;
      $snapshot->data_fim = $entity->data_fim;
      $afastamentoConsolidacao->save();
    }
  }

  public function proxyQuery($query, &$data)
  {
    $usuario = parent::loggedUser();
    $where = [];
    $subordinadas = true;
    if (!$usuario->hasPermissionTo("MOD_OCOR_TODAS_UNIDADES")) {
        if ($usuario->hasPermissionTo("MOD_OCOR_UNIDADE")) {
            // filtra pela unidade do usuário e suas subordinadas
            $areasTrabalhoWhere = $this->unidadeRepository->getAreasTrabalhoWhereClause($usuario->id, $subordinadas, "where_unidades");
            array_push($where,
                RawWhere::raw("EXISTS(
                    SELECT where_lotacoes.id
                    FROM lotacoes where_lotacoes
                    LEFT JOIN unidades where_unidades ON (where_unidades.id = where_lotacoes.unidade_id)
                    WHERE where_lotacoes.usuario_id = usuarios.id AND ($areasTrabalhoWhere))",
                [])
            );
        } else {
            // filtra apenas pela unidade do usuário
            $data['where'][] = ['usuario_id', '==', $usuario->id];        }
    }
    $data["where"] = $where;
    return $data;
  }
}
