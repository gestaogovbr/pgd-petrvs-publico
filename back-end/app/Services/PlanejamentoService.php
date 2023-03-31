<?php

namespace App\Services;

use App\Models\Planejamento;
use Illuminate\Support\Facades\DB;
use App\Traits\UseDataFim;

class PlanejamentoService extends ServiceBase
{
    use UseDataFim;

    /**
     * @param 
     * @return
     */
    public function validateStore($data, $unidade, $action) {
        $unidade_id = $data["unidade_id"];
        $lotacao_principal_id = array_values(array_filter(parent::loggedUser()->lotacoes->toArray(),fn($l) => $l['principal'] == 1))[0]['id'];
        $lotacoes_ids = array_map(fn($s) => $s->id,DB::select("SELECT id FROM unidades WHERE " . $this->usuarioService->lotacoesWhere(false)));
        $subordinadas_ids = array_map(fn($s) => $s->id,DB::select("SELECT id FROM unidades WHERE " . $this->usuarioService->lotacoesWhere(true)));

        // se a unidade_id é nula, verificar se o usuário tem permissão para criar/editar planejamentos para unidades instituidoras
        if(empty($data["unidade_id"]) && !parent::loggedUser()->hasPermissionTo('MOD_PLAN_INST_INCL_UNID_INST')) {
            throw new ServerException("ValidatePlanejamentoInstitucional", "Usuário não tem permissão para criar Planejamentos para a Unidade Instituidora (MOD_PLAN_INST_INCL_UNID_INST)");
        }

        // se a unidade_id é não-nula, verificar se o usuário tem permissão para incluir/editar planejamentos institucionais para unidades executoras
        if(!empty($data["unidade_id"])) {
            if(!in_array($unidade_id, $subordinadas_ids) && !parent::loggedUser()->hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QUALQUER'))
                throw new ServerException("ValidatePlanejamentoInstitucional", "Usuário não tem permissão para criar Planejamentos para Unidades executoras quaisquer (MOD_PLAN_INST_INCL_UNEX_QUALQUER)");
            if(in_array($unidade_id, $subordinadas_ids) && !in_array($unidade_id, $lotacoes_ids) && !in_array($unidade_id, $lotacoes_ids) && !parent::loggedUser()->hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_SUBORD'))
                throw new ServerException("ValidatePlanejamentoInstitucional", "Usuário não tem permissão para criar Planejamentos para Unidades executoras subordinadas (MOD_PLAN_INST_INCL_UNEX_SUBORD)");
            if(in_array($unidade_id, $lotacoes_ids) && $unidade_id != $lotacao_principal_id && !parent::loggedUser()->hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QQLOT'))
                throw new ServerException("ValidatePlanejamentoInstitucional", "Usuário não tem permissão para criar Planejamentos para qualquer Unidade executora das suas lotações (MOD_PLAN_INST_INCL_UNEX_QQLOT)");
            if($unidade_id == $lotacao_principal_id && !parent::loggedUser()->hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_LOTPR'))
                throw new ServerException("ValidatePlanejamentoInstitucional", "Usuário não tem permissão para criar Planejamentos para a Unidade executora de sua lotação principal (MOD_PLAN_INST_INCL_UNEX_LOTPR)");
        }

    }
}
