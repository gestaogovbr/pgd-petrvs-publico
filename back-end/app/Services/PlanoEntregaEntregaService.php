<?php

namespace App\Services;

use App\Models\PlanoEntregaEntrega;
use App\Traits\UseDataFim;
use Illuminate\Database\Eloquent\Builder;

class PlanoEntregaEntregaService extends ServiceBase
{
    use UseDataFim;

    public function proxyQuery($query, &$data) {
        $where = [];
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "objetivos.objetivo_id") { 
                $query->whereHas('objetivos', function (Builder $query) use ($condition) {
                    $query->where('objetivo_id', $condition[2]);
                });
            } else {
                array_push($where, $condition);
            }
        }
        $data["where"] = $where;
        return $data;
    }

}
