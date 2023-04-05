<?php

namespace App\Services;

use App\Models\Planejamento;
use App\Models\EixoTematico;
use App\Traits\UseDataFim;

class PlanejamentoService extends ServiceBase
{
    use UseDataFim;

    public function proxyExtra($rows, $data) {
        $eixosIds = [];
        $result = ['eixos' => []];
        foreach($rows as $row) {
            foreach ($row->objetivos as $objetivo) {
                $eixosIds[] = $objetivo->eixo_tematico_id;
            }
        }
        $eixos = EixoTematico::whereIn("id", array_unique($eixosIds))->get();
        $result["eixos"] = $eixos->toArray();
        return $result;
    }

}
