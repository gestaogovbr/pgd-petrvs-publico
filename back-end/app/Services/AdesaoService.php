<?php

namespace App\Services;

use App\Models\Plano;
use App\Models\Usuario;
use App\Services\RawWhere;
use App\Services\ServiceBase;
use App\Services\DemandaService;
use App\Services\CalendarioService;
use App\Services\UtilService;
use App\Exceptions\ServerException;
use DateTime;
use DateTimeZone;
use Illuminate\Support\Facades\Auth;

class AdesaoService extends ServiceBase
{
    public function proxyQuery($query, &$data) {
        $where = [];
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "data_filtro") {
                $dataInicio = $this->getFilterValue($data["where"], "data_filtro_inicio");
                $dataFim = $this->getFilterValue($data["where"], "data_filtro_fim");
                switch($condition[2]) {
                    case "VIGENTE":
                        $where[] = ["data_inicio", "<=", $dataFim];
                        $where[] = ["data_fim", ">=", $dataInicio];
                        break;
                    case "NAOVIGENTE": ;
                        $where[] = ["OR", ["data_inicio", ">", $dataFim], ["data_fim", "<", $dataInicio]];
                        break;
                    case "INICIAM": ;
                        $where[] = ["data_inicio", ">=", $dataInicio];
                        $where[] = ["data_inicio", "<=", $dataFim];
                        break;
                    case "FINALIZAM": ;
                        $where[] = ["data_fim", ">=", $dataInicio];
                        $where[] = ["data_fim", "<=", $dataFim];
                        break;
                }
            } else if(!(is_array($condition) && in_array($condition[0], ["data_filtro_inicio", "data_filtro_fim"]))) {
                array_push($where, $condition);
            }
        }
        $data["where"] = $where;
    }
}
