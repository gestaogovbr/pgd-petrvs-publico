<?php

namespace App\Services;

use App\Models\TipoCapacidade;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;

class TipoCapacidadeService extends ServiceBase {

    public $tiposCapacidades = 
    [       
        [ 
            "codigo"=> "MOD_ACESSO",
            "descricao" => "Módulo de Acesso aos Menus",
            "capacidades" => [
                /* Capacidades do menu principal*/
                ["MENU_CAD_ACESSO", "Permite acessar o menu cadastro"],
                ["MENU_CONFIG_ACESSO", "Permite acessar o menu configurações"], //Substituída por MOD_CFG
                ["MENU_GESTAO_ACESSO", "Permite acessar o menu gestão"],
                ["MENU_REL_ACESSO", "Permite acessar o menu relatórios"],
                ["DEV_MENU_LOGS_ACESSO", "Permite acessar o menu logs"],
                /* Capacidades do DASHBOARD */
                ["DASH_PRG", "Permite mostrar informações do Programa de Gestão"],
            ]
        ], [ 
            "codigo" => "MOD_AFT",
            "descricao"=> "Módulo de afastamentos",
            "capacidades" => [
            /* Capacidades do módulo AFASTAMENTO*/
                ["MOD_AFT_CONS", "Permite consultar afastamento"],
                ["MOD_AFT_EDT", "Permite editar afastamento"],
                ["MOD_AFT_EXCL", "Permite excluir afastamento"],
                ["MOD_AFT_INCL", "Permite incluir afastamento"]
            ]
        ], [ 
            "codigo" => "MOD_ATV",
            "descricao" => "Módulo Atividades",
            "capacidades" => [
                /* Capacidades do módulo ATIVIDADES*/
                ["MOD_ATV_TIPO_ATV_VAZIO", "Permite incluir atividade sem tipo de atividade"],
                ["MOD_ATV_CONS", "Permite consultar atividade"],
                ["MOD_ATV_EDT", "Permite editar atividade"],
                ["MOD_ATV_EXCL", "Permite excluir atividade"],
                ["MOD_ATV_USU_EXT", "Permite atribuir atividades a usuários de outra unidade"],
                ["MOD_ATV_INCL", "Permite incluir atividade"],
                ["MOD_ATV_INICIO", "Permite definir início atividade"],
                ["MOD_ATV_RESP_INICIAR", "Permite incluir responsável por atividade"],
                ["MOD_ATV_TRF_INCL", "Permite incluir tarefas dentro de atividades"],
                ["MOD_ATV_TRF_EDT", "Permite editar tarefas dentro de atividades"],
                ["MOD_ATV_TRF_EXCL", "Permite exluir tarefas dentro de atividades"],
                ["MOD_ATV_TRF_CONS", "Permite consultar tarefas dentro de atividades"],
                ["MOD_ATV_CLONAR", "Permite clonar atividades"],
            ]
        ], [ 
            "codigo"=> "MOD_CADV",
            "descricao"=> "Módulo Cadeia de Valor",
            "capacidades"=> [
                /* Capacidades do módulo CADEIA DE VALOR*/
                ["MOD_CADV_EDT", "Permite editar cadeia de valor"],
                ["MOD_CADV_EXCL", "Permite excluir cadeia de valor"],
                ["MOD_CADV_INCL", "Permite incluir cadeia de valor"],
            ]
        ], [ 
            "codigo"=> "MOD_CID", // ok
            "descricao"=> "Módulo Cidades",
            "capacidades"=> [
                /* Capacidades do módulo CIDADE*/
                //["MOD_CID", "Permite acessar item menu cidades"],
                ["MOD_CID_CONS", "Permite consultar cidade"],
                ["MOD_CID_EDT", "Permite editar cidades"],
                ["MOD_CID_EXCL", "Permite excluir cidades"],
                ["MOD_CID_INCL", "Permite incluir cidades"],
            ]
        ], [ 
            "codigo"=> "MOD_DEV", // ok
            "descricao"=> "Módulo Desenvolvedor",
            "capacidades"=> [
                /* Capacidades do módulo LOGS*/
                ["MOD_LOGS", "Permite manter registros de logs"],
            ]
        ], [ 
            "codigo"=> "MOD_CFG", // ok
            "descricao"=> "Módulo de configurações",
            "capacidades"=> [
                /* Capacidades do módulo CONFIGURAÇÂO*/
                ["MOD_CFG_ENTD", "Permite acessar Entidade no menu configurações"],
                ["MOD_CFG_PERFS", "Permite configuração de perfis no petrvs"],
                //["MOD_CFG_PREF", "Permite configurar preferências"],
                ["MOD_CFG_UND", "Permite configurar unidade"],
                ["MOD_CFG_USER", "Permite alterar configurações de usuário"],
                //["MOD_CFG_USER_APELIDO", "Permite alterar valor campo apelido do usuário"],
                ["MOD_CFG_USER_CPF", "Permite alterar valor campo CPF do usuário"],
                ["MOD_CFG_USER_MAIL", "Permite alterar valor campo e-Mail do usuário"],
                ["MOD_CFG_USER_MAT", "Permite alterar valor campo matrícula do usuário"],
                //["MOD_CFG_USER_NOME", "Permite alterar valor campo nome do usuário"],
                ["MOD_CFG_USER_PERFIL", "Permite alterar valor campo perfil do usuário"],
                //["MOD_CFG_USER_TEL", "Permite alterar valor campo telefone do usuário"],
                //["MOD_CFG_USER_UF", "Permite alterar valor campo UF do usuário"],
                /* Capacidades do módulo Configurações de PERFIL*/
                ["MOD_PERF_EDT", "Permite editar perfil"],
                ["MOD_PERF_EXCL", "Permite excluir perfil"],
                ["MOD_PERF_INCL", "Permite incluir perfil"],
            ]
        ], [ 
            "codigo"=> "MOD_ENTD", // ok
            "descricao"=> "Módulo Entidade",
            "capacidades"=> [
                /* Capacidades do módulo ENTIDADE*/
                ["MOD_ENTD_EDT", "Permite editar entidade"],
                ["MOD_ENTD_EXCL", "Permite excluir Entidade"],
                ["MOD_ENTD_INCL", "Permite incluir Entidade"],
            ]
        ], [ 
            "codigo"=> "MOD_EXTM", //ok
            "descricao"=> "Módulo Eixos Temáticos",
            "capacidades"=> [
                /* Capacidades do módulo EIXOS TEMÁTICOS */
                //["MOD_EXTM", "Permite acessar item do menu Eixos temáticos"],
                ["MOD_EXTM_CONS", "Permite consultar Eixos temáticos"],
                ["MOD_EXTM_INCL", "Permite incluir Eixos temáticos"],
                ["MOD_EXTM_EDT", "Permite editar Eixos temáticos"],
                ["MOD_EXTM_EXCL", "Permite excluir Eixos temáticos"], 
            ]
        ], [ 
            "codigo"=> "MOD_ENTRG", //ok
            "descricao"=> "Módulo de Entregas",
            "capacidades"=> [
                /* Capacidades do módulo ENTREGAS*/
                ["MOD_ENTRG_INCL", "Permite incluir Entregas"],
                ["MOD_ENTRG_EDT", "Permite editar Entregas"],
                ["MOD_ENTRG_EXCL", "Permite excluir Entregas"],
            ]
        ], [ 
            "codigo"=> "MOD_FER", //ok
            "descricao"=> "Módulo feriados",
            "capacidades"=> [
                /* Capacidades do módulo FERIADO*/
                //["MOD_FER", "Permite acessar item menu feriados"],
                ["MOD_FER_CONS", "Permite consultar feriado"],
                ["MOD_FER_EDT", "Permite editar feriados"],
                //["MOD_FER_ENT_EDT", "Permite editar entidades em feriado"], // só no back
                //["MOD_FER_ENT_INCL", "Permite incluir entidades em feriado"], // só no back
                ["MOD_FER_EXCL", "Permite excluir feriado"],
                ["MOD_FER_INCL", "Permite incluir feriados"],
            ]
        ], [ 
            "codigo"=> "MOD_MATSRV", //ok
            "descricao"=> "Módulo materiais e serviços",
            "capacidades"=> [
                /* Capacidades do módulo MATERIAIS E SERVIÇOS*/
                ["MOD_MATSRV_EDT", "Permite editar materiais e serviços"],
                ["MOD_MATSRV_EXCL", "Permite excluir materiais e serviços"],
                ["MOD_MATSRV_INCL", "Permite incluir materiais e serviços"],
            ]
        ], [ 
            "codigo"=> "MOD_PLAN", //ok
            "descricao"=> "Módulo de Planejamento Institucional",
            "capacidades"=> [
                /* Capacidades do módulo PLANEJAMENTO INSTITUCIONAL */
                //["MOD_PLAN", "Permite acessar Planejamentos Institucionais"],
                ["MOD_PLAN_INST", "Permite acessar item do menu Planejamentos Institucionais"],
                ["MOD_PLAN_INST_CONS", "Permite consultar Planejamentos Institucionais"],
                ["MOD_PLAN_INST_INCL", "Permite incluir algum tipo de Planejamento Institucional"],
                ["MOD_PLAN_INST_INCL_UNID_INST", "Permite incluir Planejamento Institucional para a Unidade Instituidora"],
                ["MOD_PLAN_INST_INCL_UNEX_LOTPRI", "Permite incluir Planejamentos Institucionais para Unidades Executoras (apenas para a sua lotação)"],
                ["MOD_PLAN_INST_INCL_UNEX_QQLOT", "Permite incluir Planejamentos Institucionais para Unidades Executoras (apenas as de suas lotações)"],
                ["MOD_PLAN_INST_INCL_UNEX_SUBORD", "Permite incluir Planejamentos Institucionais para Unidades Executoras (apenas as de suas lotações e suas subordinadas)"],
                ["MOD_PLAN_INST_INCL_UNEX_QUALQUER", "Permite incluir Planejamentos Institucionais para qualquer Unidade Executora, independente de sua lotação"],
                ["MOD_PLAN_INST_EDT", "Permite editar Planejamentos Institucionais"],
                ["MOD_PLAN_INST_EXCL", "Permite excluir Planejamentos Institucionais"],
            ]
        ], [
            "codigo"=> "MOD_PTR",
            "descricao"=> "Módulo de Plano de Trabalho",
            "capacidades"=> [
                /* Capacidades do módulo PLANO DE TRABALHO */
                ["MOD_PTR_EDT", "Permite editar planos de trabalho"],
                ["MOD_PTR_INCL", "Permite incluir planos de trabalho"],
                ["MOD_PTR_EDT_ATV", "Permite editar planos de trabalho ativos"],
                ["MOD_PTR_CNC", "Permite cancelar planos de trabalho"],
                ["MOD_PTR_USERS_INCL", "Permite incluir planos de trabalho para usuários que não estão lotados nas áreas de trabalho do usuário logado"],
                ["MOD_PTR_INCL_SEM_LOT", "Permite incluir planos de trabalho para usuários que não estão lotados na unidade executora"],
                ["MOD_PTR_INTSC_DATA", "Permite incluir planos de trabalho que possuam períodos conflitantes com outro plano já existente na mesma unidade executora"]
            ]
        ], [ 
            "codigo"=> "MOD_PTR_ENTR",
            "descricao"=> "Módulo de Plano de Trabalho - Entregas",
            "capacidades"=> [
                /* Capacidades do módulo PLANO DE TRABALHO */
                ["MOD_PTR_ENTR_EDT", "Permite editar entregas de um plano de trabalho"],
                ["MOD_PTR_ENTR_EXCL", "Permite excluir entregas de um plano de trabalho"],
                ["MOD_PTR_ENTR_INCL", "Permite incluir entregas de um plano de trabalho"],
            ]
        ], [ 
            "codigo"=> "MOD_PTR_CSLD", //ok
            "descricao"=> "Módulo de consolidações do Plano de Trabalho",
            "capacidades"=> [
                ["MOD_PTR_CSLD_EDT", "Permite editar a consolidação do planos de trabalho"],
                ["MOD_PTR_CSLD_EXCL", "Permite excluir a consolidação do planos de trabalho"],
                ["MOD_PTR_CSLD_INCL", "Persmite incluir a consolidação do planos de trabalho"],
                ["MOD_PTR_CSLD_CONCL", "Permite realizar conclusão (independete de ser o usuário da consolidação)"],
                ["MOD_PTR_CSLD_DES_CONCL", "Permite desfazer conclusão (independete de ser o usuário da consolidação)"],
                ["MOD_PTR_CSLD_CANC_AVAL", "Permite cancelar avaliação"],
                ["MOD_PTR_CSLD_AVAL", "Permite avaliar"]
            ]
        ], [ 
            "codigo"=> "MOD_PTR_CSLD_OCOR",
            "descricao"=> "Módulo de Plano de Trabalho - Ocorrências",
            "capacidades"=> [
                /* Capacidades do módulo PLANO DE TRABALHO */
                ["MOD_PTR_CSLD_OCOR_EDT", "Permite editar ocorrência de um plano de trabalho"],
                ["MOD_PTR_CSLD_OCOR_EXCL", "Permite excluir ocorrência de um plano de trabalho"],
                ["MOD_PTR_CSLD_OCOR_INCL", "Permite incluir ocorrência de um plano de trabalho"],
            ]
        ], [ 
            "codigo"=> "MOD_PENT",
            "descricao"=> "Módulo de Plano de Entregas",
            "capacidades"=> [
                /* Capacidades do módulo PLANO DE ENTREGA */
                ["MOD_PENT_INCL", "Permite incluir planos de entrega"],
                ["MOD_PENT_EDT", "Permite editar planos de entrega"],
                ["MOD_PENT_EDT_ATV_HOMOL", "Permite editar planos de entrega que estejam no status ATIVO. O plano voltará ao status HOMOLOGANDO"],
                ["MOD_PENT_EDT_ATV_ATV", "Permite alterar planos de entregas das unidades imediatamente subordinadas à sua unidade de lotação"],
                ["MOD_PENT_EDT_FLH", "Permite editar planos de entrega que estejam no status ATIVO, mantendo-os neste status."],
                ["MOD_PENT_EXCL", "Permite excluir planos de entrega"],
                ["MOD_PENT_HOMOL", "Permite homologar planos de entregas das unidades imediatamente subordinadas"],
                ["MOD_PENT_CANC_HOMOL", "Permite cancelar a homologação dos planos de entregas das unidades imediatamente subordinadas"],
                ["MOD_PENT_AVAL", "Permite avaliar planos de entregas das unidades imediatamente subordinadas"],
                ["MOD_PENT_CANC_AVAL", "Permite cancelar a avaliação dos planos de entregas das unidades imediatamente subordinadas"],
                ["MOD_PENT_AVAL_SUBORD", "Permite avaliar planos de entregas de todas as unidades subordinadas à sua unidade de lotação"],
                ["MOD_PENT_LIB_HOMOL", "Permite liberar para homologação planos de entregas da sua unidade de lotação"],
                ["MOD_PENT_RET_HOMOL", "Permite retirar de homologação planos de entregas da sua unidade de lotação"],
                ["MOD_PENT_CONC", "Permite marcar como concluídos planos de entregas da sua unidade de lotação"],
                //["MOD_PENT_ADR", "Permite aderir a planos de entregas da unidade imediatamente superior à sua unidade de lotação"],
                ["MOD_PENT_CANC_CONCL", "Permite cancelar a conclusão de planos de entregas da sua unidade de lotação"],
                ["MOD_PENT_CNC", "Permite cancelar planos de entregas"],
                ["MOD_PENT_SUSP", "Permite suspender planos de entregas da sua unidade de lotação"],
                ["MOD_PENT_RTV", "Permite reativar planos de entregas suspensos, desde que sejam da sua unidade de lotação"],
                ["MOD_PENT_ARQ", "Permite arquivar ou desarquivar planos de entregas da sua unidade de lotação"],
                ["MOD_PENT_QQR_UND", "Permite realizar as operações em qualquer unidade, independente de onde esteja lotado ou seja gestor"],
                /* Capacidades do módulo PLANO DE ENTREGAS - ENTREGAS*/
                ["MOD_PENT_ENTR_EDT", "Permite editar entregas de um plano de entregas"],
                ["MOD_PENT_ENTR_EXCL", "Permite excluir entregas de um plano de entregas"],
                ["MOD_PENT_ENTR_INCL", "Permite incluir entregas de um plano de entregas"],
            ]
        ], [ 
            "codigo"=> "MOD_PRGT",
            "descricao"=> "Módulo de Programa de Gestão",
            "capacidades"=> [
                /* Capacidades do módulo PROGRAMA DE GESTÃO */
                ["MOD_PRGT_EDT", "Permite editar programas de gestão"],
                ["MOD_PRGT_EXCL", "Permite excluir programas de gestão"],
                ["MOD_PRGT_INCL", "Permite incluir programas de gestão"],
                ["MOD_PRGT_PART", "Participantes do programa"],
                ["MOD_PRGT_PART_INCL", "Permite incluir participantes do programa"],
                ["MOD_PRGT_PART_EDT", "Permite editar participantes do programa"],
                ["MOD_PRGT_PART_EXCL", "Permite excluir participantes do programa"],
            ]
        ], [ 
            "codigo"=> "MOD_PROJ", //ok
            "descricao"=> "Módulo de Projetos",
            "capacidades"=> [
                /* Capacidades do módulo PROJETO */
                //["MOD_PROJ", "Permite acessar módulo projetos"],
                ["MOD_PROJ_CONS", "Permite consultar projeto"], // só aqui
                ["MOD_PROJ_EDT", "Permite editar projeto"], //só no back
                ["MOD_PROJ_EXCL", "Permite excluir projeto"], //só no back
                ["MOD_PROJ_INCL", "Permite incluir Projetos"],
                /* Capacidades do módulo PROJETO RECURSO*/
                ["MOD_PROJ_REC_EDT", "Permite editar projeto recurso"], //só no back
                ["MOD_PROJ_REC_EXCL", "Permite excluir projeto recurso"], //só no back
                ["MOD_PROJ_REC_INCL", "Permite incluir projeto recurso"], //só no back
                /* Capacidades do módulo PROJETO REGRA*/
                ["MOD_PROJ_REG_EDT", "Permite editar projeto regra"], //só no back
                ["MOD_PROJ_REG_EXCL", "Permite excluir projeto regra"], //só no back
                ["MOD_PROJ_REG_INCL", "Permite incluir projeto regra"], //só no back
            ]
        ], [ 
            "codigo"=> "MOD_TEMP",
            "descricao"=> "Módulo de Templates",
            "capacidades"=> [
                /* Capacidades do módulo de templates */
                ["MOD_TEMP_INCL", "Permite incluir template"],
                ["MOD_TEMP_EDT", "Permite editar template"],
                ["MOD_TEMP_EXCL", "Permite excluir template"],
            ]  
        ], [ 
            "codigo"=> "MOD_TIPO_ATV",
            "descricao"=> "Módulo de Tipos de Atividade",
            "capacidades"=> [
                /* Capacidades do módulo TIPO ATIVIDADE*/
                //["MOD_TIPO_ATV", "Permite acessar item de menu cadastro->tipo de atividade"],
                ["MOD_TIPO_ATV", "Permite acessar item menu atividade"],
                ["MOD_TIPO_ATV_CONS", "Permite consultar atividade"],
                ["MOD_TIPO_ATV_EDT", "Permite editar atividades"],
                ["MOD_TIPO_ATV_EDT_PCPL", "Permite editar atividades na guia principal"],
                ["MOD_TIPO_ATV_EDT_PRE_DEF", "Permite editar dados guia pré-definidas"],
                ["MOD_TIPO_ATV_EDT_TP_MIN", "Permite editar tempo máximo da atividade"],
                ["MOD_TIPO_ATV_EDT_UND", "Permite editar unidade associada à atividade"],
                ["MOD_TIPO_ATV_EDT_VAR_P", "Permite editar guia variação e produtividade"],
                ["MOD_TIPO_ATV_EXCL", "Permite excluir atividades"],
                ["MOD_TIPO_ATV_INCL", "Permite incluir atividades"],
                ["MOD_TIPO_ATV_INCL_PRE_DEF", "Permite acessar e editar guia pré-definidas"],
                ["MOD_TIPO_ATV_INCL_TP_MIN", "Permite incluir tempo máximo da atividade"],
                ["MOD_TIPO_ATV_PCPL", "Permite incluir atividades na guia principal"],
            ]
        ], [ 
            "codigo"=> "MOD_TIPO_AVAL",
            "descricao"=> "Módulo de Tipos de Avaliação",
            "capacidades"=> [
                /* Capacidades do módulo TIPO AVALIACAO*/
                ["MOD_TIPO_AVAL_EDT", "Permite editar tipos de avaliações"],
                ["MOD_TIPO_AVAL_EXCL", "Permite excluir tipos de avaliações"],
                ["MOD_TIPO_AVAL_INCL", "Permite incluir tipos de avaliações"],
            ]
        ], [ 
            "codigo"=> "MOD_TIPO_CAP",
            "descricao"=> "Módulo de Tipos de Capacidade",
            "capacidades"=> [
                /* Capacidades do módulo TIPO CAPACIDADE*/
                //["MOD_TIPO_CAP", "Permite acessar configurações de capacidades de usuário"],
                ["MOD_TIPO_CAP_CONS", "Permite consultar tipo de capacidade"],
                ["MOD_TIPO_CAP_EDT", "Permite editar tipo de capacidade"],
                ["MOD_TIPO_CAP_EXCL", "Permite excluir tipo de capacidade"],
                ["MOD_TIPO_CAP_INCL", "Permite incluir tipos de capacidades"],
            ]
        ], [ 
            "codigo"=> "MOD_TIPO_DOC",
            "descricao"=> "Módulo de Tipos de Documentos",
            "capacidades"=> [
                /* Capacidades do módulo TIPO DOCUMENTO*/
                ["MOD_TIPO_DOC_EDT", "Permite editar tipos de documentos"],
                ["MOD_TIPO_DOC_EXCL", "Permite excluir tipos de documentos"],
                ["MOD_TIPO_DOC_INCL", "Permite incluir tipos de documentos"],
            ]
        ], [ 
            "codigo"=> "MOD_TIPO_JUST",
            "descricao"=> "Módulo de Tipos de Justificativa",
            "capacidades"=> [
                /* Capacidades do módulo TIPO JUSTIFICATIVA*/
                //["MOD_TIPO_JUST", "Permite acessar item de menu cadastro->tipo de justificativa"],
                ["MOD_TIPO_JUST_CONS", "Permite consultar tipos de justificativas"],
                ["MOD_TIPO_JUST_EDT", "Permite editar tipos de justificativas"],
                ["MOD_TIPO_JUST_EXCL", "Permite excluir tipos de justificativas"],
                ["MOD_TIPO_JUST_INCL", "Permite incluir tipos de justificativas"],
            ]
        ], [ 
            "codigo"=> "MOD_TIPO_MDL",
            "descricao"=> "Módulo de Tipos de Modalidade",
            "capacidades"=> [
                /* Capacidades do módulo TIPO MODALIDADE*/
                ["MOD_TIPO_MDL_EDT", "Permite editar tipos de modalidades"],
                ["MOD_TIPO_MDL_EXCL", "Permite excluir tipos de modalidades"],
                ["MOD_TIPO_MDL_INCL", "Permite incluir tipos de modalidades"],
            ]
        ], [ 
            "codigo"=> "MOD_TIPO_MTV_AFT", //ok
            "descricao"=> "Módulo de Tipos de Motivos de Afastamento",
            "capacidades"=> [
                /* Capacidades do módulo TIPO MOTIVO AFASTAMENTO*/
                //["MOD_TIPO_MTV_AFT", "Permite acessar item de menu cadastro->tipo de motivo de afastamento"],
                ["MOD_TIPO_MTV_AFT_CONS", "Permite consultar tipos de motivos de afastamentos"],
                ["MOD_TIPO_MTV_AFT_EDT", "Permite editar tipos de motivos de afastamentos"],
                ["MOD_TIPO_MTV_AFT_EXCL", "Pemite excluir tipos de motivos de afastamentos"],
                ["MOD_TIPO_MTV_AFT_INCL", "Permite incluir tipos de motivos de afastamentos"],
                ["MOD_TPMAF_INCL", "Permite incluir tipos de motivos de afastamentos"], //só definição
            ]
        ], [ 
            "codigo"=> "MOD_TIPO_PROC",
            "descricao"=> "Módulo de Tipos de Processos",
            "capacidades"=> [
                /* Capacidades do módulo TIPO PROCESSO*/
                ["MOD_TIPO_PROC_EDT", "Permite editar tipos de processos"],
                ["MOD_TIPO_PROC_EXCL", "Permite excluir tipos de processos"],
                ["MOD_TIPO_PROC_INCL", "Permite incluir tipos de processos"],
            ]
        ], [ 
            "codigo"=> "MOD_TRF",
            "descricao"=> "Módulo Tarefas",
            "capacidades"=> [
                /* Capacidades do módulo TAREFAS*/
                //["MOD_TRF", "Permite acessar módulo/item de menu tarefas"],
                ["MOD_TRF_CONS", "Permite consultar tarefa"],
                ["MOD_TRF_EDT", "Permite editar tarefas"],
                ["MOD_TRF_EXCL", "Permite excluir tarefas"],
                ["MOD_TRF_INCL", "Permite incluir tarefas"],
            ]
        ], [ 
            "codigo"=> "MOD_TIPO_TRF",
            "descricao"=> "Módulo Tipo Tarefas",
            "capacidades"=> [
                /* Capacidades do módulo TIPO TAREFA*/
                ["MOD_TIPO_TRF_EDT", "Permite editar tipos de tarefas"],
                ["MOD_TIPO_TRF_EXCL", "Permite excluir tipos de tarefas"],
                ["MOD_TIPO_TRF_INCL", "Permite incluir tipos de tarefas"],
            ]
        ], [ 
            "codigo"=> "MOD_UND",
            "descricao"=> "Módulo Unidades",
            "capacidades"=> [
                /* Capacidades do módulo UNIDADES*/
                ["MOD_UND_CONS", "Permite consultar Unidades"],
                ["MOD_UND_EDT", "Permite editar Unidade"],
                ["MOD_UND_EXCL", "Permite excluir Unidade"],
                ["MOD_UND_INCL", "Permite incluir Unidades"],
                ["MOD_UND_UNIR", "Permite Unificar Unidades"],
                ["MOD_UND_TUDO", "Permite consultar qualquer unidade independente de subordinação"],
                ["MOD_UND_INATV", "Permite inativar uma unidade"],
                ["MOD_UND_INTG", "Permite gerenciar integrantes da unidade"],
                ["MOD_UND_INTG_INCL", "Permite incluir integrantes da unidade"],
                ["MOD_UND_INTG_EDT", "Permite editar integrantes da unidade"],
                ["MOD_UND_INTG_EXCL", "Permite excluir integrantes da unidade"],
            ]
        ], [ 
            "codigo"=> "MOD_USER", //ok
            "descricao"=> "Módulo Usuários",
            "capacidades"=> [
                /* Capacidades do módulo UNIDADES*/
                ["MOD_USER_EDT", "Permite alterar dados de usuário"],
                ["MOD_USER_EXCL", "Permite excluir dados de usuário"],
                ["MOD_USER_INCL", "Permite incluir usuário"],
                ["MOD_USER_TUDO", "Permite consultar qualquer usuário independente de lotação"],
            ]
        ], [ 
            "codigo"=> "MOD_RX",
            "descricao"=> "Módulo Raio-X",
            "capacidades"=> [
                /* Capacidades do módulo RAIO X*/
                ["MOD_RX_EDT_DPE", "Permite editar dados pessoais de outro usuário"],
                ["MOD_RX_EDT_DPR", "Permite editar dados profissionais de outro usuário"],
                ["MOD_RX_EDT_ATR", "Permite editar atributos comportamentais de outro usuário"],
                ["MOD_RX_VIS_DPE", "Permite visualizar menu pessoais"],
                ["MOD_RX_VIS_DPR", "Permite visualizar menu dados profissionais"],
                ["MOD_RX_VIS_ATR", "Permite visualizar menu atributos comportamentais"],
                ["MOD_RX_VIS_OPO", "Permite visualizar menu oportunidades"],
                ["MOD_RX_EDT_USR", "Permite editar tudo para o usuário atual menos atributos comportamentais"],
                ["MOD_RX_EDT_SUP", "Permite editar tudo para o usuário atual"],
                ["MOD_RX_EDT_OPO", "Permite editar oportunidades"],
                ["MOD_RX_VIS_OPO", "Permite visualizar oportunidades"],
                ["MOD_RX_RES_ATR", "Permite resetar dados comportamentais"]
            ]
        ]
    ];

    private function differentDev(&$data) {
        if(!$this->isLoggedUserADeveloper()){
            if(isset($data['where']) && count($data['where']) > 0) {
                if(gettype($data['where'][0]) == "string") {
                    $data['where'] = [["not like", "DEV_%"], $data['where']];
                } else {
                    $data['where'][] = ["not like", "DEV_%"];
                }
            } else {
                $data['where'] = [["not like", "DEV_%"]];
            }
        }
    }

    public function searchText($data) {
        $this->differentDev($data);
        return parent::searchText($data);
    }

    public function query($data) {
        $this->differentDev($data);
        return parent::query($data);
    }
}
