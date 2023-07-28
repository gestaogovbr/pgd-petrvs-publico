<?php

namespace App\Services;

use App\Models\PlanoEntregaEntrega;
use Illuminate\Database\Eloquent\Builder;

class PlanoEntregaEntregaService extends ServiceBase
{
    public function proxyQuery($query, &$data) {
        $where = [];
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "objetivos.objetivo_id") { 
                $query->whereHas('objetivos', function (Builder $query) use ($condition) {
                    $query->where('objetivo_id', $condition[2]);
                });
            } else if(is_array($condition) && $condition[0] == "processos.processo_id") { 
                $query->whereHas('processos', function (Builder $query) use ($condition) {
                    $query->where('processo_id', $condition[2]);
                });
            } else {
                array_push($where, $condition);
            }
        }
        $data["where"] = $where;
        return $data;
    }

}
