<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Database\Seeders\BulkSeeeder;

use App\Models\Capacidade;
use App\Models\Perfil;
use App\Models\TipoCapacidade;
use App\Services\UtilService;

class CapacidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public $timenow;
    public $utilService;

    public function __construct(){
        $this->timenow = now();
        $this->utilService = new UtilService();
    }

    public function run(){

        // Lista com capacidades por perfil
        $capacidades_participante = [
            ["codigo" => "MOD_PTR_ENTR_EDT"],
            ["codigo" => "MOD_PTR_INCL"],
            ["codigo" => "MOD_OCOR"],
            ["codigo" => "MOD_AFT"],
            ["codigo" => "MOD_ATV_TRF_EDT"],
            ["codigo" => "MOD_ATV_TRF_INCL"],
            ["codigo" => "MOD_PART"],
            ["codigo" => "MOD_ATV_TRF_EXCL"],
            ["codigo" => "MOD_ATV"],
            ["codigo" => "MOD_ATV_INCL"],
            ["codigo" => "MOD_ATV_CLONAR"],
            ["codigo" => "MOD_ATV_RESP_INICIAR"],
            ["codigo" => "MOD_ATV_TIPO_ATV_VAZIO"],
            ["codigo" => "MOD_TRF"],
            ["codigo" => "MOD_PTR_EDT"],
            ["codigo" => "MOD_ATV_INICIO"],
            ["codigo" => "MOD_ATV_TRF_CONS"],
            ["codigo" => "MOD_OCOR_INCL"],
            ["codigo" => "MOD_PTR_ENTR_INCL"],
            ["codigo" => "MOD_PRGT"],
            ["codigo" => "MOD_ATV_EXCL"],
            ["codigo" => "MOD_PTR"],
            ["codigo" => "MOD_AFT_INCL"],
            ["codigo" => "MOD_PTR_ENTR"],
            ["codigo" => "MOD_PTR_CSLD_REC_AVAL"],
            ["codigo" => "MOD_PTR_CSLD"],
            ["codigo" => "MOD_OCOR_EDT"],
            ["codigo" => "MOD_AFT_EDT"],
            ["codigo" => "MOD_ATV_EDT"],
            ["codigo" => "CTXT_EXEC"],
            ["codigo" => "MOD_CTXT"],
        ];

        $capacidades_chefia_de_unidade_executora = [
            ["codigo" => "MOD_UND_TUDO"],
            ["codigo" => "MOD_PENT_ENTR_EDT"],
            ["codigo" => "MOD_USER_TUDO"],
            ["codigo" => "MOD_PENT_INCL"],
            ["codigo" => "MOD_TRF"],
            ["codigo" => "MOD_AFT_EXCL"],
            ["codigo" => "MOD_PTR_USERS_INCL"],
            ["codigo" => "MOD_OCOR_INCL"],
            ["codigo" => "MOD_ENTRG_INCL"],
            ["codigo" => "MOD_RX_VIS_ATR"],
            ["codigo" => "MOD_TIPO_TRF"],
            ["codigo" => "MOD_TIPO_TRF_INCL"],
            ["codigo" => "MOD_ATV_TRF_CONS"],
            ["codigo" => "MOD_PENT_CANC_AVAL"],
            ["codigo" => "MOD_PENT_AVAL"],
            ["codigo" => "MOD_PTR_CSLD_REC_AVAL"],
            ["codigo" => "MOD_TRF_INCL"],
            ["codigo" => "MOD_PENT"],
            ["codigo" => "MOD_PENT_RET_HOMOL"],
            ["codigo" => "MOD_ATV_TIPO_ATV_VAZIO"],
            ["codigo" => "MENU_GESTAO_ACESSO"],
            ["codigo" => "MOD_TRF_EXCL"],
            ["codigo" => "MOD_ATV_TRF_EDT"],
            ["codigo" => "MOD_RX"],
            ["codigo" => "MOD_PENT_EDT_FLH"],
            ["codigo" => "MOD_PLAN_INST"],
            ["codigo" => "MOD_ATV"],
            ["codigo" => "MOD_ATV_RESP_INICIAR"],
            ["codigo" => "MOD_ATV_INICIO"],
            ["codigo" => "MOD_UND"],
            ["codigo" => "MOD_PENT_ARQ"],
            ["codigo" => "MOD_RX_EDT_OPO"],
            ["codigo" => "MOD_PTR_CSLD"],
            ["codigo" => "MOD_PTR_ENTR_INCL"],
            ["codigo" => "MOD_PENT_EDT"],
            ["codigo" => "MOD_RX_VIS_DPR"],
            ["codigo" => "MOD_PTR_EDT_ATV"],
            ["codigo" => "MOD_PTR_EDT"],
            ["codigo" => "MOD_ATV_TRF_EXCL"],
            ["codigo" => "MOD_ATV_TRF_INCL"],
            ["codigo" => "MOD_RX_VIS_OPO"],
            ["codigo" => "MOD_TIPO_TRF_EDT"],
            ["codigo" => "MOD_OCOR"],
            ["codigo" => "MOD_TRF_EDT"],
            ["codigo" => "MOD_PROJ_REC_INCL"],
            ["codigo" => "MOD_ENTRG_EDT"],
            ["codigo" => "MOD_PROJ_REG_EDT"],
            ["codigo" => "MOD_PTR_INCL_SEM_LOT"],
            ["codigo" => "MOD_PROJ_EDT"],
            ["codigo" => "MOD_PENT_ENTR_INCL"],
            ["codigo" => "MOD_AFT_EDT"],
            ["codigo" => "MOD_AFT_INCL"],
            ["codigo" => "MOD_PENT_CONC"],
            ["codigo" => "MOD_PENT_EXCL"],
            ["codigo" => "MOD_PROJ_INCL"],
            ["codigo" => "MOD_AFT"],
            ["codigo" => "MOD_OCOR_EXCL"],
            ["codigo" => "MOD_FER"],
            ["codigo" => "MOD_PTR_CSLD_AVAL"],
            ["codigo" => "MOD_ENTRG_EXCL"],
            ["codigo" => "MOD_PENT_EDT_ATV_HOMOL"],
            ["codigo" => "MOD_PENT_AVAL_SUBORD"],
            ["codigo" => "MOD_PROJ"],
            ["codigo" => "MOD_PTR_ENTR_EDT"],
            ["codigo" => "MOD_PROJ_REG_INCL"],
            ["codigo" => "MOD_RX_VIS_DPE"],
            ["codigo" => "MOD_PTR_ENTR"],
            ["codigo" => "MOD_ATV_CLONAR"],
            ["codigo" => "MOD_PTR"],
            ["codigo" => "MOD_PENT_LIB_HOMOL"],
            ["codigo" => "MENU_REL_ACESSO"],
            ["codigo" => "MOD_TIPO_MTV_AFT"],
            ["codigo" => "MOD_PENT_CANC_HOMOL"],
            ["codigo" => "MOD_PENT_HOMOL"],
            ["codigo" => "MOD_PTR_ENTR_EXCL"],
            ["codigo" => "MOD_ENTRG"],
            ["codigo" => "MOD_PENT_EDT_ATV_ATV"],
            ["codigo" => "MOD_PTR_INCL"],
            ["codigo" => "MOD_OCOR_EDT"],
            ["codigo" => "MOD_USER"],
            ["codigo" => "MOD_ACESSO"],
            ["codigo" => "MOD_ATV_INCL"],
            ["codigo" => "MOD_ATV_EDT"],
            ["codigo" => "MOD_ATV_USU_EXT"],
            ["codigo" => "CTXT_GEST"],
            ["codigo" => "MOD_CTXT"],
            ["codigo" => "CTXT_PROJ"],
            ["codigo" => "CTXT_EXEC"],
            ["codigo" => "CTXT_RX"],
        ];

        $capacidades_administrador_negocial = [
            ["codigo" => "CTXT_ADM"],
            ["codigo" => "CTXT_EXEC"],
            ["codigo" => "CTXT_GEST"],
            ["codigo" => "DASH_PRG"],
            ["codigo" => "MENU_CAD_ACESSO"],
            ["codigo" => "MENU_CONFIG_ACESSO"],
            ["codigo" => "MENU_GESTAO_ACESSO"],
            ["codigo" => "MENU_REL_ACESSO"],
            ["codigo" => "MOD_ACESSO"],
            ["codigo" => "MOD_AFT"],
            ["codigo" => "MOD_AFT_EDT"],
            ["codigo" => "MOD_AFT_EXCL"],
            ["codigo" => "MOD_AFT_INCL"],
            ["codigo" => "MOD_ATV"],
            ["codigo" => "MOD_ATV_CLONAR"],
            ["codigo" => "MOD_ATV_EDT"],
            ["codigo" => "MOD_ATV_EXCL"],
            ["codigo" => "MOD_ATV_INCL"],
            ["codigo" => "MOD_ATV_INICIO"],
            ["codigo" => "MOD_ATV_RESP_INICIAR"],
            ["codigo" => "MOD_ATV_TIPO_ATV_VAZIO"],
            ["codigo" => "MOD_ATV_TRF_CONS"],
            ["codigo" => "MOD_ATV_TRF_EDT"],
            ["codigo" => "MOD_ATV_TRF_EXCL"],
            ["codigo" => "MOD_ATV_TRF_INCL"],
            ["codigo" => "MOD_ATV_USU_EXT"],
            ["codigo" => "MOD_CADV"],
            ["codigo" => "MOD_CADV_EDT"],
            ["codigo" => "MOD_CADV_EXCL"],
            ["codigo" => "MOD_CADV_INCL"],
            ["codigo" => "MOD_CFG"],
            ["codigo" => "MOD_CFG_PERFS"],
            ["codigo" => "MOD_CFG_UND"],
            ["codigo" => "MOD_CFG_USER"],
            ["codigo" => "MOD_CFG_USER_CPF"],
            ["codigo" => "MOD_CFG_USER_MAT"],
            ["codigo" => "MOD_CFG_USER_PERFIL"],
            ["codigo" => "MOD_CID"],
            ["codigo" => "MOD_CTXT"],
            ["codigo" => "MOD_ENTD"],
            ["codigo" => "MOD_ENTD_EDT"],
            ["codigo" => "MOD_ENTRG"],
            ["codigo" => "MOD_ENTRG_EDT"],
            ["codigo" => "MOD_ENTRG_EXCL"],
            ["codigo" => "MOD_ENTRG_INCL"],
            ["codigo" => "MOD_EXTM"],
            ["codigo" => "MOD_EXTM_EDT"],
            ["codigo" => "MOD_EXTM_EXCL"],
            ["codigo" => "MOD_EXTM_INCL"],
            ["codigo" => "MOD_FER"],
            ["codigo" => "MOD_FER_EDT"],
            ["codigo" => "MOD_FER_EXCL"],
            ["codigo" => "MOD_FER_INCL"],
            ["codigo" => "MOD_PENT"],
            ["codigo" => "MOD_PENT_ARQ"],
            ["codigo" => "MOD_PENT_AVAL"],
            ["codigo" => "MOD_PENT_AVAL_SUBORD"],
            ["codigo" => "MOD_PENT_CANC_AVAL"],
            ["codigo" => "MOD_PENT_CANC_CONCL"],
            ["codigo" => "MOD_PENT_CANC_HOMOL"],
            ["codigo" => "MOD_PENT_CNC"],
            ["codigo" => "MOD_PENT_CONC"],
            ["codigo" => "MOD_PENT_EDT"],
            ["codigo" => "MOD_PENT_EDT_ATV_ATV"],
            ["codigo" => "MOD_PENT_EDT_ATV_HOMOL"],
            ["codigo" => "MOD_PENT_EDT_FLH"],
            ["codigo" => "MOD_PENT_ENTR_EDT"],
            ["codigo" => "MOD_PENT_ENTR_EXCL"],
            ["codigo" => "MOD_PENT_ENTR_INCL"],
            ["codigo" => "MOD_PENT_ENTR_PRO_EDT"],
            ["codigo" => "MOD_PENT_ENTR_PRO_EXCL"],
            ["codigo" => "MOD_PENT_ENTR_PRO_INCL"],
            ["codigo" => "MOD_PENT_EXCL"],
            ["codigo" => "MOD_PENT_HOMOL"],
            ["codigo" => "MOD_PENT_INCL"],
            ["codigo" => "MOD_PENT_LIB_HOMOL"],
            ["codigo" => "MOD_PENT_QQR_UND"],
            ["codigo" => "MOD_PENT_RET_HOMOL"],
            ["codigo" => "MOD_PENT_RTV"],
            ["codigo" => "MOD_PENT_SUSP"],
            ["codigo" => "MOD_PERF_EDT"],
            ["codigo" => "MOD_PLAN_INST"],
            ["codigo" => "MOD_PLAN_INST_EDT"],
            ["codigo" => "MOD_PLAN_INST_EXCL"],
            ["codigo" => "MOD_PLAN_INST_INCL"],
            ["codigo" => "MOD_PLAN_INST_INCL_UNEX_LOTPRI"],
            ["codigo" => "MOD_PLAN_INST_INCL_UNEX_QQLOT"],
            ["codigo" => "MOD_PLAN_INST_INCL_UNEX_QUALQUER"],
            ["codigo" => "MOD_PLAN_INST_INCL_UNEX_SUBORD"],
            ["codigo" => "MOD_PLAN_INST_INCL_UNID_INST"],
            ["codigo" => "MOD_PRGT"],
            ["codigo" => "MOD_PRGT_EDT"],
            ["codigo" => "MOD_PRGT_EXCL"],
            ["codigo" => "MOD_PRGT_INCL"],
            ["codigo" => "MOD_PART"],
            ["codigo" => "MOD_PART_INCL"],
            ["codigo" => "MOD_PTR"],
            ["codigo" => "MOD_PTR_CNC"],
            ["codigo" => "MOD_PTR_CSLD"],
            ["codigo" => "MOD_PTR_CSLD_AVAL"],
            ["codigo" => "MOD_PTR_CSLD_CANC_AVAL"],
            ["codigo" => "MOD_PTR_CSLD_CONCL"],
            ["codigo" => "MOD_PTR_CSLD_DES_CONCL"],
            ["codigo" => "MOD_PTR_CSLD_EDT"],
            ["codigo" => "MOD_PTR_CSLD_EXCL"],
            ["codigo" => "MOD_PTR_CSLD_INCL"],
            ["codigo" => "MOD_OCOR"],
            ["codigo" => "MOD_OCOR_EDT"],
            ["codigo" => "MOD_OCOR_EXCL"],
            ["codigo" => "MOD_OCOR_INCL"],
            ["codigo" => "MOD_PTR_CSLD_REC_AVAL"],
            ["codigo" => "MOD_PTR_EDT"],
            ["codigo" => "MOD_PTR_EDT_ATV"],
            ["codigo" => "MOD_PTR_ENTR"],
            ["codigo" => "MOD_PTR_ENTR_EDT"],
            ["codigo" => "MOD_PTR_ENTR_EXCL"],
            ["codigo" => "MOD_PTR_ENTR_INCL"],
            ["codigo" => "MOD_PTR_INCL"],
            ["codigo" => "MOD_PTR_INCL_SEM_LOT"],
            ["codigo" => "MOD_PTR_INTSC_DATA"],
            ["codigo" => "MOD_PTR_USERS_INCL"],
            ["codigo" => "MOD_TEMP"],
            ["codigo" => "MOD_TIPO_AVAL"],
            ["codigo" => "MOD_TIPO_AVAL_EDT"],
            ["codigo" => "MOD_TIPO_AVAL_EXCL"],
            ["codigo" => "MOD_TIPO_AVAL_INCL"],
            ["codigo" => "MOD_TIPO_CAP"],
            ["codigo" => "MOD_TIPO_CAP_EDT"],
            ["codigo" => "MOD_TIPO_CAP_EXCL"],
            ["codigo" => "MOD_TIPO_CAP_INCL"],
            ["codigo" => "MOD_TIPO_DOC"],
            ["codigo" => "MOD_TIPO_DOC_EDT"],
            ["codigo" => "MOD_TIPO_DOC_EXCL"],
            ["codigo" => "MOD_TIPO_DOC_INCL"],
            ["codigo" => "MOD_TIPO_JUST"],
            ["codigo" => "MOD_TIPO_JUST_EDT"],
            ["codigo" => "MOD_TIPO_JUST_EXCL"],
            ["codigo" => "MOD_TIPO_JUST_INCL"],
            ["codigo" => "MOD_TIPO_MDL"],
            ["codigo" => "MOD_TIPO_MDL_EDT"],
            ["codigo" => "MOD_TIPO_MDL_EXCL"],
            ["codigo" => "MOD_TIPO_MDL_INCL"],
            ["codigo" => "MOD_TIPO_MTV_AFT"],
            ["codigo" => "MOD_TIPO_MTV_AFT_EDT"],
            ["codigo" => "MOD_TIPO_MTV_AFT_EXCL"],
            ["codigo" => "MOD_TIPO_MTV_AFT_INCL"],
            ["codigo" => "MOD_TIPO_PROC"],
            ["codigo" => "MOD_TIPO_PROC_EDT"],
            ["codigo" => "MOD_TIPO_PROC_EXCL"],
            ["codigo" => "MOD_TIPO_PROC_INCL"],
            ["codigo" => "MOD_TIPO_TRF"],
            ["codigo" => "MOD_TIPO_TRF_EDT"],
            ["codigo" => "MOD_TIPO_TRF_EXCL"],
            ["codigo" => "MOD_TIPO_TRF_INCL"],
            ["codigo" => "MOD_TPMAF_INCL"],
            ["codigo" => "MOD_TRF"],
            ["codigo" => "MOD_TRF_EDT"],
            ["codigo" => "MOD_TRF_EXCL"],
            ["codigo" => "MOD_TRF_INCL"],
            ["codigo" => "MOD_USER"],
            ["codigo" => "MOD_USER_ATRIB"],
            ["codigo" => "MOD_USER_EDT"],
            ["codigo" => "MOD_USER_TUDO"],
        ];

        // Inserção de dados
        $capacidadesInseridas = [];
        $capacidadesRestauradas = [];
        $tipoCapacidadesInexistentes = [];
        $capacidadesRepetidas = [];

        foreach($capacidades_participante as $c){
            $capacidade = [
                "id" => $this->utilService->uuid("Participante" . $c['codigo']),
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => NULL,
                "perfil_id" => $this->utilService->uuid("Participante"),
                "tipo_capacidade_id" => $this->utilService->uuid($c['codigo']),
            ];

            $queryCapacidade = Capacidade::onlyTrashed()->find($capacidade['id']);
            $queryTipoCapacidade = TipoCapacidade::find($capacidade['tipo_capacidade_id']);

            if($queryTipoCapacidade){
                if (!empty($queryCapacidade)){
                    $queryCapacidade->restore();
                    array_push($capacidadesRestauradas, $capacidade['id']);
                } else {
                    $result = Capacidade::insertOrIgnore($capacidade);
                    //if (!$result) echo("Capacidade já existe: (" . $c['codigo'] . ") Participante.\n");
                }
                !in_array($capacidade['id'], $capacidadesInseridas) ? array_push($capacidadesInseridas, $capacidade['id']) : array_push($capacidadesRepetidas, [$c['codigo'], $capacidade['id']]);
            } else {
                // echo("Erro: TipoCapacidade inexistente(" . "código: " . $c['codigo'] . " - ID: " . $capacidade['tipo_capacidade_id']. ")");
                array_push($tipoCapacidadesInexistentes, [$c['codigo'], $capacidade['tipo_capacidade_id']]);
            }
        }

        foreach($capacidades_chefia_de_unidade_executora as $c){
            $capacidade = [
                "id" => $this->utilService->uuid("Chefia de Unidade Executora" . $c['codigo']),
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => NULL,
                "perfil_id" => $this->utilService->uuid("Chefia de Unidade Executora"),
                "tipo_capacidade_id" => $this->utilService->uuid($c['codigo']),
            ];

            $queryCapacidade = Capacidade::onlyTrashed()->find($capacidade['id']);
            $queryTipoCapacidade = TipoCapacidade::find($capacidade['tipo_capacidade_id']);

            if($queryTipoCapacidade){
                if (!empty($queryCapacidade)){
                    $queryCapacidade->restore();
                    array_push($capacidadesRestauradas, $capacidade['id']);
                } else {
                    $result = Capacidade::insertOrIgnore($capacidade);
                    //if (!$result) echo("Capacidade já existe: (" . $c['codigo'] . ") Chefia de Unidade Executora.\n");
                }
                !in_array($capacidade['id'], $capacidadesInseridas) ? array_push($capacidadesInseridas, $capacidade['id']) : array_push($capacidadesRepetidas, [$c['codigo'], $capacidade['id']]);
            } else {
                //echo("Erro: TipoCapacidade inexistente(" . "código: " . $c['codigo'] . " - ID: " . $capacidade['tipo_capacidade_id']. ")");
                array_push($tipoCapacidadesInexistentes, [$c['codigo'], $capacidade['tipo_capacidade_id']]);
            }
        }

        foreach($capacidades_administrador_negocial as $c){
            $capacidade = [
                "id" => $this->utilService->uuid("Administrador Negocial" . $c['codigo']),
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => NULL,
                "perfil_id" => $this->utilService->uuid("Administrador Negocial"),
                "tipo_capacidade_id" => $this->utilService->uuid($c['codigo']),
            ];

            $queryCapacidade = Capacidade::onlyTrashed()->find($capacidade['id']);
            $queryTipoCapacidade = TipoCapacidade::find($capacidade['tipo_capacidade_id']);

            if($queryTipoCapacidade){
                if (!empty($queryCapacidade)){
                    $queryCapacidade->restore();
                    array_push($capacidadesRestauradas, $capacidade['id']);
                } else {
                    $result = Capacidade::insertOrIgnore($capacidade);
                    //if (!$result) echo("Capacidade já existe: (" . $c['codigo'] . ") Administrador Negocial.\n");
                }
                !in_array($capacidade['id'], $capacidadesInseridas) ? array_push($capacidadesInseridas, $capacidade['id']) : array_push($capacidadesRepetidas, [$c['codigo'], $capacidade['id']]);
            } else {
                // echo("Erro: TipoCapacidade inexistente(" . "código: " . $c['codigo'] . " - ID: " . $capacidade['tipo_capacidade_id']. ")");
                array_push($tipoCapacidadesInexistentes, [$c['codigo'], $capacidade['tipo_capacidade_id']]);
            }
        }

        $perfilDesenvolvedorId = Perfil::where([['nome', 'Desenvolvedor']])->first()->id;

        $capacidadesRemovidas = Capacidade::whereNotIn('id', $capacidadesInseridas)->whereNotIn('perfil_id', [$perfilDesenvolvedorId])->get()->toArray();
        $qtdCapacidadesRemovidas = Capacidade::whereNotIn('id', $capacidadesInseridas)->whereNotIn('perfil_id', [$perfilDesenvolvedorId])->delete();
        $qtdCapacidades = Capacidade::count();
        $qtdCapacidadesRestauradas = count($capacidadesRestauradas);
        $qtdTiposCapacidadesInexistentes = count($tipoCapacidadesInexistentes);
        $qtdCapacidadesRepetidas = count($capacidadesRepetidas);

        echo("*** CapacidadeSeeder ***" . ".\n");
        echo("Quantidade total de capacidades: ". $qtdCapacidades . ".\n");
        echo("Quantidade de capacidades removidas: " . $qtdCapacidadesRemovidas . ".\n");
        echo("Quantidade de capacidades restauradas: ". $qtdCapacidadesRestauradas . ".\n");
        echo("Quantidade de capacidades usadas que não existem na tabela tipos_capacidades: ". $qtdTiposCapacidadesInexistentes . ".\n");
        echo("Quantidade de capacidades repetidas no mesmo perfil e não registradas na tabela capacidades: ". $qtdCapacidadesRepetidas . ".\n");
        echo("*********************************" . ".\n");
    }
}
