<?php

namespace App\Services;

use App\Models\Usuario;
use App\Models\Demanda;
use App\Models\Plano;
use App\Models\Unidade;
use App\Models\DemandaEntrega;
use App\Services\ServiceBase;
use App\Services\PlanoService;
use App\Services\Util;
use App\Services\DemandaService;
use App\Services\LotacaoService;
use App\Services\RawWhere;
use App\Services\UtilService;
use App\Traits\UseDataFim;
use Database\Seeders\UsuarioSeeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Iterator;
use Exception;

class UsuarioService extends ServiceBase
{
    use UseDataFim;

    const LOGIN_GOOGLE = "GOOGLE";
    const LOGIN_MICROSOFT = "AZURE";
    const LOGIN_FIREBASE = "FIREBASE";

    public function proxySearch($query, &$data, &$text) {
        $data["where"][] = ["subordinadas", "==", true];
        return $this->proxyQuery($query, $data);

/*        $where = [];
        $unidade_id = null;
        $vinculadas = false;
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "unidade_id") {
                $unidade_id = $condition[2];
            } else if(is_array($condition) && $condition[0] == "subordinadas") {
                $vinculadas = $condition[2];
            } else {
                array_push($where, $condition);
            }
        }
        $unidades_ids = [];
        if(!empty($unidade_id)) {
            array_push($unidades_ids, $unidade_id);
        } else {
            $usuario = Auth::user();
            foreach($usuario->lotacoes as $lotacao) {
                array_push($unidades_ids, $lotacao->unidade_id);
            }
        }
        if($vinculadas) {
            $origens = UnidadeOrigemAtividade::whereIn("unidade_id", $unidades_ids)->whereNotIn("unidade_origem_atividade_id", $unidades_ids)->get();
            $unidades_ids = array_merge($unidades_ids, array_map(fn($origem) => $origem->unidade_origem_atividade_id, $origens->all()));
        }
        array_push($where, ["unidade_id", "in", $unidades_ids]);
        $data["where"] = $where;
        return $data;*/
    }

    public function atualizarFotoPerfil($tipo, &$usuario, $url) {
        $mudou = ($tipo == UsuarioService::LOGIN_GOOGLE ? $usuario->foto_google != $url : 
                 ($tipo == UsuarioService::LOGIN_MICROSOFT ? $usuario->foto_microsoft != $url : 
                 ($tipo == UsuarioService::LOGIN_FIREBASE ? $usuario->foto_firebase != $url : false)));
        if(!empty($url) && !empty($usuario) && $mudou) {
            $downloaded = $this->downloadImgProfile($url, "usuarios/" . $usuario->id);
            if(!empty($downloaded)) {
                $usuario->foto_perfil = $downloaded;
                switch($tipo) {
                    case UsuarioService::LOGIN_GOOGLE: $usuario->foto_google = $url; break;
                    case UsuarioService::LOGIN_MICROSOFT: $usuario->foto_microsoft = $url; break;
                    case UsuarioService::LOGIN_FIREBASE: $usuario->foto_firebase = $url; break;
                }                
                $usuario->save();
            }
        }
    }

    public function downloadImgProfile($url, $path) {
        if(!Storage::exists($path)) {
            Storage::makeDirectory($path, 0755, true);
        }
        try {
            $contents = file_get_contents($url);
        } catch(Exception $e) {}
        if(!empty($contents)) {
            $name = $path . "/profile_" . md5($contents) . ".jpg";
            if(!Storage::exists($name)) Storage::put($name, $contents);
            return $name;
        } else {
            return "";
        }
    }

    public function hasLotacao($id, $usuario = null, $subordinadas = true, $dataRef = null) {
        return Unidade::where("id", $id)->whereRaw($this->lotacoesWhere($subordinadas, $usuario, "", false, $dataRef))->count() > 0;
        /*Usuario::where("id", $usuario->id)->whereHas('lotacoes', function (Builder $query) use ($id) {
            $query->where('id', $id);
        })->count() > 0;*/
    }

    public function lotacoesWhere($subordinadas, $usuario = null, $prefix = "", $deleted = false, $dataRef = null) {
        $where = [];
        $prefix = empty($prefix) ? "" : $prefix . ".";
        $usuario = $usuario ?? Auth::user();
        foreach($usuario->lotacoes as $lotacao) {
            if(($deleted || empty($lotacao->data_fim)) && !UtilService::greaterThanOrIqual($dataRef, $lotacao->data_fim)) {
                $where[] = $prefix . "id = '" . $lotacao->unidade_id . "'";
                if($subordinadas) $where[] = $prefix . "path like '%" . $lotacao->unidade_id . "%'";
            }
        }
        $result = implode(" OR ", $where);
        return empty($result) ? "false" : "(" . $result . ")";
    }

