<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $situacoes = array(
            "ATIVO_PERMANENTE",
            "APOSENTADO",
            "CEDIDO/REQUISITADO",
            "NOMEADO_CARGO_COMISSIONADO",
            "SEM_VINCULO",
            "TABELISTA(ESP/EMERG)",
            "NATUREZA_ESPECIAL",
            "ATIVO_EM_OUTRO_ORGAO",
            "REDISTRIBUIDO",
            "ATIVO_TRANSITORIO",
            "EXCEDENTE_A_LOTACAO",
            "EM_DISPONIBILIDADE",
            "REQUISITADO_DE_OUTROS_ORGAOS",
            "INSTITUIDOR_PENSAO",
            "REQUISITADO_MILITAR_FORCAS_ARMADAS",
            "APOSENTADO_TCU733/94",
            "EXERCICIO_DESCENTRALIZADO_CARREIRA",
            "EXERCICIO_PROVISORIO",
            "CELETISTA",
            "ATIVO_PERMANENTE_LEI_8878/94",
            "ANISTIADO_ADCT_CF",
            "CELETISTA/EMPREGADO",
            "CLT_ANS_DECISAO_JUDICIAL",
            "CLT_ANS_JUDICIAL_CEDIDO",
            "CLT_APOS_COMPLEMENTO",
            "CLT_APOS_DECISAO_JUDICIAL",
            "INST_PS_DECISAO_JUDICIAL",
            "EMPREGO_PUBLICO",
            "REFORMA_CBM/PM",
            "RESERVA_CBM/PM",
            "REQUISITADO_MILITAR_GDF",
            "ANISTIADO_PUBLICO_L10559",
            "ANISTIADO_PRIVADO_L10559",
            "ATIVO_DECISAO_JUDICIAL",
            "CONTRATO_TEMPORARIO",
            "COLAB_PCCTAE_E_MAGISTERIO",
            "COLABORADOR_ICT",
            "CLT_ANS_DEC_6657/08",
            "EXERCICIO_7_ART93_8112",
            "CEDIDO_SUS/LEI_8270",
            "INST_ANIST_PUBLICO",
            "INST_ANIST_PRIVADO",
            "CELETISTA_DECISAO_JUDICIAL",
            "CONTRATO_TEMPORARIO_CLT",
            "EMPREGO_PCC/EX-TERRITORIO",
            "EXC_INDISCIPLINA",
            "CONTRATO_PROFESSOR_SUBSTITUTO",
            "ESTAGIARIO",
            "ESTAGIARIO_SIGEPE",
            "RESIDENCIA_E_PMM",
            "APOSENTADO_TEMPORARIRIO",
            "CEDIDO_DF_ESTADO_MUNICIPIO",
            "EXERC_DESCEN_CDT",
            "EXERC_LEI_13681/18",
            "PENSIONISTA",
            "BENEFICIARIO_PENSAO",
            "QE/MRE_CEDIDO",
            "QUADRO_ESPEC_QE/MRE",
        );

        $situacoes_ajuste = "";
        foreach($situacoes as $s){
            if ($situacoes_ajuste == "") {
                $situacoes_ajuste = "'" . $s . "'";
            } else {
                $situacoes_ajuste = $situacoes_ajuste . ',' . "'" . $s . "'";
            }
        }
        $situacoes_ajuste;

        // Campos:
        DB::statement("ALTER TABLE usuarios MODIFY 
        situacao_funcional ENUM($situacoes_ajuste) 
        NOT NULL DEFAULT 'ATIVO_PERMANENTE' 
        COMMENT 'Vínculo do usuário com a administração.'");
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $situacoes = array(
            "ATIVO PERMANENTE",
            "APOSENTADO",
            "CEDIDO/REQUISITADO",
            "NOMEADO CARGO COMIS.",
            "SEM VÍNCULO",
            "TABELISTA(ESP/EMERG)",
            "NATUREZA ESPECIAL",
            "ATIVO EM OUTRO ÓRGÃO",
            "REDISTRIBUÍDO",
            "ATIVO TRANSITÓRIO",
            "EXCEDENTE À LOTAÇÃO",
            "CONTRATO TEMPORÁRIO",
            "EM DISPONIBILIDADE",
            "REQ.DE OUTROS ÓRGÃOS",
            "INSTITUIDOR PENSÃO",
            "REQ. MILITAR F. ARM",
            "APOSENTADO TCU733/94",
            "EXERC DESCENT CARREI",
            "EXERCÍCIO PROVISÓRIO",
            "CELETISTA",
            "ATIVO PERM L.8878/94",
            "ANISTIADO ADCT CF",
            "CELETISTA/EMPREGADO",
            "CLT ANS DEC JUDICIAL",
            "CLT ANS JUD. CEDIDO",
            "CLT-APOS.COMPLEMENTO",
            "CLT-APS.DEC.JUDICIAL",
            "INST.PS DEC JUD",
            "EMPREGO PÚBLICO",
            "REFORMA CBM / PM",
            "RESERVA CBM / PM",
            "REQUIS. MILITAR GDF",
            "ANIST.PUBLICO L10559",
            "ANIST.PRIVADO L10559",
            "ATIVO - DEC. JUDIC",
            "COLAB PCCTAE E MAGIS",
            "COLABORADOR ICT",
            "CLT ANS -DEC 6657/08",
            "EXERC. 7  ART93 8112",
            "CEDIDO SUS/LEI 8270",
            "INST.ANIST.PUBLICO",
            "INST.ANIST.PRIVADO",
            "CELETISTA DEC.JUDIC.",
            "CONTR.TEMPORARIO CLT",
            "EMPREGO PCC/EX-TERRI",
            "EXC. INDISCIPLINA",
            "CONT.PROF.SUBSTITUTO",
            "ESTAGIÁRIO",
            "ESTAGIÁRIO SIGEPE",
            "RESIDÊNCIA E PMM",
            "APOSENTADO TEMPORARI",
            "CEDIDO DF EST MUNIC.",
            "EXERC. DESCEN. CDT",
            "EXERC. LEI 13681/18",
            "PENSIONISTA",
            "BENEFICIÁRIO PENSÃO",
            "QE/MRE - CEDIDO",
            "QUADRO ESPEC.-QE/MRE",
        );

        $situacoes_originais = "";
        foreach($situacoes as $s){
            if ($situacoes_originais == "") {
              $situacoes_originais = "'" . $s . "'";
            } else {
                $situacoes_originais = $situacoes_originais . ',' . "'" . $s . "'";
            }
        }
        $situacoes_originais;

        DB::statement("ALTER TABLE usuarios MODIFY
        situacao_funcional ENUM($situacoes_originais) 
        NOT NULL DEFAULT 'ATIVO_PERMANENTE' 
        COMMENT 'Vínculo do usuário com a administração.'");
    }
};
