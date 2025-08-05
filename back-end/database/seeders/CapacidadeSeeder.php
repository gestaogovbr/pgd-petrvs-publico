<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Capacidade;
use App\Models\Perfil;
use App\Models\TipoCapacidade;
use App\Services\UtilService;
use App\Services\NivelAcessoService;

class CapacidadeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */

  public $timenow;
  public $utilService;
  public $nivelAcessoService;

  public function __construct()
  {
    $this->timenow = now();
    $this->utilService = new UtilService();
    $this->nivelAcessoService = new NivelAcessoService();
  }

  public function run()
  {
    $capacidades_participante = [
      ["codigo" => "CTXT_EXEC"],
      ["codigo" => "MENU_GESTAO_ACESSO"],
      ["codigo" => "MOD_AFT"],
      ["codigo" => "MOD_AFT_EDT"],
      ["codigo" => "MOD_AFT_INCL"],
      ["codigo" => "MOD_AFT_EXCL"],
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
      ["codigo" => "MOD_ENTD"],
      ["codigo" => "MOD_PTR"],
      ["codigo" => "MOD_PTR_CNC"],
      ["codigo" => "MOD_PTR_CSLD"],
      ["codigo" => "MOD_PTR_CSLD_REC_AVAL"],
      ["codigo" => "MOD_PTR_EDT"],
      ["codigo" => "MOD_PTR_EDT_ATV"],
      ["codigo" => "MOD_PTR_ENTR"],
      ["codigo" => "MOD_PTR_ENTR_EDT"],
      ["codigo" => "MOD_PTR_ENTR_INCL"],
      ["codigo" => "MOD_PTR_INCL"],
      ["codigo" => "MOD_PTR_USERS_INCL"],
      ["codigo" => "MOD_RELATORIOS"],
      ["codigo" => "MOD_RELATORIO_USUARIO"],
      ["codigo" => "MOD_RELATORIO_UNIDADE"],
      ["codigo" => "MOD_TRF"],
      ["codigo" => "MOD_UND_TUDO"],
      ["codigo" => "MOD_USER"],
      ["codigo" => "MOD_USER_TUDO"],
      ["codigo" => "MOD_PENT"],
      ["codigo" => "MOD_PRGT"],
      ["codigo" => "MOD_PROD"],
      ["codigo" => "MOD_PROD_INCL"],
      ["codigo" => "MOD_PROD_EDT"],
      ["codigo" => "MOD_PROD_EXCL"],
      ["codigo" => "MOD_RELATORIOS"],
      ["codigo" => "MOD_RELATORIO_USUARIO"],
      ["codigo" => "MOD_SOLUCOES"],
      ["codigo" => "MOD_SOLUCOES_INCL"],
      ["codigo" => "MOD_SOLUCOES_EDT"],
      ["codigo" => "MOD_SOLUCOES_EXCL"],
      ["codigo" => "MOD_USER_EDT"],
      ["codigo" => "MOD_UND"],
    ];


    $capacidades_chefia_de_unidade_executora = [
      ["codigo" => "CTXT_GEST"],
      ["codigo" => "MENU_GESTAO_ACESSO"],
      ["codigo" => "ACESSO"],
      ["codigo" => "MOD_CFG_ENTD"],
      ["codigo" => "MOD_AFT"],
      ["codigo" => "MOD_AFT_EDT"],
      ["codigo" => "MOD_AFT_EXCL"],
      ["codigo" => "MOD_AFT_INCL"],
      ["codigo" => "MOD_ATV"],
      ["codigo" => "MOD_ATV_CLONAR"],
      ["codigo" => "MOD_ATV_EDT"],
      ["codigo" => "MOD_ATV_INCL"],
      ["codigo" => "MOD_ATV_EXCL"],
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
      ["codigo" => "MOD_CFG_UND"],
      ["codigo" => "MOD_CFG_USER"],
      ["codigo" => "MOD_CLI"],
      ["codigo" => "MOD_ENTD"],
      ["codigo" => "MOD_EXTM"],
      ["codigo" => "MOD_EXTM_EDT"],
      ["codigo" => "MOD_EXTM_EXCL"],
      ["codigo" => "MOD_EXTM_INCL"],
      ["codigo" => "MOD_CTXT"],
      ["codigo" => "MOD_PART"],
      ["codigo" => "MOD_PRGT_INCL"],
      ["codigo" => "MOD_PART_HAB"],
      ["codigo" => "MOD_PART_DESAB"],
      ["codigo" => "MOD_PENT"],
      ["codigo" => "MOD_PENT_ARQ"],
      ["codigo" => "MOD_PENT_AVAL"],
      ["codigo" => "MOD_PENT_AVAL_SUBORD"],
      ["codigo" => "MOD_PENT_CANC_AVAL"],
      ["codigo" => "MOD_PENT_CANC_HOMOL"],
      ["codigo" => "MOD_PENT_CONC"],
      ["codigo" => "MOD_PENT_EDT"],
      ["codigo" => "MOD_PENT_EDT_ATV_ATV"],
      ["codigo" => "MOD_PENT_EDT_ATV_HOMOL"],
      ["codigo" => "MOD_PENT_EDT_FLH"],
      ["codigo" => "MOD_PENT_ENTR_EDT"],
      ["codigo" => "MOD_PENT_ENTR_EXTRPL"],
      ["codigo" => "MOD_PENT_ENTR_INCL"],
      ["codigo" => "MOD_PENT_ENTR_EXCL"],
      ["codigo" => "MOD_PENT_ENTR_EXTRPL"],
      ["codigo" => "MOD_PENT_ENTR_INCL"],
      ["codigo" => "MOD_PENT_ENTR_PRO_EDT"],
      ["codigo" => "MOD_PENT_ENTR_PRO_EXCL"],
      ["codigo" => "MOD_PENT_ENTR_PRO_INCL"],
      ["codigo" => "MOD_PENT_RTV"],
      ["codigo" => "MOD_PENT_SUSP"],
      ["codigo" => "MOD_PENT_EXCL"],
      ["codigo" => "MOD_PENT_HOMOL"],
      ["codigo" => "MOD_PENT_INCL"],
      ["codigo" => "MOD_PENT_LIB_HOMOL"],
      ["codigo" => "MOD_PENT_RET_HOMOL"],
      ["codigo" => "MOD_PLAN_INST"],
      ["codigo" => "MOD_PLAN_INST_EDT"],
      ["codigo" => "MOD_PLAN_INST_INCL"],
      ["codigo" => "MOD_PLAN_INST_INCL_UNEX_LOTPRI"],
      ["codigo" => "MOD_PLAN_INST_INCL_UNEX_QQLOT"],
      ["codigo" => "MOD_PLAN_INST_INCL_UNEX_SUBORD"],
      ["codigo" => "MOD_PTR"],
      ["codigo" => "MOD_PTR_CNC"],
      ["codigo" => "MOD_PTR_CSLD"],
      ["codigo" => "MOD_PTR_CSLD_AVAL"],
      ["codigo" => "MOD_PTR_CSLD_REC_AVAL"],
      ["codigo" => "MOD_PTR_EDT"],
      ["codigo" => "MOD_PTR_EDT_ATV"],
      ["codigo" => "MOD_PTR_ENTR"],
      ["codigo" => "MOD_PTR_ENTR_EDT"],
      ["codigo" => "MOD_PTR_ENTR_EXCL"],
      ["codigo" => "MOD_PTR_ENTR_INCL"],
      ["codigo" => "MOD_PTR_INCL"],
      ["codigo" => "MOD_PTR_USERS_INCL"],
      ["codigo" => "MOD_PTR_CSLD_CANC_AVAL"],
      ["codigo" => "MOD_PTR_CSLD_CONCL"],
      ["codigo" => "MOD_PTR_CSLD_DES_CONCL"],
      ["codigo" => "MOD_PTR_CSLD_EDT"],
      ["codigo" => "MOD_PTR_CSLD_EXCL"],
      ["codigo" => "MOD_PTR_CSLD_INCL"],
      ["codigo" => "MOD_RELATORIOS"],
      ["codigo" => "MOD_RELATORIO_USUARIO"],
      ["codigo" => "MOD_RELATORIO_UNIDADE"],
      ["codigo" => "MOD_TIPO_ATV"],
      ["codigo" => "MOD_TIPO_ATV_EDT_UND"],
      ["codigo" => "MOD_TIPO_ATV_INCL"],
      ["codigo" => "MOD_TIPO_TRF"],
      ["codigo" => "MOD_TIPO_TRF_EDT"],
      ["codigo" => "MOD_TIPO_TRF_INCL"],
      ["codigo" => "MOD_TRF"],
      ["codigo" => "MOD_TRF_EDT"],
      ["codigo" => "MOD_TRF_EXCL"],
      ["codigo" => "MOD_TRF_INCL"],
      ["codigo" => "MOD_UND"],
      ["codigo" => "MOD_UND_EDT"],
      ["codigo" => "MOD_UND_INCL"],
      ["codigo" => "MOD_UND_TUDO"],
      ["codigo" => "MOD_USER"],
      ["codigo" => "MOD_USER_TUDO"],
      ["codigo" => "MOD_USER_EDT"],
      ["codigo" => "MOD_PROD"],
      ["codigo" => "MOD_PROD_INCL"],
      ["codigo" => "MOD_PROD_EDT"],
      ["codigo" => "MOD_PROD_EXCL"],
      ["codigo" => "MOD_SOLUCOES"],
      ["codigo" => "MOD_SOLUCOES_INCL"],
      ["codigo" => "MOD_SOLUCOES_EDT"],
      ["codigo" => "MOD_SOLUCOES_EXCL"]
    ];

    $capacidades_administrador_negocial = [
      ["codigo" => "CTXT_EXEC"],
      ["codigo" => "CTXT_GEST"],
      ["codigo" => "MOD_ATV_DASH"],
      ["codigo" => "MENU_GESTAO_ACESSO"],
      ["codigo" => "MENU_CONFIG_ACESSO"],
      ["codigo" => "MOD_CFG_ENTD"],
      ["codigo" => "ACESSO"],
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
      ["codigo" => "MOD_CFG_USER"],
      ["codigo" => "MOD_CFG_UND"],
      ["codigo" => "MOD_PERF_EDT"],
      ["codigo" => "MOD_CID"],
      ["codigo" => "MOD_CLI"],
      ["codigo" => "MOD_CTXT"],
      ["codigo" => "MOD_ENTD"],
      ["codigo" => "MOD_EXTM"],
      ["codigo" => "MOD_EXTM_EDT"],
      ["codigo" => "MOD_EXTM_EXCL"],
      ["codigo" => "MOD_EXTM_INCL"],
      ["codigo" => "MOD_PART"],
      ["codigo" => "MOD_PART_DESAB"],
      ["codigo" => "MOD_PART_HAB"],
      ["codigo" => "MOD_PART_INCL"],
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
      ["codigo" => "MOD_PRGT_CONCL"],
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
      ["codigo" => "MOD_PTR_CSLD_REC_AVAL"],
      ["codigo" => "MOD_PTR_EDT"],
      ["codigo" => "MOD_PTR_EDT_ATV"],
      ["codigo" => "MOD_PTR_ENTR"],
      ["codigo" => "MOD_PTR_ENTR_EDT"],
      ["codigo" => "MOD_PTR_ENTR_EXCL"],
      ["codigo" => "MOD_PTR_ENTR_INCL"],
      ["codigo" => "MOD_PTR_INCL"],
      ["codigo" => "MOD_PTR_INTSC_DATA"],
      ["codigo" => "MOD_PTR_USERS_INCL"],
      ["codigo" => "MOD_RELATORIOS"],
      ["codigo" => "MOD_RELATORIO_USUARIO"],
      ["codigo" => "MOD_RELATORIO_UNIDADE"],
      ["codigo" => "MOD_RELATORIO_PT"],
      ["codigo" => "MOD_RELATORIO_PE"],
      ["codigo" => "MOD_TEMP"],
      ["codigo" => "MOD_TEMP_INCL"],
      ["codigo" => "MOD_TEMP_EDT"],
      ["codigo" => "MOD_TIPO_ATV"],
      ["codigo" => "MOD_TIPO_ATV_EDT_UND"],
      ["codigo" => "MOD_TIPO_ATV_INCL"],
      ["codigo" => "MOD_TIPO_DOC"],
      ["codigo" => "MOD_TIPO_DOC_EDT"],
      ["codigo" => "MOD_TIPO_DOC_EXCL"],
      ["codigo" => "MOD_TIPO_DOC_INCL"],
      ["codigo" => "MOD_TRF"],
      ["codigo" => "MOD_TRF_EDT"],
      ["codigo" => "MOD_TRF_EXCL"],
      ["codigo" => "MOD_TRF_INCL"],
      ["codigo" => "MOD_UND"],
      ["codigo" => "MOD_UND_EDT"],
      ["codigo" => "MOD_UND_INCL"],
      ["codigo" => "MOD_UND_INTG"],
      ["codigo" => "MOD_UND_INTG_EDT"],
      ["codigo" => "MOD_UND_INTG_EXCL"],
      ["codigo" => "MOD_UND_INTG_GST"],
      ["codigo" => "MOD_UND_INTG_INCL"],
      ["codigo" => "MOD_UND_TUDO"],
      ["codigo" => "MOD_USER"],
      ["codigo" => "MOD_USER_ATRIB"],
      ["codigo" => "MOD_USER_EDT"],
      ["codigo" => "MOD_USER_INCL"],
      ["codigo" => "MOD_USER_TUDO"],
      ["codigo" => "MOD_CFG_USER_PERFIL"],
      ["codigo" => "MOD_PROD"],
      ["codigo" => "MOD_PROD_INCL"],
      ["codigo" => "MOD_PROD_EDT"],
      ["codigo" => "MOD_PROD_EXCL"],
      ["codigo" => "MOD_SOLUCOES"],
      ["codigo" => "MOD_SOLUCOES_INCL"],
      ["codigo" => "MOD_SOLUCOES_EDT"],
      ["codigo" => "MOD_SOLUCOES_EXCL"],
      ["codigo" => "MOD_TIPO_CLI"],
      ["codigo" => "MOD_TIPO_CLI_EDT"],
      ["codigo" => "MOD_TIPO_CLI_EXCL"],
      ["codigo" => "MOD_TIPO_CLI_INCL"]
    ];

    $capacidades_administrador_geral = array_merge($capacidades_administrador_negocial, [
      ["codigo" => "CTXT_DEV"],
      ["codigo" => "MOD_DEV_TUDO"],
      ["codigo" => "MENU_DEV_ACESSO"],
      ["codigo" => "MENU_DEV_CONSULTAS"],
      ["codigo" => "MOD_CFG_PERFS"],
      ["codigo" => "MOD_CLI_EDT"],
      ["codigo" => "MOD_CLI_EXCL"],
      ["codigo" => "MOD_CLI_INCL"],
      ["codigo" => "MOD_ENTD_EDT"],
      ["codigo" => "MOD_FER"],
      ["codigo" => "MOD_UND_TUDO"],
      ["codigo" => "MOD_FER_EDT"],
      ["codigo" => "MOD_FER_EXCL"],
      ["codigo" => "MOD_FER_INCL"],
      ["codigo" => "MOD_PRGT_EXT"],
      ["codigo" => "MOD_TIPO_TRF"],
      ["codigo" => "MOD_TIPO_TRF_EDT"],
      ["codigo" => "MOD_TIPO_TRF_EXCL"],
      ["codigo" => "MOD_TIPO_TRF_INCL"],
      ["codigo" => "MOD_PROD"],
      ["codigo" => "MOD_PROD_INCL"],
      ["codigo" => "MOD_PROD_EDT"],
      ["codigo" => "MOD_PROD_EXCL"],
      ["codigo" => "MOD_RELATORIO_USUARIO_TODAS_UNIDADES"],
      ["codigo" => "MOD_RELATORIO_UNIDADE_TODAS_UNIDADES"],
      ["codigo" => "MOD_UND_INST"],
      ["codigo" => "MOD_PART_PEDAGIO"],
      ["codigo" => "MOD_AUDIT_LOG"],
    ]);

    $capacidades_colaborador = array_merge(
      $capacidades_administrador_negocial,
      [
        ['codigo' => 'MOD_CFG_USER_PERFIL'],
      ]
    );
    // retirar algumas capacidades do colaborador
    $capacidades_colaborador = array_filter($capacidades_colaborador, function ($c) {
      return !in_array($c['codigo'], ["MOD_CADV_EDT", "MOD_CADV_EXCL", "MOD_CADV_INCL",  "MOD_EXTM_EDT", "MOD_EXTM_EXCL", "MOD_EXTM_INCL", "MOD_PENT_QQR_UND", "MOD_PLAN_INST_EDT", "MOD_PLAN_INST_EXCL", "MOD_PLAN_INST_INCL", "MOD_PRGT_CONCL", "MOD_PRGT_EDT", "MOD_PRGT_EXCL", "MOD_UND_INATV", "MOD_UND_INTG", "MOD_UND_INTG_EDT", "MOD_UND_INTG_EXCL", "MOD_UND_INTG_GST", "MOD_UND_INTG_INCL", "MOD_UND_INST"]);
    });

    // Inserção de dados
    $capacidadesInseridas = [];
    $capacidadesRestauradas = [];
    $tipoCapacidadesInexistentes = [];
    $capacidadesRepetidas = [];

    $devId = $this->nivelAcessoService->getPerfilDesenvolvedor()->id;
    $participanteId = $this->nivelAcessoService->getPerfilParticipante()->id;
    $colaboradorId = $this->nivelAcessoService->getPerfilColaborador()->id;
    $admGeralId = $this->nivelAcessoService->getPerfilAdministradorGeral()->id;
    $admId = $this->nivelAcessoService->getPerfilAdministrador()->id;
    $chefeId = $this->nivelAcessoService->getPerfilChefia()->id;

    foreach ($capacidades_participante as $c) {
      $capacidade = [
        "id" => $this->utilService->uuid("Participante" . $c['codigo']),
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "perfil_id" => $participanteId,
        "tipo_capacidade_id" => $this->utilService->uuid($c['codigo']),
      ];

      $queryCapacidade = Capacidade::onlyTrashed()->find($capacidade['id']);
      $queryTipoCapacidade = TipoCapacidade::find($capacidade['tipo_capacidade_id']);

      if ($queryTipoCapacidade) {
        if (!empty ($queryCapacidade)) {
          $queryCapacidade->restore();
          array_push($capacidadesRestauradas, $capacidade['id']);
        } else {
          $result = Capacidade::insertOrIgnore($capacidade);
          //if (!$result) echo("Capacidade já existe: (" . $c['codigo'] . ") Participante.\n");
        }
        !in_array($capacidade['id'], $capacidadesInseridas) ? array_push($capacidadesInseridas, $capacidade['id']) : array_push($capacidadesRepetidas, ["Participante", $c['codigo']]);
      } else {
        // echo("Erro: TipoCapacidade inexistente(" . "código: " . $c['codigo'] . " - ID: " . $capacidade['tipo_capacidade_id']. ")");
        array_push($tipoCapacidadesInexistentes, ["Participante", $c['codigo']]);
      }
    }

    foreach ($capacidades_chefia_de_unidade_executora as $c) {
      $capacidade = [
        "id" => $this->utilService->uuid("Chefia de Unidade Executora" . $c['codigo']),
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "perfil_id" => $chefeId,
        "tipo_capacidade_id" => $this->utilService->uuid($c['codigo']),
      ];
      $queryCapacidade = Capacidade::onlyTrashed()->find($capacidade['id']);
      $queryTipoCapacidade = TipoCapacidade::find($capacidade['tipo_capacidade_id']);

      if ($queryTipoCapacidade) {
        if (!empty ($queryCapacidade)) {
          $queryCapacidade->restore();
          array_push($capacidadesRestauradas, $capacidade['id']);
        } else {
          $result = Capacidade::insertOrIgnore($capacidade);
        }
        !in_array($capacidade['id'], $capacidadesInseridas) ? array_push($capacidadesInseridas, $capacidade['id']) : array_push($capacidadesRepetidas, ["Chefia de Unidade Executora", $c['codigo']]);
      } else {
        array_push($tipoCapacidadesInexistentes, ["Chefia de Unidade Executora", $c['codigo']]);
      }
    }

    foreach ($capacidades_administrador_negocial as $c) {
      $capacidade = [
        "id" => $this->utilService->uuid("Administrador Negocial Novo" . $c['codigo']),
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "perfil_id" => $admId,
        "tipo_capacidade_id" => $this->utilService->uuid($c['codigo']),
      ];

      $queryCapacidade = Capacidade::onlyTrashed()->find($capacidade['id']);
      $queryTipoCapacidade = TipoCapacidade::find($capacidade['tipo_capacidade_id']);

      if ($queryTipoCapacidade) {
        if (!empty ($queryCapacidade)) {
          $queryCapacidade->restore();
          array_push($capacidadesRestauradas, $capacidade['id']);
        } else {
          $result = Capacidade::insertOrIgnore($capacidade);
        }
        !in_array($capacidade['id'], $capacidadesInseridas) ? array_push($capacidadesInseridas, $capacidade['id']) : array_push($capacidadesRepetidas, ["Administrador Negocial", $c['codigo']]);
      } else {
        array_push($tipoCapacidadesInexistentes, ["Administrador Negocial", $c['codigo']]);
      }
    }

    foreach ($capacidades_administrador_geral as $c) {
      $capacidade = [
        "id" => $this->utilService->uuid("Administrador Geral" . $c['codigo']),
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "perfil_id" => $admGeralId,
        "tipo_capacidade_id" => $this->utilService->uuid($c['codigo']),
      ];

      $queryCapacidade = Capacidade::onlyTrashed()->find($capacidade['id']);
      $queryTipoCapacidade = TipoCapacidade::find($capacidade['tipo_capacidade_id']);

      if ($queryTipoCapacidade) {
        if (!empty ($queryCapacidade)) {
          $queryCapacidade->restore();
          array_push($capacidadesRestauradas, $capacidade['id']);
        } else {
          $result = Capacidade::insertOrIgnore($capacidade);
        }
        !in_array($capacidade['id'], $capacidadesInseridas) ? array_push($capacidadesInseridas, $capacidade['id']) : array_push($capacidadesRepetidas, ["Administrador Geral", $c['codigo']]);
      } else {
        array_push($tipoCapacidadesInexistentes, ["Administrador Geral", $c['codigo']]);
      }
    }

    foreach ($capacidades_colaborador as $c) {
      $capacidade = [
        "id" => $this->utilService->uuid("Colaborador" . $c['codigo']),
        "created_at" => $this->timenow,
        "updated_at" => $this->timenow,
        "deleted_at" => NULL,
        "perfil_id" => $colaboradorId,
        "tipo_capacidade_id" => $this->utilService->uuid($c['codigo']),
      ];

      $queryCapacidade = Capacidade::onlyTrashed()->find($capacidade['id']);
      $queryTipoCapacidade = TipoCapacidade::find($capacidade['tipo_capacidade_id']);

      if ($queryTipoCapacidade) {
        if (!empty ($queryCapacidade)) {
          $queryCapacidade->restore();
          array_push($capacidadesRestauradas, $capacidade['id']);
        } else {
          $result = Capacidade::insertOrIgnore($capacidade);
        }
        !in_array($capacidade['id'], $capacidadesInseridas) ? array_push($capacidadesInseridas, $capacidade['id']) : array_push($capacidadesRepetidas, ["Colaborador", $c['codigo']]);
      } else {
        array_push($tipoCapacidadesInexistentes, ["Colaborador", $c['codigo']]);
      }
    }

    $qtdCapacidadesRemovidas = Capacidade::whereNotIn('id', $capacidadesInseridas)->whereNotIn('perfil_id', [$devId])->delete();
    $qtdCapacidades = Capacidade::count();
    $qtdCapacidadesRestauradas = count($capacidadesRestauradas);
    $qtdTiposCapacidadesInexistentes = count($tipoCapacidadesInexistentes);
    $qtdCapacidadesRepetidas = count($capacidadesRepetidas);

    echo ("*** CapacidadeSeeder ***" . ".\n");
    echo ("Quantidade total de capacidades: " . $qtdCapacidades . ".\n");
    echo ("Quantidade de capacidades removidas: " . $qtdCapacidadesRemovidas . ".\n");
    echo ("Quantidade de capacidades restauradas: " . $qtdCapacidadesRestauradas . ".\n");

    if ($qtdTiposCapacidadesInexistentes > 0) {
      echo ("\nQuantidade de capacidades usadas que não existem na tabela tipos_capacidades:\n");
      foreach ($tipoCapacidadesInexistentes as $msg) {
        echo (implode(" - ", $msg) . "\n");
      }
    }

    if ($qtdCapacidadesRepetidas > 0) {
      echo ("\nCapacidades repetidas no mesmo perfil e não registradas na tabela capacidades:\n");
      foreach ($capacidadesRepetidas as $msg) {
        echo (implode(" - ", $msg) . "\n");
      }
    }
    ;

    echo ("*********************************" . ".\n");
  }
}
