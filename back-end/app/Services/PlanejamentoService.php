<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\EixoTematico;
use App\Models\PlanejamentoObjetivo;
use App\Models\Unidade;
use Illuminate\Support\Facades\DB;

class PlanejamentoService extends ServiceBase
{
    /**
     * Este método verifica se a consulta provém da manutenção de planejamentos institucionais de unidades executoras. Em caso positivo, filtra apenas os planejamentos
     * não deletados e que: a) são da Unidade Instituidora, ou b) são das Unidades Executoras hierarquicamente superiores à Unidade Executora do plano que está sendo criado/editado.
     */
    public function proxyQuery($query, &$data) {
        if(!empty(array_filter($data["where"], fn($w) => $w[0] == "manut_planej_unidades_executoras"))){
            $entidade_id = parent::unidadeLotacaoUsuarioLogado()->entidade_id;
            $unidade_executora_id = array_filter($data["where"], fn($w) => $w[0] == "unidade_executora_id")[0][2];
            $unidade_executora_path = Unidade::find($unidade_executora_id)->path;
            $unidades_superiores_ids = array_filter(explode('/',$unidade_executora_path),fn($x) => $x != "");
            array_shift($unidades_superiores_ids);
            $unidades_superiores_ids = implode("','",$unidades_superiores_ids);
            $expressao = "entidade_id = '$entidade_id' AND deleted_at IS NULL AND (unidade_id IS NULL OR unidade_id IN ('$unidades_superiores_ids'))";
            $data['where'] = [new RawWhere($expressao, [])];
        }
    }

    /**
     * Este método testa algumas validações, antes de um planejamento institucional ser salvo.
     */
    public function validateStore($data, $unidade, $action) {
        $unidade_id = $data["unidade_id"];
        $lotacao_principal_id = parent::unidadeLotacaoUsuarioLogado()->id;
        $lotacoes_ids = array_map(fn($s) => $s->id, DB::select("SELECT id FROM unidades WHERE " . $this->usuarioService->areasTrabalhoWhere(false)));
        $subordinadas_ids = array_map(fn($s) => $s->id, DB::select("SELECT id FROM unidades WHERE " . $this->usuarioService->areasTrabalhoWhere(true)));

        // se a unidade_id é nula, verificar se o usuário tem permissão para criar/editar planejamentos para unidades instituidoras
        if(empty($data["unidade_id"]) && !parent::loggedUser()->hasPermissionTo('MOD_PLAN_INST_INCL_UNID_INST')) {
            throw new ServerException("ValidatePlanejamentoInstitucional", "Usuário não tem permissão para criar/editar Planejamentos para a Unidade Instituidora (MOD_PLAN_INST_INCL_UNID_INST)");
        }

        // se a unidade_id é não-nula, verificar se o usuário tem permissão para incluir/editar planejamentos institucionais para unidades executoras
        if(!empty($data["unidade_id"])) {
            if(!in_array($unidade_id, $subordinadas_ids) && !parent::loggedUser()->hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QUALQUER'))
                throw new ServerException("ValidatePlanejamentoInstitucional", "Usuário não tem permissão para criar/editar Planejamentos para Unidades executoras quaisquer (MOD_PLAN_INST_INCL_UNEX_QUALQUER)");
            if(in_array($unidade_id, $subordinadas_ids) && !in_array($unidade_id, $lotacoes_ids) && !in_array($unidade_id, $lotacoes_ids) && !parent::loggedUser()->hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_SUBORD'))
                throw new ServerException("ValidatePlanejamentoInstitucional", "Usuário não tem permissão para criar/editar Planejamentos para Unidades executoras subordinadas (MOD_PLAN_INST_INCL_UNEX_SUBORD)");
            if(in_array($unidade_id, $lotacoes_ids) && $unidade_id != $lotacao_principal_id && !parent::loggedUser()->hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QQLOT'))
                throw new ServerException("ValidatePlanejamentoInstitucional", "Usuário não tem permissão para criar/editar Planejamentos para qualquer Unidade executora das suas áreas de trabalho (MOD_PLAN_INST_INCL_UNEX_QQLOT)");
            if($unidade_id == $lotacao_principal_id && !parent::loggedUser()->hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_LOTPRI'))
                throw new ServerException("ValidatePlanejamentoInstitucional", "Usuário não tem permissão para criar/editar Planejamentos para a Unidade executora de sua lotação (MOD_PLAN_INST_INCL_UNEX_LOTPRI)");
        }

    }

    public function proxyExtra($rows, $data) {
        $eixos = EixoTematico::all();
        $result["eixos"] = $eixos->toArray();
        return $result;
    }

    public function extraStore($plano, $unidade, $action) {
        $this->buildSequencia($plano->id);
    }

    public function buildSequencia($id) {
        $sequencia = 1;
        $recursivo = function($objetivos, $eixoId) use ($id, &$recursivo, &$sequencia) {
            foreach ($objetivos as $objetivo) {
                if($objetivo->sequencia != $sequencia) {
                    $objetivo->sequencia = $sequencia;
                    $objetivo->save();
                }
                if($objetivo->eixo_tematico_id != $eixoId) {
                    $objetivo->eixo_tematico_id = $eixoId;
                    $objetivo->save();
                }
                $lista = PlanejamentoObjetivo::where("planejamento_id", $id)->where("objetivo_pai_id", $objetivo->id)
                    ->orderBy("sequencia")->orderBy("updated_at", "desc")->get();
                $recursivo($lista, $eixoId);
                $sequencia++;
            }
        };
        $eixos = DB::table('planejamentos_objetivos')
            ->selectRaw('MIN(sequencia) AS eixo_sequencia, eixo_tematico_id AS id')
            ->where('planejamento_id', $id)->groupBy("eixo_tematico_id")
            ->orderBy("eixo_sequencia")->get();
        foreach ($eixos as $eixo) {
            $objetivos = PlanejamentoObjetivo::where("planejamento_id", $id)
                ->where("eixo_tematico_id", $eixo->id)->whereNull("objetivo_pai_id")
                ->orderBy("sequencia")->orderBy("updated_at", "desc")->get();
            $recursivo($objetivos, $eixo->id);
        }
    }

}
