<?php

namespace App\Services;

use App\Models\ProgramaParticipante;
use App\Services\ServiceBase;
use App\Traits\UseDataFim;
use Illuminate\Database\Eloquent\Builder;

class ProgramaParticipanteService extends ServiceBase {
    use UseDataFim;

    public function proxyQuery(&$query, &$data) {
        $where = [];
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "usuario.lotacoes.unidade.id") { 
                $query->whereHas('lotacoes', function (Builder $query) use ($condition) {
                    $query->where('unidade_id', $condition[2]);
                });
            } else {
                array_push($where, $condition);
            }
        }
        $data["where"] = $where;
        return $data;
    }
}

