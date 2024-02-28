<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
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

    public function __construct()
    {
        $this->timenow = now();
        $this->utilService = new UtilService();
    }

    public function run()
    {


        $this->seedCapacidades("Participante", [
            "CTXT_EXEC",
            "MOD_AFT",
            "MOD_AFT_EDT",
            "MOD_AFT_INCL",
            "MOD_ATV",
            "MOD_ATV_CLONAR",
            "MOD_ATV_EDT",
            "MOD_ATV_EXCL",
            "MOD_ATV_INCL",
            "MOD_ATV_INICIO",
            "MOD_ATV_RESP_INICIAR",
            "MOD_ATV_TIPO_ATV_VAZIO",
            "MOD_ATV_TRF_CONS",
            "MOD_ATV_TRF_EDT",
            "MOD_ATV_TRF_EXCL",
            "MOD_ATV_TRF_INCL",
            "MOD_CTXT",
            "MOD_OCOR",
            "MOD_OCOR_EDT",
            "MOD_OCOR_INCL",
            "MOD_PENT",
            "MOD_PRGT",
            "MOD_PTR",
            "MOD_PTR_CNC",
            "MOD_PTR_CSLD",
            "MOD_PTR_CSLD_REC_AVAL",
            "MOD_PTR_EDT",
            "MOD_PTR_EDT_ATV",
            "MOD_PTR_ENTR",
            "MOD_PTR_ENTR_EDT",
            "MOD_PTR_ENTR_INCL",
            "MOD_PTR_INCL",
            "MOD_PTR_USERS_INCL",
            "MOD_TRF",
            "MOD_USER",
            "MOD_USER_TUDO",
        ]);


        $this->seedCapacidades("Chefia de Unidade Executora", [
            "CTXT_GEST",
            "MENU_GESTAO_ACESSO",
            "MOD_AFT",
            "MOD_AFT_EDT",
            "MOD_AFT_EXCL",
            "MOD_AFT_INCL",
            "MOD_ATV",
            "MOD_ATV_CLONAR",
            "MOD_ATV_EDT",
            "MOD_ATV_INCL",
            "MOD_ATV_INICIO",
            "MOD_ATV_RESP_INICIAR",
            "MOD_ATV_TIPO_ATV_VAZIO",
            "MOD_ATV_TRF_CONS",
            "MOD_ATV_TRF_EDT",
            "MOD_ATV_TRF_EXCL",
            "MOD_ATV_TRF_INCL",
            "MOD_ATV_USU_EXT",
            "MOD_CTXT",
            "MOD_OCOR",
            "MOD_OCOR_EDT",
            "MOD_OCOR_INCL",
            "MOD_PART",
            "MOD_PART_DESAB",
            "MOD_PART_HAB",
            "MOD_PART_INCL",
            "MOD_PENT",
            "MOD_PENT_ARQ",
            "MOD_PENT_AVAL",
            "MOD_PENT_AVAL_SUBORD",
            "MOD_PENT_CANC_AVAL",
            "MOD_PENT_CANC_HOMOL",
            "MOD_PENT_CONC",
            "MOD_PENT_EDT",
            "MOD_PENT_EDT_ATV_ATV",
            "MOD_PENT_EDT_ATV_HOMOL",
            "MOD_PENT_EDT_FLH",
            "MOD_PENT_ENTR_EDT",
            "MOD_PENT_ENTR_EXTRPL",
            "MOD_PENT_ENTR_INCL",
            "MOD_PENT_EXCL",
            "MOD_PENT_HOMOL",
            "MOD_PENT_INCL",
            "MOD_PENT_LIB_HOMOL",
            "MOD_PENT_RET_HOMOL",
            "MOD_PLAN_INST",
            "MOD_PTR",
            "MOD_PTR_CNC",
            "MOD_PTR_CSLD",
            "MOD_PTR_CSLD_AVAL",
            "MOD_PTR_CSLD_REC_AVAL",
            "MOD_PTR_EDT",
            "MOD_PTR_EDT_ATV",
            "MOD_PTR_ENTR",
            "MOD_PTR_ENTR_EDT",
            "MOD_PTR_ENTR_EXCL",
            "MOD_PTR_ENTR_INCL",
            "MOD_PTR_INCL",
            "MOD_PTR_USERS_INCL",
            "MOD_RX_CURR",
            "MOD_RX_CURR_EDT",
            "MOD_RX_CURR_INCL",
            "MOD_RX_CURR_EXCL",
            "MOD_RX_OPO",
            "MOD_RX_OUT",
            "MOD_TIPO_ATV",
            "MOD_TIPO_ATV_EDT_UND",
            "MOD_TIPO_ATV_INCL",
            "MOD_TIPO_MTV_AFT",
            "MOD_TIPO_TRF",
            "MOD_TIPO_TRF_EDT",
            "MOD_TIPO_TRF_INCL",
            "MOD_TRF",
            "MOD_TRF_EDT",
            "MOD_TRF_EXCL",
            "MOD_TRF_INCL",
            "MOD_UND",
            "MOD_UND_EDT",
            "MOD_UND_EDT_FRM",
            "MOD_UND_INCL",
            "MOD_UND_TUDO",
            "MOD_USER",
            "MOD_USER_TUDO",
        ]);

        $this->seedCapacidades("Administrador Negocial", [
            "CTXT_EXEC",
            "CTXT_GEST",
            "MENU_CAD_ACESSO",
            "MENU_CONFIG_ACESSO",
            "MENU_GESTAO_ACESSO",
            "MOD_AFT",
            "MOD_AFT_EDT",
            "MOD_AFT_EXCL",
            "MOD_AFT_INCL",
            "MOD_ATV",
            "MOD_ATV_CLONAR",
            "MOD_ATV_EDT",
            "MOD_ATV_EXCL",
            "MOD_ATV_INCL",
            "MOD_ATV_INICIO",
            "MOD_ATV_RESP_INICIAR",
            "MOD_ATV_TIPO_ATV_VAZIO",
            "MOD_ATV_TRF_CONS",
            "MOD_ATV_TRF_EDT",
            "MOD_ATV_TRF_EXCL",
            "MOD_ATV_TRF_INCL",
            "MOD_ATV_USU_EXT",
            "MOD_ATV_DASH",
            "MOD_CADV",
            "MOD_CADV_EDT",
            "MOD_CADV_EXCL",
            "MOD_CADV_INCL",
            "MOD_CFG",
            "MOD_CFG_PERFS",
            "MOD_CFG_UND",
            "MOD_CFG_USER",
            "MOD_CFG_USER_CPF",
            "MOD_CFG_USER_MAT",
            "MOD_CFG_USER_PERFIL",
            "MOD_CID",
            "MOD_CTXT",
            "MOD_ENTD",
            "MOD_ENTD_EDT",
            "MOD_ENTRG",
            "MOD_ENTRG_EDT",
            "MOD_ENTRG_EXCL",
            "MOD_ENTRG_INCL",
            "MOD_EXTM",
            "MOD_EXTM_EDT",
            "MOD_EXTM_EXCL",
            "MOD_EXTM_INCL",
            "MOD_FER",
            "MOD_FER_EDT",
            "MOD_FER_EXCL",
            "MOD_FER_INCL",
            "MOD_PENT",
            "MOD_PENT_ARQ",
            "MOD_PENT_AVAL",
            "MOD_PENT_AVAL_SUBORD",
            "MOD_PENT_CANC_AVAL",
            "MOD_PENT_CANC_CONCL",
            "MOD_PENT_CANC_HOMOL",
            "MOD_PENT_CNC",
            "MOD_PENT_CONC",
            "MOD_PENT_EDT",
            "MOD_PENT_EDT_ATV_ATV",
            "MOD_PENT_EDT_ATV_HOMOL",
            "MOD_PENT_EDT_FLH",
            "MOD_PENT_ENTR_EDT",
            "MOD_PENT_ENTR_EXCL",
            "MOD_PENT_ENTR_INCL",
            "MOD_PENT_ENTR_PRO_EDT",
            "MOD_PENT_ENTR_PRO_EXCL",
            "MOD_PENT_ENTR_PRO_INCL",
            "MOD_PENT_EXCL",
            "MOD_PENT_HOMOL",
            "MOD_PENT_INCL",
            "MOD_PENT_LIB_HOMOL",
            "MOD_PENT_QQR_UND",
            "MOD_PENT_RET_HOMOL",
            "MOD_PENT_RTV",
            "MOD_PENT_SUSP",
            "MOD_PERF_EDT",
            "MOD_PLAN_INST",
            "MOD_PLAN_INST_EDT",
            "MOD_PLAN_INST_EXCL",
            "MOD_PLAN_INST_INCL",
            "MOD_PLAN_INST_INCL_UNEX_LOTPRI",
            "MOD_PLAN_INST_INCL_UNEX_QQLOT",
            "MOD_PLAN_INST_INCL_UNEX_QUALQUER",
            "MOD_PLAN_INST_INCL_UNEX_SUBORD",
            "MOD_PLAN_INST_INCL_UNID_INST",
            "MOD_PRGT",
            "MOD_PRGT_EDT",
            "MOD_PRGT_EXCL",
            "MOD_PRGT_INCL",
            "MOD_PTR",
            "MOD_PTR_CNC",
            "MOD_PTR_CSLD",
            "MOD_PTR_CSLD_AVAL",
            "MOD_PTR_CSLD_CANC_AVAL",
            "MOD_PTR_CSLD_CONCL",
            "MOD_PTR_CSLD_DES_CONCL",
            "MOD_PTR_CSLD_EDT",
            "MOD_PTR_CSLD_EXCL",
            "MOD_PTR_CSLD_INCL",
            "MOD_PTR_CSLD_REC_AVAL",
            "MOD_PTR_EDT",
            "MOD_PTR_EDT_ATV",
            "MOD_PTR_ENTR",
            "MOD_PTR_ENTR_EDT",
            "MOD_PTR_ENTR_EXCL",
            "MOD_PTR_ENTR_INCL",
            "MOD_PTR_INCL",
            "MOD_PTR_INTSC_DATA",
            "MOD_PTR_USERS_INCL",
            "MOD_TEMP",
            "MOD_TIPO_AVAL",
            "MOD_TIPO_AVAL_EDT",
            "MOD_TIPO_AVAL_EXCL",
            "MOD_TIPO_AVAL_INCL",
            "MOD_TIPO_CAP",
            "MOD_TIPO_CAP_EDT",
            "MOD_TIPO_CAP_EXCL",
            "MOD_TIPO_CAP_INCL",
            "MOD_TIPO_DOC",
            "MOD_TIPO_DOC_EDT",
            "MOD_TIPO_DOC_EXCL",
            "MOD_TIPO_DOC_INCL",
            "MOD_TIPO_JUST",
            "MOD_TIPO_JUST_EDT",
            "MOD_TIPO_JUST_EXCL",
            "MOD_TIPO_JUST_INCL",
            "MOD_TIPO_MDL",
            "MOD_TIPO_MDL_EDT",
            "MOD_TIPO_MDL_EXCL",
            "MOD_TIPO_MDL_INCL",
            "MOD_TIPO_MTV_AFT",
            "MOD_TIPO_MTV_AFT_EDT",
            "MOD_TIPO_MTV_AFT_EXCL",
            "MOD_TIPO_MTV_AFT_INCL",
            "MOD_TIPO_PROC",
            "MOD_TIPO_PROC_EDT",
            "MOD_TIPO_PROC_EXCL",
            "MOD_TIPO_PROC_INCL",
            "MOD_TIPO_TRF",
            "MOD_TIPO_TRF_EDT",
            "MOD_TIPO_TRF_EXCL",
            "MOD_TIPO_TRF_INCL",
            "MOD_TPMAF_INCL",
            "MOD_TRF",
            "MOD_TRF_EDT",
            "MOD_TRF_EXCL",
            "MOD_TRF_INCL",
            "MOD_UND",
            "MOD_UND_INTG",
            "MOD_UND_INTG_EDT",
            "MOD_UND_INTG_GST",
            "MOD_UND_TUDO",
            "MOD_USER",
            "MOD_USER_ATRIB",
            "MOD_USER_EDT",
            "MOD_USER_TUDO",
        ]);        

        $this->cleanupCapacidades();
    }




    protected function seedCapacidades($perfilNome, $capacidades)
    {
        $perfilId = Perfil::where('nome', $perfilNome)->firstOrFail()->id;

        foreach ($capacidades as $codigo) {
            $tipoCapacidadeId = $this->utilService->uuid($codigo);

            $capacidade = [
                "id" => $this->utilService->uuid($perfilNome . $codigo),
                "created_at" => $this->timenow,
                "updated_at" => $this->timenow,
                "deleted_at" => null,
                "perfil_id" => $perfilId,
                "tipo_capacidade_id" => $tipoCapacidadeId,
            ];

            if (TipoCapacidade::find($tipoCapacidadeId)) {
                Capacidade::updateOrCreate(['id' => $capacidade['id']], $capacidade);
            }
        }
    }

    protected function cleanupCapacidades()
    {
        $perfilDesenvolvedorId = Perfil::where('nome', 'Desenvolvedor')->firstOrFail()->id;

        $qtdCapacidadesRemovidas = Capacidade::whereNotIn('perfil_id', [$perfilDesenvolvedorId])->delete();
        $qtdCapacidades = Capacidade::count();

        echo ("*** CapacidadeSeeder ***" . ".\n");
        echo ("Quantidade total de capacidades: " . $qtdCapacidades . ".\n");
        echo ("Quantidade de capacidades removidas: " . $qtdCapacidadesRemovidas . ".\n");
        echo ("*********************************" . ".\n");
    }
}
