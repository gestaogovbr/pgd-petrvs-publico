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
                        $where[] = ["data_inicio_vigencia", "<=", $dataFim];
                        $where[] = ["data_fim_vigencia", ">=", $dataInicio];
                        break;
                    case "NAOVIGENTE": ;
                        $where[] = ["OR", ["data_inicio_vigencia", ">", $dataFim], ["data_fim_vigencia", "<", $dataInicio]];
                        break;
                    case "INICIAM": ;
                        $where[] = ["data_inicio_vigencia", ">=", $dataInicio];
                        $where[] = ["data_inicio_vigencia", "<=", $dataFim];
                        break;
                    case "FINALIZAM": ;
                        $where[] = ["data_fim_vigencia", ">=", $dataInicio];
                        $where[] = ["data_fim_vigencia", "<=", $dataFim];
                        break;
                }
            } else if(!(is_array($condition) && in_array($condition[0], ["data_filtro_inicio", "data_filtro_fim"]))) {
                array_push($where, $condition);
            }
        }
        $data["where"] = $where;
    }

    public function validateStore($data, $unidade, $action) {
        // TODO: fazer as validações da adesão
        /*$unidade_id = $data["unidade_id"];
        $usuario = Usuario::with(["lotacoes" => function ($query){
            $query->whereNull("data_fim");
        }])->find($data["usuario_id"]);
        $criador = Usuario::with(["lotacoes" => function ($query){
            $query->whereNull("data_fim");
        }])->find(parent::loggedUser()->id);*/
        /*if(!$this->usuarioService->hasLotacao($unidade_id, $usuario, false) && !parent::loggedUser()->hasPermissionTo('MOD_USER_TUDO')) {
            throw new ServerException("ValidatePlano", $unidade->sigla . " não é uma unidade (lotação) do usuário");
        }*/
        /* $usuario_lotacoes_ids = $usuario->lotacoes->map(function ($item, $key) { return $item->unidade_id; })->all();
        $criador_lotacoes_ids = $criador->lotacoes->map(function ($item, $key) { return $item->unidade_id; })->all();
        if(!count(array_intersect($usuario_lotacoes_ids, $criador_lotacoes_ids)) && !parent::loggedUser()->hasPermissionTo('MOD_PTR_USERS_INCL')) {
            throw new ServerException("ValidatePlano", "Usuário do plano fora das lotações de quem está lançando o plano (MOD_PTR_USERS_INCL)");
        }
        if(!in_array($unidade_id, $usuario_lotacoes_ids) && !parent::loggedUser()->hasPermissionTo('MOD_PTR_INCL_SEM_LOT')) {
            throw new ServerException("ValidatePlano", "Usuário não lotado na unidade do plano (MOD_PTR_INCL_SEM_LOT)");
        }
        $planos = Plano::where("usuario_id", $data["usuario_id"])->where("usuario_id", $data["unidade_id"])->where("tipo_modalidade_id", $data["tipo_modalidade_id"])->get();
        foreach ($planos as $plano) {
            if(UtilService::intersect($plano->data_inicio_vigencia, $plano->data_fim_vigencia, $data["data_inicio_vigencia"], $data["data_fim_vigencia"]) &&
                UtilService::valueOrNull($data, "id") != $plano->id && !parent::loggedUser()->hasPermissionTo('MOD_PTR_INTSC_DATA')) {
                throw new ServerException("ValidatePlano", "O plano de trabalho #" . $plano->numero . " (" . UtilService::getDateTimeFormatted($plano->data_inicio_vigencia) . " à " . UtilService::getDateTimeFormatted($plano->data_fim_vigencia) . ") possui período conflitante para a mesma modalidade (MOD_PTR_INTSC_DATA)");
            }
        }*/
    }
}
