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
        $capacidades_participante = array(
            array(
                "codigo" => "CTXT_EXEC",
            ),
            array(
                "codigo" => "MOD_ACESSO",
            ),
            array(
                "codigo" => "MOD_AFT",
            ),
            array(
                "codigo" => "MOD_AFT_EDT",
            ),
            array(
                "codigo" => "MOD_AFT_INCL",
            ),
            array(
                "codigo" => "MOD_ATV",
            ),
            array(
                "codigo" => "MOD_ATV_CLONAR",
            ),
            array(
                "codigo" => "MOD_ATV_EDT",
            ),
            array(
                "codigo" => "MOD_ATV_EXCL",
            ),
            array(
                "codigo" => "MOD_ATV_INCL",
            ),
            array(
                "codigo" => "MOD_ATV_INICIO",
            ),
            array(
                "codigo" => "MOD_ATV_RESP_INICIAR",
            ),
            array(
                "codigo" => "MOD_ATV_TIPO_ATV_VAZIO",
            ),
            array(
                "codigo" => "MOD_ATV_TRF_CONS",
            ),
            array(
                "codigo" => "MOD_ATV_TRF_EDT",
            ),
            array(
                "codigo" => "MOD_ATV_TRF_EXCL",
            ),
            array(
                "codigo" => "MOD_ATV_TRF_INCL",
            ),
            array(
                "codigo" => "MOD_CTXT",
            ),
            array(
                "codigo" => "MOD_OCOR",
            ),
            array(
                "codigo" => "MOD_OCOR_EDT",
            ),
            array(
                "codigo" => "MOD_OCOR_INCL",
            ),
            array(
                "codigo" => "MOD_PENT",
            ),
            array(
                "codigo" => "MOD_PRGT",
            ),
            array(
                "codigo" => "MOD_PTR",
            ),
            array(
                "codigo" => "MOD_PTR_CNC",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD_REC_AVAL",
            ),
            array(
                "codigo" => "MOD_PTR_EDT",
            ),
            array(
                "codigo" => "MOD_PTR_EDT_ATV",
            ),
            array(
                "codigo" => "MOD_PTR_ENTR",
            ),
            array(
                "codigo" => "MOD_PTR_ENTR_EDT",
            ),
            array(
                "codigo" => "MOD_PTR_ENTR_INCL",
            ),
            array(
                "codigo" => "MOD_PTR_INCL",
            ),
            array(
                "codigo" => "MOD_PTR_USERS_INCL",
            ),
            array(
                "codigo" => "MOD_TRF",
            ),
            array(
                "codigo" => "MOD_USER",
            ),
            array(
                "codigo" => "MOD_USER_TUDO",
            ),
        );

        $capacidades_chefia_de_unidade_executora = array(
            array(
                "codigo" => "CTXT_GEST",
            ),
            array(
                "codigo" => "MENU_GESTAO_ACESSO",
            ),
            array(
                "codigo" => "MENU_REL_ACESSO",
            ),
            array(
                "codigo" => "MOD_ACESSO",
            ),
            array(
                "codigo" => "MOD_AFT",
            ),
            array(
                "codigo" => "MOD_AFT_EDT",
            ),
            array(
                "codigo" => "MOD_AFT_EXCL",
            ),
            array(
                "codigo" => "MOD_AFT_INCL",
            ),
            array(
                "codigo" => "MOD_ATV",
            ),
            array(
                "codigo" => "MOD_ATV_CLONAR",
            ),
            array(
                "codigo" => "MOD_ATV_EDT",
            ),
            array(
                "codigo" => "MOD_ATV_INCL",
            ),
            array(
                "codigo" => "MOD_ATV_INICIO",
            ),
            array(
                "codigo" => "MOD_ATV_RESP_INICIAR",
            ),
            array(
                "codigo" => "MOD_ATV_TIPO_ATV_VAZIO",
            ),
            array(
                "codigo" => "MOD_ATV_TRF_CONS",
            ),
            array(
                "codigo" => "MOD_ATV_TRF_EDT",
            ),
            array(
                "codigo" => "MOD_ATV_TRF_EXCL",
            ),
            array(
                "codigo" => "MOD_ATV_TRF_INCL",
            ),
            array(
                "codigo" => "MOD_ATV_USU_EXT",
            ),
            array(
                "codigo" => "MOD_CTXT",
            ),
            array(
                "codigo" => "MOD_OCOR",
            ),
            array(
                "codigo" => "MOD_OCOR_EDT",
            ),
            array(
                "codigo" => "MOD_OCOR_INCL",
            ),
            array(
                "codigo" => "MOD_PART",
            ),
            array(
                "codigo" => "MOD_PENT",
            ),
            array(
                "codigo" => "MOD_PENT_ARQ",
            ),
            array(
                "codigo" => "MOD_PENT_AVAL",
            ),
            array(
                "codigo" => "MOD_PENT_AVAL_SUBORD",
            ),
            array(
                "codigo" => "MOD_PENT_CANC_AVAL",
            ),
            array(
                "codigo" => "MOD_PENT_CANC_HOMOL",
            ),
            array(
                "codigo" => "MOD_PENT_CONC",
            ),
            array(
                "codigo" => "MOD_PENT_EDT",
            ),
            array(
                "codigo" => "MOD_PENT_EDT_ATV_ATV",
            ),
            array(
                "codigo" => "MOD_PENT_EDT_ATV_HOMOL",
            ),
            array(
                "codigo" => "MOD_PENT_EDT_FLH",
            ),
            array(
                "codigo" => "MOD_PENT_ENTR_EDT",
            ),
            array(
                "codigo" => "MOD_PENT_ENTR_EXTRPL",
            ),
            array(
                "codigo" => "MOD_PENT_ENTR_INCL",
            ),
            array(
                "codigo" => "MOD_PENT_EXCL",
            ),
            array(
                "codigo" => "MOD_PENT_HOMOL",
            ),
            array(
                "codigo" => "MOD_PENT_INCL",
            ),
            array(
                "codigo" => "MOD_PENT_LIB_HOMOL",
            ),
            array(
                "codigo" => "MOD_PENT_RET_HOMOL",
            ),
            array(
                "codigo" => "MOD_PLAN_INST",
            ),
            array(
                "codigo" => "MOD_PRGT",
            ),
            array(
                "codigo" => "MOD_PTR",
            ),
            array(
                "codigo" => "MOD_PTR_CNC",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD_AVAL",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD_REC_AVAL",
            ),
            array(
                "codigo" => "MOD_PTR_EDT",
            ),
            array(
                "codigo" => "MOD_PTR_EDT_ATV",
            ),
            array(
                "codigo" => "MOD_PTR_ENTR",
            ),
            array(
                "codigo" => "MOD_PTR_ENTR_EDT",
            ),
            array(
                "codigo" => "MOD_PTR_ENTR_EXCL",
            ),
            array(
                "codigo" => "MOD_PTR_ENTR_INCL",
            ),
            array(
                "codigo" => "MOD_PTR_ENTR_INCL",
            ),
            array(
                "codigo" => "MOD_PTR_INCL",
            ),
            array(
                "codigo" => "MOD_PTR_USERS_INCL",
            ),
            array(
                "codigo" => "MOD_RX",
            ),
            array(
                "codigo" => "MOD_RX_EDT_OPO",
            ),
            array(
                "codigo" => "MOD_RX_VIS_ATR",
            ),
            array(
                "codigo" => "MOD_RX_VIS_DPE",
            ),
            array(
                "codigo" => "MOD_RX_VIS_DPR",
            ),
            array(
                "codigo" => "MOD_RX_VIS_OPO",
            ),
            array(
                "codigo" => "MOD_TIPO_ATV",
            ),
            array(
                "codigo" => "MOD_TIPO_ATV_EDT_UND",
            ),
            array(
                "codigo" => "MOD_TIPO_ATV_INCL",
            ),
            array(
                "codigo" => "MOD_TIPO_MTV_AFT",
            ),
            array(
                "codigo" => "MOD_TIPO_TRF",
            ),
            array(
                "codigo" => "MOD_TIPO_TRF_EDT",
            ),
            array(
                "codigo" => "MOD_TIPO_TRF_INCL",
            ),
            array(
                "codigo" => "MOD_TRF",
            ),
            array(
                "codigo" => "MOD_TRF_EDT",
            ),
            array(
                "codigo" => "MOD_TRF_EXCL",
            ),
            array(
                "codigo" => "MOD_TRF_INCL",
            ),
            array(
                "codigo" => "MOD_UND",
            ),
            array(
                "codigo" => "MOD_UND_EDT",
            ),
            array(
                "codigo" => "MOD_UND_EDT_FRM",
            ),
            array(
                "codigo" => "MOD_UND_INCL",
            ),
            array(
                "codigo" => "MOD_UND_TUDO",
            ),
            array(
                "codigo" => "MOD_USER",
            ),
            array(
                "codigo" => "MOD_USER_TUDO",
            ),
        );

        $capacidades_administrador_negocial = array(
            array(
                "codigo" => "CTXT_EXEC",
            ),
            array(
                "codigo" => "CTXT_GEST",
            ),
            array(
                "codigo" => "DASH_PRG",
            ),
            array(
                "codigo" => "MENU_CAD_ACESSO",
            ),
            array(
                "codigo" => "MENU_CONFIG_ACESSO",
            ),
            array(
                "codigo" => "MENU_GESTAO_ACESSO",
            ),
            array(
                "codigo" => "MENU_REL_ACESSO",
            ),
            array(
                "codigo" => "MOD_ACESSO",
            ),
            array(
                "codigo" => "MOD_AFT",
            ),
            array(
                "codigo" => "MOD_AFT_EDT",
            ),
            array(
                "codigo" => "MOD_AFT_EXCL",
            ),
            array(
                "codigo" => "MOD_AFT_INCL",
            ),
            array(
                "codigo" => "MOD_ATV",
            ),
            array(
                "codigo" => "MOD_ATV_CLONAR",
            ),
            array(
                "codigo" => "MOD_ATV_EDT",
            ),
            array(
                "codigo" => "MOD_ATV_EXCL",
            ),
            array(
                "codigo" => "MOD_ATV_INCL",
            ),
            array(
                "codigo" => "MOD_ATV_INICIO",
            ),
            array(
                "codigo" => "MOD_ATV_RESP_INICIAR",
            ),
            array(
                "codigo" => "MOD_ATV_TIPO_ATV_VAZIO",
            ),
            array(
                "codigo" => "MOD_ATV_TRF_CONS",
            ),
            array(
                "codigo" => "MOD_ATV_TRF_EDT",
            ),
            array(
                "codigo" => "MOD_ATV_TRF_EXCL",
            ),
            array(
                "codigo" => "MOD_ATV_TRF_INCL",
            ),
            array(
                "codigo" => "MOD_ATV_USU_EXT",
            ),
            array(
                "codigo" => "MOD_CADV",
            ),
            array(
                "codigo" => "MOD_CADV_EDT",
            ),
            array(
                "codigo" => "MOD_CADV_EXCL",
            ),
            array(
                "codigo" => "MOD_CADV_INCL",
            ),
            array(
                "codigo" => "MOD_CFG",
            ),
            array(
                "codigo" => "MOD_CFG_PERFS",
            ),
            array(
                "codigo" => "MOD_CFG_UND",
            ),
            array(
                "codigo" => "MOD_CFG_USER",
            ),
            array(
                "codigo" => "MOD_CFG_USER_CPF",
            ),
            array(
                "codigo" => "MOD_CFG_USER_MAT",
            ),
            array(
                "codigo" => "MOD_CFG_USER_PERFIL",
            ),
            array(
                "codigo" => "MOD_CID",
            ),
            array(
                "codigo" => "MOD_CTXT",
            ),
            array(
                "codigo" => "MOD_ENTD",
            ),
            array(
                "codigo" => "MOD_ENTD_EDT",
            ),
            array(
                "codigo" => "MOD_ENTRG",
            ),
            array(
                "codigo" => "MOD_ENTRG_EDT",
            ),
            array(
                "codigo" => "MOD_ENTRG_EXCL",
            ),
            array(
                "codigo" => "MOD_ENTRG_INCL",
            ),
            array(
                "codigo" => "MOD_EXTM",
            ),
            array(
                "codigo" => "MOD_EXTM_EDT",
            ),
            array(
                "codigo" => "MOD_EXTM_EXCL",
            ),
            array(
                "codigo" => "MOD_EXTM_INCL",
            ),
            array(
                "codigo" => "MOD_FER",
            ),
            array(
                "codigo" => "MOD_FER_EDT",
            ),
            array(
                "codigo" => "MOD_FER_EXCL",
            ),
            array(
                "codigo" => "MOD_FER_INCL",
            ),
            array(
                "codigo" => "MOD_PENT",
            ),
            array(
                "codigo" => "MOD_PENT_ARQ",
            ),
            array(
                "codigo" => "MOD_PENT_AVAL",
            ),
            array(
                "codigo" => "MOD_PENT_AVAL_SUBORD",
            ),
            array(
                "codigo" => "MOD_PENT_CANC_AVAL",
            ),
            array(
                "codigo" => "MOD_PENT_CANC_CONCL",
            ),
            array(
                "codigo" => "MOD_PENT_CANC_HOMOL",
            ),
            array(
                "codigo" => "MOD_PENT_CNC",
            ),
            array(
                "codigo" => "MOD_PENT_CONC",
            ),
            array(
                "codigo" => "MOD_PENT_EDT",
            ),
            array(
                "codigo" => "MOD_PENT_EDT_ATV_ATV",
            ),
            array(
                "codigo" => "MOD_PENT_EDT_ATV_HOMOL",
            ),
            array(
                "codigo" => "MOD_PENT_EDT_FLH",
            ),
            array(
                "codigo" => "MOD_PENT_ENTR_EDT",
            ),
            array(
                "codigo" => "MOD_PENT_ENTR_EXCL",
            ),
            array(
                "codigo" => "MOD_PENT_ENTR_INCL",
            ),
            array(
                "codigo" => "MOD_PENT_ENTR_PRO_EDT",
            ),
            array(
                "codigo" => "MOD_PENT_ENTR_PRO_EXCL",
            ),
            array(
                "codigo" => "MOD_PENT_ENTR_PRO_INCL",
            ),
            array(
                "codigo" => "MOD_PENT_EXCL",
            ),
            array(
                "codigo" => "MOD_PENT_HOMOL",
            ),
            array(
                "codigo" => "MOD_PENT_INCL",
            ),
            array(
                "codigo" => "MOD_PENT_LIB_HOMOL",
            ),
            array(
                "codigo" => "MOD_PENT_QQR_UND",
            ),
            array(
                "codigo" => "MOD_PENT_RET_HOMOL",
            ),
            array(
                "codigo" => "MOD_PENT_RTV",
            ),
            array(
                "codigo" => "MOD_PENT_SUSP",
            ),
            array(
                "codigo" => "MOD_PERF_EDT",
            ),
            array(
                "codigo" => "MOD_PLAN_INST",
            ),
            array(
                "codigo" => "MOD_PLAN_INST_EDT",
            ),
            array(
                "codigo" => "MOD_PLAN_INST_EXCL",
            ),
            array(
                "codigo" => "MOD_PLAN_INST_INCL",
            ),
            array(
                "codigo" => "MOD_PLAN_INST_INCL_UNEX_LOTPRI",
            ),
            array(
                "codigo" => "MOD_PLAN_INST_INCL_UNEX_QQLOT",
            ),
            array(
                "codigo" => "MOD_PLAN_INST_INCL_UNEX_QUALQUER",
            ),
            array(
                "codigo" => "MOD_PLAN_INST_INCL_UNEX_SUBORD",
            ),
            array(
                "codigo" => "MOD_PLAN_INST_INCL_UNID_INST",
            ),
            array(
                "codigo" => "MOD_PRGT",
            ),
            array(
                "codigo" => "MOD_PRGT_EDT",
            ),
            array(
                "codigo" => "MOD_PRGT_EXCL",
            ),
            array(
                "codigo" => "MOD_PRGT_INCL",
            ),
            array(
                "codigo" => "MOD_PTR",
            ),
            array(
                "codigo" => "MOD_PTR_CNC",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD_AVAL",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD_CANC_AVAL",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD_CONCL",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD_DES_CONCL",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD_EDT",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD_EXCL",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD_INCL",
            ),
            array(
                "codigo" => "MOD_PTR_CSLD_REC_AVAL",
            ),
            array(
                "codigo" => "MOD_PTR_EDT",
            ),
            array(
                "codigo" => "MOD_PTR_EDT_ATV",
            ),
            array(
                "codigo" => "MOD_PTR_ENTR",
            ),
            array(
                "codigo" => "MOD_PTR_ENTR_EDT",
            ),
            array(
                "codigo" => "MOD_PTR_ENTR_EXCL",
            ),
            array(
                "codigo" => "MOD_PTR_ENTR_INCL",
            ),
            array(
                "codigo" => "MOD_PTR_INCL",
            ),
            array(
                "codigo" => "MOD_PTR_INTSC_DATA",
            ),
            array(
                "codigo" => "MOD_PTR_USERS_INCL",
            ),
            array(
                "codigo" => "MOD_TEMP",
            ),
            array(
                "codigo" => "MOD_TIPO_AVAL",
            ),
            array(
                "codigo" => "MOD_TIPO_AVAL_EDT",
            ),
            array(
                "codigo" => "MOD_TIPO_AVAL_EXCL",
            ),
            array(
                "codigo" => "MOD_TIPO_AVAL_INCL",
            ),
            array(
                "codigo" => "MOD_TIPO_CAP",
            ),
            array(
                "codigo" => "MOD_TIPO_CAP_EDT",
            ),
            array(
                "codigo" => "MOD_TIPO_CAP_EXCL",
            ),
            array(
                "codigo" => "MOD_TIPO_CAP_INCL",
            ),
            array(
                "codigo" => "MOD_TIPO_DOC",
            ),
            array(
                "codigo" => "MOD_TIPO_DOC_EDT",
            ),
            array(
                "codigo" => "MOD_TIPO_DOC_EXCL",
            ),
            array(
                "codigo" => "MOD_TIPO_DOC_INCL",
            ),
            array(
                "codigo" => "MOD_TIPO_JUST",
            ),
            array(
                "codigo" => "MOD_TIPO_JUST_EDT",
            ),
            array(
                "codigo" => "MOD_TIPO_JUST_EXCL",
            ),
            array(
                "codigo" => "MOD_TIPO_JUST_INCL",
            ),
            array(
                "codigo" => "MOD_TIPO_MDL",
            ),
            array(
                "codigo" => "MOD_TIPO_MDL_EDT",
            ),
            array(
                "codigo" => "MOD_TIPO_MDL_EXCL",
            ),
            array(
                "codigo" => "MOD_TIPO_MDL_INCL",
            ),
            array(
                "codigo" => "MOD_TIPO_MTV_AFT",
            ),
            array(
                "codigo" => "MOD_TIPO_MTV_AFT_EDT",
            ),
            array(
                "codigo" => "MOD_TIPO_MTV_AFT_EXCL",
            ),
            array(
                "codigo" => "MOD_TIPO_MTV_AFT_INCL",
            ),
            array(
                "codigo" => "MOD_TIPO_PROC",
            ),
            array(
                "codigo" => "MOD_TIPO_PROC_EDT",
            ),
            array(
                "codigo" => "MOD_TIPO_PROC_EXCL",
            ),
            array(
                "codigo" => "MOD_TIPO_PROC_INCL",
            ),
            array(
                "codigo" => "MOD_TIPO_TRF",
            ),
            array(
                "codigo" => "MOD_TIPO_TRF_EDT",
            ),
            array(
                "codigo" => "MOD_TIPO_TRF_EXCL",
            ),
            array(
                "codigo" => "MOD_TIPO_TRF_INCL",
            ),
            array(
                "codigo" => "MOD_TPMAF_INCL",
            ),
            array(
                "codigo" => "MOD_TRF",
            ),
            array(
                "codigo" => "MOD_TRF_EDT",
            ),
            array(
                "codigo" => "MOD_TRF_EXCL",
            ),
            array(
                "codigo" => "MOD_TRF_INCL",
            ),
            array(
                "codigo" => "MOD_UND",
            ),
            array(
                "codigo" => "MOD_UND_INTG",
            ),
            array(
                "codigo" => "MOD_UND_INTG_EDT",
            ),
            array(
                "codigo" => "MOD_UND_INTG_GST",
            ),
            array(
                "codigo" => "MOD_UND_TUDO",
            ),
            array(
                "codigo" => "MOD_USER",
            ),
            array(
                "codigo" => "MOD_USER_ATRIB",
            ),
            array(
                "codigo" => "MOD_USER_EDT",
            ),
            array(
                "codigo" => "MOD_USER_TUDO",
            ),
        );

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
