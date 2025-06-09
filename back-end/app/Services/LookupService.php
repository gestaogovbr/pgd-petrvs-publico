<?php

namespace App\Services;

use App\Services\ServiceBase;

class LookupService {

    public function __get($name) {
        return array_key_exists($name, $this->LOOKUPS) ? $this->LOOKUPS[$name] : null;
    }

    const LOOKUPS = [
        "DIA_SEMANA" => [
            [ 'key' => 0, 'code' => "domingo", 'value' => "Domingo" ],
            [ 'key' => 1, 'code' => "segunda", 'value' => "Segunda-feira" ],
            [ 'key' => 2, 'code' => "terca", 'value' => "Terça-feira" ],
            [ 'key' => 3, 'code' => "quarta", 'value' => "Quarta-feira" ],
            [ 'key' => 4, 'code' => "quinta", 'value' => "Quinta-feira" ],
            [ 'key' => 5, 'code' => "sexta", 'value' => "Sexta-feira" ],
            [ 'key' => 6, 'code' => "sabado", 'value' => "Sábado" ]
        ],
        "SEXO" => [
            [ 'key' => "MASCULINO", 'value' => "Masculino" ],
            [ 'key' => "FEMININO", 'value' => "Feminino" ]
        ],
        "USUARIO_SITUACAO_FUNCIONAL" => [
            ['key' => 'ATIVO_PERMANENTE', 'value' => 'Ativo permanente'],
            ['key' => 'APOSENTADO', 'value' => 'Aposentado'],
            ['key' => 'CEDIDO/REQUISITADO', 'value' => 'Cedido/Requisitado'],
            ['key' => 'NOMEADO_CARGO_COMISSIONADO', 'value' => 'Nomeado em Cargo Comissionado'],
            ['key' => 'SEM_VINCULO', 'value' => 'Sem vínculo'],
            ['key' => 'TABELISTA(ESP/EMERG)', 'value' => 'Tabelista(ESP/EMERG)'],
            ['key' => 'NATUREZA_ESPECIAL', 'value' => 'Natureza especial'],
            ['key' => 'ATIVO_EM_OUTRO_ORGAO', 'value' => 'Ativo em outro órgão'],
            ['key' => 'REDISTRIBUIDO', 'value' => 'Redistribuído'],
            ['key' => 'ATIVO_TRANSITORIO', 'value' => 'Ativo transitório'],
            ['key' => 'EXCEDENTE_A_LOTACAO', 'value' => 'Excedente à lotação'],
            ['key' => 'EM_DISPONIBILIDADE', 'value' => 'Em disponibilidade'],
            ['key' => 'REQUISITADO_DE_OUTROS_ORGAOS', 'value' => 'Requisitado de outros órgãos'],
            ['key' => 'INSTITUIDOR_PENSAO', 'value' => 'Instituidor de pensão'],
            ['key' => 'REQUISITADO_MILITAR_FORCAS_ARMADAS', 'value' => 'Requisitado militar - Forças Armadas'],
            ['key' => 'APOSENTADO_TCU733/94', 'value' => 'Aposentado TCU733/94'],
            ['key' => 'EXERCICIO_DESCENTRALIZADO_CARREIRA', 'value' => 'Exercício descentralizado de carreira'],
            ['key' => 'EXERCICIO_PROVISORIO', 'value' => 'Exercício provisório'],
            ['key' => 'CELETISTA', 'value' => 'Celetista'],
            ['key' => 'ATIVO_PERMANENTE_LEI_8878/94', 'value' => 'Ativo permanente Lei 8878/94'],
            ['key' => 'ANISTIADO_ADCT_CF', 'value' => 'Anistiado ADCT CF'],
            ['key' => 'CELETISTA/EMPREGADO', 'value' => 'Celetista/Empregado'],
            ['key' => 'CLT_ANS_DECISAO_JUDICIAL', 'value' => 'CLT Anistiado decisão judicial'],
            ['key' => 'CLT_ANS_JUDICIAL_CEDIDO', 'value' => 'CLT Anistiado judicial cedido'],
            ['key' => 'CLT_APOS_COMPLEMENTO', 'value' => 'CLT Aposentado complemento'],
            ['key' => 'CLT_APOS_DECISAO_JUDICIAL', 'value' => 'CLT Aposentado decisão judicial'],
            ['key' => 'INST_PS_DECISAO_JUDICIAL', 'value' => 'Instituidor de pensão decisão judicial'],
            ['key' => 'EMPREGO_PUBLICO', 'value' => 'Emprego público'],
            ['key' => 'REFORMA_CBM/PM', 'value' => 'Reforma CBM/PM'],
            ['key' => 'RESERVA_CBM/PM', 'value' => 'Reserva CBM/PM'],
            ['key' => 'REQUISITADO_MILITAR_GDF', 'value' => 'Requisitado militar GDF'],
            ['key' => 'ANISTIADO_PUBLICO_L10559', 'value' => 'Anistiado público L10559'],
            ['key' => 'ANISTIADO_PRIVADO_L10559', 'value' => 'Anistiado privado L10559'],
            ['key' => 'ATIVO_DECISAO_JUDICIAL', 'value' => 'Ativo decisão judicial'],
            ['key' => 'CONTRATO_TEMPORARIO', 'value' => 'Contrato temporário'],
            ['key' => 'COLAB_PCCTAE_E_MAGISTERIO', 'value' => 'Colaborador PCCTAE e Magistério'],
            ['key' => 'COLABORADOR_ICT', 'value' => 'Colaborador ICT'],
            ['key' => 'CLT_ANS_DEC_6657/08', 'value' => 'CLT Anistiado Decreto 6657/08'],
            ['key' => 'EXERCICIO_7_ART93_8112', 'value' => 'Exercício §7° Art.93 Lei 8112'],
            ['key' => 'CEDIDO_SUS/LEI_8270', 'value' => 'Cedido SUS Lei 8270'],
            ['key' => 'INST_ANIST_PUBLICO', 'value' => 'Instituidor anistiado público'],
            ['key' => 'INST_ANIST_PRIVADO', 'value' => 'Instituidor anistiado privado'],
            ['key' => 'CELETISTA_DECISAO_JUDICIAL', 'value' => 'Celetista decisão judicial'],
            ['key' => 'CONTRATO_TEMPORARIO_CLT', 'value' => 'Contrato temporário CLT'],
            ['key' => 'EMPREGO_PCC/EX-TERRITORIO', 'value' => 'Emprego PCC/Ex-Território'],
            ['key' => 'EXC_INDISCIPLINA', 'value' => 'Exc. indisciplina'],
            ['key' => 'CONTRATO_PROFESSOR_SUBSTITUTO', 'value' => 'Contrato Professor Substituto'],
            ['key' => 'ESTAGIARIO', 'value' => 'Estagiário'],
            ['key' => 'ESTAGIARIO_SIGEPE', 'value' => 'Estagiário SIGEPE'],
            ['key' => 'RESIDENCIA_E_PMM', 'value' => 'Residência e PMM'],
            ['key' => 'APOSENTADO_TEMPORARIRIO', 'value' => 'Aposentado temporário'],
            ['key' => 'CEDIDO_DF_ESTADO_MUNICIPIO', 'value' => 'Cedido DF Estado Munícipio'],
            ['key' => 'EXERC_DESCEN_CDT', 'value' => 'Exercício descentralizado CDT'],
            ['key' => 'EXERC_LEI_13681/18', 'value' => 'Exercício lei 13681/18'],
            ['key' => 'PENSIONISTA', 'value' => 'Pensionista'],
            ['key' => 'BENEFICIARIO_PENSAO', 'value' => 'Beneficiário de pensão'],
            ['key' => 'QE/MRE_CEDIDO', 'value' => 'QE/MRE Cedido'],
            ['key' => 'QUADRO_ESPEC_QE/MRE', 'value' => 'Quadro ESPEC QE/MRE']
        ],
    ];

    public static function getCode($itens, $k) : string {
        return array_values(array_filter($itens, function($d) use ($k) {return $d['key'] == $k;}))[0]['code'];
    }

    public static function getValue($itens, $k): ?string {
        $map = array_column($itens, 'value', 'key');
        return $map[$k] ?? null;
    }
}

