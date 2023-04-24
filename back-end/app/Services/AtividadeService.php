<?php

namespace App\Services;

use App\Models\Atividade;
use App\Models\UnidadeOrigemAtividade;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;
use App\Traits\UseDataFim;

class AtividadeService extends ServiceBase
{
    use UseDataFim;

    public function atividadeDashboard($unidade_id)
    {
        $atividadeService = new AtividadeService();
        $qtdeAtividades = $atividadeService->atividadesUnidade($unidade_id);
        $atividades_ids = [];
        $result = [
            "total_atividades" => 0
        ];
        foreach ($qtdeAtividades as $qtdeAtividade) {
            array_push($atividades_ids, $atividadeService->id);
            $result["total_atividades"]++;
        }
        return $result;
    }

    public function atividadesUnidade($unidade_id)
    {
        return Atividade::where("unidade_id", $unidade_id)->get();
    }

    public function proxySearch($query, &$data, &$text)
    {
        return $this->proxyQuery($query, $data);
    }

    public function proxyQuery($query, &$data)
    {
        $where = [];
        $unidade_id = null;
        $vinculadas = false;
        $soMinhas = false;
        $usuario = parent::loggedUser();
        foreach ($data["where"] as $condition) {
            if (is_array($condition) && $condition[0] == "unidade_id") {
                $unidade_id = $condition[2];
            } else if (is_array($condition) && $condition[0] == "vinculadas") {
                $vinculadas = $condition[2];
            } else if(is_array($condition) && $condition[0] == "minhas") { 
                $soMinhas = $condition[2];
            } else {
                array_push($where, $condition);
            }
        }
        if ($soMinhas || !$usuario->hasPermissionTo('MOD_UND_TUDO')) {
            $unidades_ids = [];
            if (!empty($unidade_id)) {
                array_push($unidades_ids, $unidade_id);
            } else {
                foreach ($usuario->lotacoes as $lotacao) {
                    array_push($unidades_ids, $lotacao->unidade_id);
                }
            }
            if ($vinculadas) {
                $origens = UnidadeOrigemAtividade::whereIn("unidade_id", $unidades_ids)->whereNotIn("unidade_origem_atividade_id", $unidades_ids)->get();
                $unidades_ids = array_merge($unidades_ids, array_map(fn ($origem) => $origem->unidade_origem_atividade_id, $origens->all()));
            }
            array_push($where, ["unidade_id", "in", $unidades_ids]);
        }
        $data["where"] = $where;
        return $data;
    }

    public function homologar($data)
    {
        $atividades = Atividade::whereIn("id", $data["atividades_ids"])->get();
        $count = 0;
        foreach ($atividades as $atividade) {
            $atividade->homologado = true;
            $atividade->data_homologacao = $data["data_homologacao"]; //$this->unidadeService->hora($atividade->unidade_id);
            $atividade->save();
            $count++;
        }
        return $count;
    }
}
