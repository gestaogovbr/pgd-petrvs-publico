<?php

namespace App\Services;

use App\Models\PlanoEntregaEntrega;
use Illuminate\Database\Eloquent\Builder;

class PlanoEntregaEntregaService extends ServiceBase
{
    public function proxyQuery($query, &$data) {
        $where = [];
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "objetivos.planejamento_objetivo_id") { 
                $query->whereHas('objetivos', function (Builder $query) use ($condition) {
                    $query->where('planejamento_objetivo_id', $condition[2]);
                });
            } else if(is_array($condition) && $condition[0] == "processos.cadeia_processo_id") { 
                $query->whereHas('processos', function (Builder $query) use ($condition) {
                    $query->where('cadeia_processo_id', $condition[2]);
                });
            } else if(is_array($condition) && $condition[0] == "plano_entrega.unidade_id") { 
                $query->whereHas('planoEntrega', function (Builder $query) use ($condition) {
                    $query->whereIn('unidade_id', $condition[2]);
                });
            } else if (is_array($condition) && $condition[0] == "objetivos.objetivo_id") {
                $query->whereHas('objetivos', function (Builder $query) use ($condition) {
                    $query->where('planejamento_objetivo_id', $condition[2]);
                });
            } else if (is_array($condition) && $condition[0] == "processos.processo_id") {
                $query->whereHas('processos', function (Builder $query) use ($condition) {
                    $query->where('cadeia_processo_id', $condition[2]);
                });
            } else {
                array_push($where, $condition);
            }
        }
        $data["where"] = $where;
        return $data;
    }

}