    public function proxyQuery($query, &$data) {
        $usuario = Auth::user();
        $where = [];
        $subordinadas = true;
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "lotacao") {
                array_push($where, new RawWhere("EXISTS(SELECT id FROM lotacoes where_lotacoes WHERE where_lotacoes.usuario_id = usuarios.id AND where_lotacoes.unidade_id = ?)", [$condition[2]]));
            } else if(is_array($condition) && $condition[0] == "subordinadas") {
                $subordinadas = $condition[2];
            } else {
                array_push($where, $condition);
            }
        }
        if(!$usuario->hasPermissionTo("MOD_USER_TUDO")) {
            $lotacoesWhere = $this->lotacoesWhere($subordinadas, null, "where_unidades");
            array_push($where, new RawWhere("EXISTS(SELECT where_lotacoes.id FROM lotacoes where_lotacoes LEFT JOIN unidades where_unidades ON (where_unidades.id = where_lotacoes.unidade_id) WHERE where_lotacoes.usuario_id = usuarios.id AND ($lotacoesWhere))", []));
        }
        $data["where"] = $where;
        return $data;
    }


    /**
     * dashboard
     *
     * @param  mixed $usuario_id: ID do usuário do qual se deseja as informações para o dashboard
     * @return array: array contendo todas as informações para o front-end
     */
    public function dashboard($usuario_id): array {
        $planosAtivos = $this->PlanoService->planosAtivos($usuario_id);
        $planos_ids = [];
        $result = [
            "total_demandas" => 0,
            "produtividade" => 0,
            "demandas_totais_atrasadas" => 0
        ];
        foreach($planosAtivos as $plano) {
            array_push($planos_ids, $plano->id);
        }
        // A variável $demandas armazena todas as demandas de todos os planos ativos do usuário
        $demandas = Demanda::where("usuario_id", $usuario_id)->whereIn("plano_id", $planos_ids)->get();
        $demandasTotaisNaoIniciadas = Demanda::where("usuario_id", $usuario_id)->whereNull('data_inicio')->get();
        $demandasTotaisNaoConcluidas = Demanda::where("usuario_id", $usuario_id)->whereNotNull('data_inicio')->whereNull('data_entrega')->get();
        $demandasTotaisConcluidas = Demanda::where("usuario_id", $usuario_id)->whereNotNull('data_entrega')->get();
        $demandasTotaisAvaliadas = Demanda::where("usuario_id", $usuario_id)->whereNotNull('avaliacao_id')->with(['avaliacao'])->get();

        $tarefasTotaisNaoConcluidas = DemandaEntrega::where("usuario_id", $usuario_id)->where('concluido', 0)->get();

        $result["total_demandas"] = $demandas->count();

        foreach($demandasTotaisNaoConcluidas as $demanda) {
            $metadados = $this->DemandaService->metadados($demanda);
            $result["demandas_totais_atrasadas"] += $metadados["atrasado"] ? 1 : 0;
        }

        $result["demandas_totais_nao_iniciadas"] = $demandasTotaisNaoIniciadas->count();
        $result["demandas_totais_nao_concluidas"] = $demandasTotaisNaoConcluidas->count();
        $result["demandas_totais_concluidas"] = $demandasTotaisConcluidas->count();
        $result["demandas_totais_avaliadas"] = $demandasTotaisAvaliadas->count();
        $result["media_avaliacoes"] = (count($demandasTotaisAvaliadas) == 0) ? null : $this->utilService->avg(array_map(function($d) {
                return $d["avaliacao"]["nota_atribuida"];
            }, $demandasTotaisAvaliadas->toArray()));


        $result["tarefas_totais_nao_concluidas"] = $tarefasTotaisNaoConcluidas->count();

        return $result;
    }

    public function planosPorPeriodo($usuario_id, $inicioPeriodo = null, $fimPeriodo = null){
        $result = [];
        $planos = Plano::where("usuario_id", $usuario_id)->with(['demandas', 'unidade', 'tipoModalidade'])->get();
        if ($inicioPeriodo == null || $fimPeriodo == null) {
            $result = $planos;
        } else {
            foreach ($planos as $plano) {
                if (CalendarioService::between($plano['data_inicio_vigencia'], $inicioPeriodo, $fimPeriodo) || CalendarioService::between($plano['data_fim_vigencia'], $inicioPeriodo, $fimPeriodo)) array_push($result, $plano);
            }
        }
        return $result;
    }

    public function validateStore($data, $unidade, $action) {
        if($action == ServiceBase::ACTION_INSERT) {
            if(empty($data["email"])) throw new \Exception("O campo de e-mail é obrigatório");
            if(empty($data["cpf"])) throw new \Exception("O campo de CPF é obrigatório");
            $alreadyHas = Usuario::where("id", "!=", $data["id"])->where("email", $data["email"])->orWhere("cpf", $data["cpf"])->first();
            if(!empty($alreadyHas)) {
                if(!empty($alreadyHas->data_fim)) { /* Caso o usuário exista, mas esteja excluído, reabilita o usuário */
                    $this->LotacaoService->removerLotacoesUsuario($alreadyHas);
                    $alreadyHas->data_fim = null;
                    return $alreadyHas;
                } else {
                    throw new \Exception("Já existe um usuário com mesmo e-mail ou CPF no sistema");
                }
            }
        }
    }

}
