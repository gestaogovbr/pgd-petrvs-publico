<?php

namespace App\Services;

use App\Models\TipoCapacidade;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;

class TipoCapacidadeService extends ServiceBase {

    public $tiposCapacidades = [
        /* Capacidades do menu principal*/
        ["MENU_CAD_ACESSO", "Permite acessar o menu cadastro"],
        ["MENU_CONFIG_ACESSO", "Permite acessar o menu configurações"],
        ["MENU_GESTAO_ACESSO", "Permite acessar o menu gestão"],
        ["MENU_REL_ACESSO", "Permite acessar o menu relatórios"],
        ["DEV_MENU_LOGS_ACESSO", "Permite acessar o menu logs"],
        /* Capacidades do DASHBOARD */
        ["DASH_PRG", "Permite mostrar informações do Programa de Gestão"],
        /* Capacidades do módulo AFASTAMENTO*/
        ["MOD_AFT", "Permite acessar item menu afastamentos"],
        ["MOD_AFT_CONS", "Permite consultar afastamento"],
        ["MOD_AFT_EDT", "Permite editar afastamento"],
        ["MOD_AFT_EXCL", "Permite excluir afastamento"],
        ["MOD_AFT_INCL", "Permite incluir afastamento"],
        /* Capacidades do módulo ATIVIDADES*/
        ["MOD_ATV", "Permite acessar item menu atividade"],
        ["MOD_ATV_CONS", "Permite consultar atividade"],
        ["MOD_ATV_EDT", "Permite editar atividades"],
        ["MOD_ATV_EDT_OTR_OP_DT_HOM", "Permite editar data homologação"],
        ["MOD_ATV_EDT_OTR_OP_HOM", "Permite editar dados homologado UG"],
        ["MOD_ATV_EDT_OTR_OP_PROD", "Permite editar produtividade desativada"],
        ["MOD_ATV_EDT_PCPL", "Permite editar atividades na guia principal"],
        ["MOD_ATV_EDT_PRE_DEF", "Permite editar dados guia pré-definidas"],
        ["MOD_ATV_EDT_TP_MIN", "Permite editar tempo máximo da atividade"],
        ["MOD_ATV_EDT_UND", "Permite editar unidade associada à atividade"],
        ["MOD_ATV_EDT_VAR_P", "Permite editar guia variação e produtividade"],
        ["MOD_ATV_EXCL", "Permite excluir atividades"],
        ["MOD_ATV_INCL", "Permite incluir atividades"],
        ["MOD_ATV_INCL_OTR_OP_DHOM", "Permite incluir data homologação"],
        ["MOD_ATV_INCL_OTR_OP_HOM", "Permite incluir dados homologado UG"],
        ["MOD_ATV_INCL_OTR_OP_PROD", "Permite incluir produtividade desativada"],
        ["MOD_ATV_INCL_PRE_DEF", "Permite acessar e editar guia pré-definidas"],
        ["MOD_ATV_INCL_TP_MIN", "Permite incluir tempo máximo da atividade"],
        ["MOD_ATV_INCL_UND", "Permite incluir unidade associada à atividade"],
        ["MOD_ATV_INCL_VAR_P", "Permite incluir dados guia variação e produtividade"],
        ["MOD_ATV_PCPL", "Permite incluir atividades na guia principal"],
        /* Capacidades do módulo CADEIA DE VALOR*/
        ["MOD_CADV", "Permite acessar item do menu cadeia de valor"],
        ["MOD_CADV_CONS", "Permite consultar cadeia de valor"],
        ["MOD_CADV_EDT", "Permite editar cadeia de valor"],
        ["MOD_CADV_EXCL", "Permite excluir cadeia de valor"],
        ["MOD_CADV_INCL", "Permite incluir cadeia de valor"],
        /* Capacidades do módulo CONFIGURAÇÂO*/
        ["MOD_CFG_ENTD", "Permite acessar Entidade no menu configurações"],
        ["MOD_CFG_PERFS", "Permite configuração de perfis no petrvs"],
        ["MOD_CFG_PREF", "Permite configurar preferências"],
        ["MOD_CFG_UND", "Permite configurar unidade"],
        ["MOD_CFG_USER", "Permite alterar configurações de usuário"],
        ["MOD_CFG_USER_APELIDO", "Permite alterar valor campo apelido do usuário"],
        ["MOD_CFG_USER_CPF", "Permite alterar valor campo CPF do usuário"],
        ["MOD_CFG_USER_MAIL", "Permite alterar valor campo e-Mail do usuário"],
        ["MOD_CFG_USER_MAT", "Permite alterar valor campo matrícula do usuário"],
        ["MOD_CFG_USER_NOME", "Permite alterar valor campo nome do usuário"],
        ["MOD_CFG_USER_PERFIL", "Permite alterar valor campo perfil do usuário"],
        ["MOD_CFG_USER_TEL", "Permite alterar valor campo telefone do usuário"],
        ["MOD_CFG_USER_UF", "Permite alterar valor campo UF do usuário"],
        /* Capacidades do módulo CIDADE*/
        ["MOD_CID", "Permite acessar item menu cidades"],
        ["MOD_CID_CONS", "Permite consultar cidade"],
        ["MOD_CID_EDT", "Permite editar cidades"],
        ["MOD_CID_EXCL", "Permite excluir cidades"],
        ["MOD_CID_INCL", "Permite incluir cidades"],
        /* Capacidades do módulo DEMANDA*/
        ["MOD_DMD", "Permite acessar item menu demandas"],
        ["MOD_DMD_ATV", "Permite associar atividade com demanda"],
        ["MOD_DMD_ATV_CMPLX", "Permite associar complexidade da atividade na demanda"],
        ["MOD_DMD_ATV_DT_DST", "Permite associar data de distribuição com atividade em demanda"],
        ["MOD_DMD_ATV_PL_TRB", "Permite associar plano de trabalho com ativ/demanda"],
        ["MOD_DMD_ATV_PZ_ENTG", "Permite associar prazo entrega de atividade da demanda"],
        ["MOD_DMD_ATV_RESP", "Permite associar responsável pela demanda"],
        ["MOD_DMD_ATV_TP_PCT", "Permite associar tempo pactuado na atividade"],
        ["MOD_DMD_ATV_TP_PLJ", "Permite associar tempo planejado na atividade"],
        ["MOD_DMD_ATV_FORA_PL_TRB", "Permite associar atividade que não consta no plano de trabalho"],
        ["MOD_DMD_CONCL", "Permite concluir demandas iniciadas "],
        ["MOD_DMD_CONCL_ATV", "Permite concluir atividade"],
        ["MOD_DMD_CONCL_CMPLX", "Permite concluir complexidade"],
        ["MOD_DMD_CONCL_DSC_TEC", "Permite concluir descrição técnica"],
        ["MOD_DMD_CONS", "Permite consultar demanda"],
        ["MOD_DMD_EDT", "Permite editar demanda"],
        ["MOD_DMD_EXCL", "Permite excluir demanda"],
        ["MOD_DMD_EXT", "Permite atribuir demandas a Unidades externas"],
        ["MOD_DMD_I_AVAL", "Permite avaliar demanda iniciada"],
        ["MOD_DMD_I_CANC", "Permite cancelar demanda iniciada"],
        ["MOD_DMD_I_COMT", "Permite comentar demanda iniciada"],
        ["MOD_DMD_I_CONCL", "Permite concluir demandas iniciadas "],
        ["MOD_DMD_I_EDT_INIC", "Permite editar início de demanda iniciada"],
        ["MOD_DMD_I_INFO", "Permite obter informação sobre demandas iniciadas"],
        ["MOD_DMD_I_PPRZO", "Permite prorrogar prazo de demanda iniciada"],
        ["MOD_DMD_I_SUSP", "Permite suspender demanda iniciada"],
        ["MOD_DMD_INCL", "Permite incluir demanda"],
        ["MOD_DMD_INCL_COMPL", "Permite incluir complemtários para demandas"],
        ["MOD_DMD_INCL_COMT", "Permite incluir comentários nas demandas"],
        ["MOD_DMD_INCL_CRTZ", "Permite incluir caracterização para atividade de demanda"],
        ["MOD_DMD_INCL_VNCL", "Permite incluir vínculos na demanda"],
        ["MOD_DMD_INICIAR", "Permite iniciar a demanda"],
        ["MOD_DMD_INICIO", "Permite definir início demanda"],
        ["MOD_DMD_MDL_INICIAR", "Permite iniciar modalidade"],
        ["MOD_DMD_NI_COMT", "Permite comentar demanda não iniciada"],
        ["MOD_DMD_NI_EXCL", "Permite excluir demanda não iniciada"],
        ["MOD_DMD_NI_INFO", "Permite obter informação sobre demandas não iniciadas"],
        ["MOD_DMD_NI_INIC", "Permite iniciar demanda não iniciada"],
        ["MOD_DMD_NI_CONCL", "Permite concluir demanda não iniciada"],
        ["MOD_DMD_RESP_INICIAR", "Permite incluir responsável por demanda"],
        ["MOD_DMD_SUSP_DMAIS", "Permite suspender demais demandas"],
        ["MOD_DMD_ATV_VAZIO", "Permite deixar campo Atividade em branco na inclusão da Demanda"],
        ["MOD_DMD_USERS_CANC_CONCL", "Permitir cancelar conclusão de demanda de qualquer usuário, inclusive de outra lotação"],
        ["MOD_DMD_USERS_CANC_INICIAR", "Permite cancelar início de demanda de de qualquer usuário, inclusive de outra lotação"],
        ["MOD_DMD_USERS_ALT", "Permite alterar a demanda de qualquer usuário, inclusive de outra lotação"],
        ["MOD_DMD_USERS_CONCL", "Permite concluir a demanda de qualquer usuário, inclusive de outra lotação"],
        ["MOD_DMD_USERS_INICIAR", "Permite iniciar a demanda de qualquer usuário, inclusive de outra lotação"],
        ["MOD_DMD_USERS_PAUSA", "Permitir pausar/suspender demanda iniciada de qualquer usuário, inclusive de outra lotação"],
        ["MOD_DMD_USERS_ALT_CONCL", "Permite alterar conclusão de demanda de qualquer usuário, inclusive de outra lotação"],
        ["MOD_DMD_USERS_COMT", "Permite adicionar comentário de demanda de qualquer usuário, inclusive de outra lotação"],
        ["MOD_DMD_USERS_PPRZO", "Permite prorrogar prazo de demanda de qualquer usuário, inclusive de outra lotação"],
        ["MOD_DMD_USERS_AVAL", "Permite avaliar demanda de qualquer usuário, inclusive de outra lotação"],
        ["MOD_DMD_USERS_ALT_AVAL", "Permite alterar avaliação de demanda de qualquer usuário, inclusive de outra lotação"],
        ["MOD_DMD_USERS_EXCL", "Permite excluir demanda de qualquer usuário, inclusive de outra lotação"],
        ["MOD_DMD_USERS_ATRIB", "Permite qualquer usuário atribuir demanda para qualqer outro"],
        ["MOD_DMD_TRF_INCL", "Permite incluir tarefas dentro de demandas"],
        ["MOD_DMD_TRF_EDT", "Permite editar tarefas dentro de demandas"],
        ["MOD_DMD_TRF_EXCL", "Permite exluir tarefas dentro de demandas"],
        ["MOD_DMD_TRF_CONS", "Permite consultar tarefas dentro de demandas"],
        ["MOD_DMD_CLONAR", "Permite clonar demandas"],
        /* Capacidades do módulo EIXOS TEMÁTICOS */
        ["MOD_EXTM", "Permite acessar item do menu Eixos temáticos"],
        ["MOD_EXTM_CONS", "Permite consultar Eixos temáticos"],
        ["MOD_EXTM_INCL", "Permite incluir Eixos temáticos"],
        ["MOD_EXTM_EDT", "Permite editar Eixos temáticos"],
        ["MOD_EXTM_EXCL", "Permite excluir Eixos temáticos"], 
        /* Capacidades do módulo ENTIDADE*/
        ["MOD_ENTD_CFG", "Permite configurar Entidade"],
        ["MOD_ENTD_CONS", "Permite consultar Entidade"],
        ["MOD_ENTD_EDT", "Permite editar entidade"],
        ["MOD_ENTD_EXCL", "Permite excluir Entidade"],
        ["MOD_ENTD_INCL", "Permite incluir Entidade"],
        /* Capacidades do módulo ENTREGAS*/
        ["MOD_ENTRG", "Permite acessar o item menu Entregas"],
        ["MOD_ENTRG_CONS", "Permite consultar Entregas"],
        ["MOD_ENTRG_INCL", "Permite incluir Entregas"],
        ["MOD_ENTRG_EDT", "Permite editar Entregas"],
        ["MOD_ENTRG_EXCL", "Permite excluir Entregas"],
        /* Capacidades do módulo FERIADO*/
        ["MOD_FER", "Permite acessar item menu feriados"],
        ["MOD_FER_CONS", "Permite consultar feriado"],
        ["MOD_FER_EDT", "Permite editar feriados"],
        ["MOD_FER_ENT_EDT", "Permite editar entidades em feriado"],
        ["MOD_FER_ENT_INCL", "Permite incluir entidades em feriado"],
        ["MOD_FER_EXCL", "Permite excluir feriado"],
        ["MOD_FER_INCL", "Permite incluir feriados"],
        /* Capacidades do módulo LOGS*/
        ["DEV_MOD_LOGS", "Permite manter registros de logs"],
        /* Capacidades do módulo LOTAÇÃO*/
        ["MOD_LOT_CONS", "Permite consultar lotação"],
        ["MOD_LOT_EDT", "Permite editar lotação"],
        ["MOD_LOT_EXCL", "Permite excluir lotação"],
        ["MOD_LOT_INCL", "Permite incluir lotação"],
        /* Capacidades do módulo MATERIAIS E SERVICOS*/
        ["MOD_MATSRV", "Permite acessar item menu materiais e serviços"],
        ["MOD_MATSRV_CONS", "Permite consultar materiais e serviços"],
        ["MOD_MATSRV_EDT", "Permite editar materiais e serviços"],
        ["MOD_MATSRV_EXCL", "Permite excluir materiais e serviços"],
        ["MOD_MATSRV_INCL", "Permite incluir materiais e serviços"],
        /* Capacidades do módulo PERFIL*/
        ["MOD_PERF_EDT", "Permite editar perfil"],
        ["MOD_PERF_EXCL", "Permite excluir perfil"],
        ["MOD_PERF_INCL", "Permite incluir perfil"],
        /* Capacidades do módulo PLANEJAMENTO INSTITUCIONAL */
        ["MOD_PLAN_INST", "Permite acessar item do menu Planejamentos Institucionais"],
        ["MOD_PLAN_INST_CONS", "Permite consultar Planejamentos Institucionais"],
        ["MOD_PLAN_INST_INCL", "Permite incluir algum tipo de Planejamento Institucional"],
        ["MOD_PLAN_INST_INCL_UNID_INST", "Permite incluir Planejamento Institucional para a Unidade Instituidora"],
        ["MOD_PLAN_INST_INCL_UNEX_LOTPRI", "Permite incluir Planejamentos Institucionais para Unidades Executoras (apenas para a sua lotação principal)"],
        ["MOD_PLAN_INST_INCL_UNEX_QQLOT", "Permite incluir Planejamentos Institucionais para Unidades Executoras (apenas as de suas lotações)"],
        ["MOD_PLAN_INST_INCL_UNEX_SUBORD", "Permite incluir Planejamentos Institucionais para Unidades Executoras (apenas as de suas lotações e suas subordinadas)"],
        ["MOD_PLAN_INST_INCL_UNEX_QUALQUER", "Permite incluir Planejamentos Institucionais para qualquer Unidade Executora, independente de sua lotação"],
        ["MOD_PLAN_INST_EDT", "Permite editar Planejamentos Institucionais"],
        ["MOD_PLAN_INST_EXCL", "Permite excluir Planejamentos Institucionais"],   
        /* Capacidades do módulo PLANO TRABALHO*/
        ["MOD_PTR", "Permite acessar item menu plano de trabalho"],
        ["MOD_PTR_CONS", "Permite consultar plano de trabalho"],
        ["MOD_PTR_EDT", "Permite editar planos de trabalho"],
        ["MOD_PTR_EXCL", "Permite excluir planos de trabalho"],
        ["MOD_PTR_INCL", "Permite incluir planos de trabalho"],
        ["MOD_PTR_USERS_CONS", "Permite consultar planos de trabalho de usuários fora da lotação"],
        ["MOD_PTR_USERS_EXCL", "Permite excluir planos de trabalho de usuários fora da lotação"],
        ["MOD_PTR_USERS_INCL", "Permite incluir planos de trabalho de usuários fora da lotação"],
        ["MOD_PTR_INCL_SEM_LOT", "Permite incluir planos de trabalho para usuários não lotado na unidade do plano"],
        ["MOD_PTR_INTSC_DATA", "Permite incluir planos de trabalho para usuários que já possuem planos no período de mesma modalidade"],
        /* Capacidades do módulo PLANO DE ENTREGAS*/
        ["MOD_PENT", "Permite acessar item do menu plano de entregas"],
        ["MOD_PENT_CONS", "Permite consultar plano de entregas"],
        ["MOD_PENT_EDT", "Permite editar planos de entregas"],
        ["MOD_PENT_EXCL", "Permite excluir planos de entregas"],
        ["MOD_PENT_INCL", "Permite incluir planos de entregas"], 
        /* Capacidades do módulo PLANO DE ENTREGAS - ENTREGAS*/
        ["MOD_PENT_ENTR_CONS", "Permite consultar entregas de um plano de entregas"],
        ["MOD_PENT_ENTR_EDT", "Permite editar entregas de um plano de entregas"],
        ["MOD_PENT_ENTR_EXCL", "Permite excluir entregas de um plano de entregas"],
        ["MOD_PENT_ENTR_INCL", "Permite incluir entregas de um plano de entregas"],
        /* Capacidades do módulo PLANO DE ENTREGAS - PONTO DE CONTROLE */
        ["MOD_PENT_PCTR_CONS", "Permite consultar pontos de controle de um plano de entregas"],
        ["MOD_PENT_PCTR_EDT", "Permite editar pontos de controle de um plano de entregas"],
        ["MOD_PENT_PCTR_EXCL", "Permite excluir pontos de controle de um plano de entregas"],
        ["MOD_PENT_PCTR_INCL", "Permite incluir pontos de controle de um plano de entregas"], 
        ["MOD_PENT_PCTR_AVAL", "Permite avaliar pontos de controle de um plano de entregas"], 
        ["MOD_PENT_PCTR_EDT_AVAL", "Permite alterar a avaliação dos pontos de controle de um plano de entregas"],      
        /* Capacidades do módulo PROG TRABALHO*/
        ["MOD_PRGT", "Permite acessar item menu programa de gestão"],
        ["MOD_PRGT_CONS", "Permite consultar programa de gestão"],
        ["MOD_PRGT_EDT", "Permite editar programas de gestão"],
        ["MOD_PRGT_EXCL", "Permite excluir programas de gestão"],
        ["MOD_PRGT_INCL", "Permite incluir programas de gestão"],
        ["MOD_PROC_INCL", "Permite incluir tipos de processos"],
        ["MOD_PRGT_PART", "Participantes do programa"],
        /* Capacidades do módulo PROJETO*/
        ["MOD_PROJ", "Permite acessar módulo projetos"],
        ["MOD_PROJ_CONS", "Permite consultar projeto"],
        ["MOD_PROJ_EDT", "Permite editar projeto"],
        ["MOD_PROJ_EXCL", "Permite excluir projeto"],
        ["MOD_PROJ_INCL", "Permite incluir Projetos"],
        /* Capacidades do módulo PROJETO RECURSO*/
        ["MOD_PROJ_REC_EDT", "Permite editar projeto recurso"],
        ["MOD_PROJ_REC_EXCL", "Permite excluir projeto recurso"],
        ["MOD_PROJ_REC_INCL", "Permite incluir projeto recurso"],
        /* Capacidades do módulo PROJETO REGRA*/
        ["MOD_PROJ_REG_EDT", "Permite editar projeto regra"],
        ["MOD_PROJ_REG_EXCL", "Permite excluir projeto regra"],
        ["MOD_PROJ_REG_INCL", "Permite incluir projeto regra"],
        /* Capacidades do módulo de templates */
        ["MOD_TEMP_INCL", "Permite incluir template"],
        ["MOD_TEMP_CONS", "Permite consultar template"],
        ["MOD_TEMP_EDT", "Permite editar template"],
        ["MOD_TEMP_EXCL", "Permite excluir template"],
        /* Capacidades do módulo TIPO ATIVIDADE*/
        ["MOD_TIPO_ATV", "Permite acessar item de menu cadastro->tipo de atividade"],
        ["MOD_TIPO_ATV_CONS", "Permite consultar atividade"],
        ["MOD_TIPO_ATV_EDT", "Permite editar atividades"],
        ["MOD_TIPO_ATV_EXCL", "Permite excluir atividades"],
        ["MOD_TIPO_ATV_INCL", "Permite incluir tipos de atividades"],
        /* Capacidades do módulo TIPO AVALIACAO*/
        ["MOD_TIPO_AVAL", "Permite acessar item de menu cadastro->tipos de avaliações"],
        ["MOD_TIPO_AVAL_CONS", "Permite consultar tipos de avaliações"],
        ["MOD_TIPO_AVAL_EDT", "Permite editar tipos de avaliações"],
        ["MOD_TIPO_AVAL_EXCL", "Permite excluir tipos de avaliações"],
        ["MOD_TIPO_AVAL_INCL", "Permite incluir tipos de avaliações"],
        /* Capacidades do módulo TIPO CAPACIDADE*/
        ["MOD_TIPO_CAP", "Permite acessar configurações de capacidades de usuário"],
        ["MOD_TIPO_CAP_CONS", "Permite consultar tipo de capacidade"],
        ["MOD_TIPO_CAP_EDT", "Permite editar tipo de capacidade"],
        ["MOD_TIPO_CAP_EXCL", "Permite excluir tipo de capacidade"],
        ["MOD_TIPO_CAP_INCL", "Permite incluir tipos de capacidades"],
        /* Capacidades do módulo TIPO DOCUMENTO*/
        ["MOD_TIPO_DOC", "Permite acessar item de menu cadastro->tipo de documento"],
        ["MOD_TIPO_DOC_CONS", "Permite consultar tipos de documentos"],
        ["MOD_TIPO_DOC_EDT", "Permite editar tipos de documentos"],
        ["MOD_TIPO_DOC_EXCL", "Permite excluir tipos de documentos"],
        ["MOD_TIPO_DOC_INCL", "Permite incluir tipos de documentos"],
        /* Capacidades do módulo TIPO JUSTIFICATIVA*/
        ["MOD_TIPO_JUST", "Permite acessar item de menu cadastro->tipo de justificativa"],
        ["MOD_TIPO_JUST_CONS", "Permite consultar tipos de justificativas"],
        ["MOD_TIPO_JUST_EDT", "Permite editar tipos de justificativas"],
        ["MOD_TIPO_JUST_EXCL", "Permite excluir tipos de justificativas"],
        ["MOD_TIPO_JUST_INCL", "Permite incluir tipos de justificativas"],
        /* Capacidades do módulo TIPO MODALIDADE*/
        ["MOD_TIPO_MDL", "Permite acessar item de menu cadastro->tipo de modalidade"],
        ["MOD_TIPO_MDL_CONS", "Permite consultar tipos de modalidades"],
        ["MOD_TIPO_MDL_EDT", "Permite editar tipos de modalidades"],
        ["MOD_TIPO_MDL_EXCL", "Permite excluir tipos de modalidades"],
        ["MOD_TIPO_MDL_INCL", "Permite incluir tipos de modalidades"],
        /* Capacidades do módulo TIPO MOTIVO AFASTAMENTO*/
        ["MOD_TIPO_MTV_AFT", "Permite acessar item de menu cadastro->tipo de motivo de afastamento"],
        ["MOD_TIPO_MTV_AFT_CONS", "Permite consultar tipos de motivos de afastamentos"],
        ["MOD_TIPO_MTV_AFT_EDT", "Permite editar tipos de motivos de afastamentos"],
        ["MOD_TIPO_MTV_AFT_EXCL", "Pemite excluir tipos de motivos de afastamentos"],
        ["MOD_TIPO_MTV_AFT_INCL", "Permite incluir tipos de motivos de afastamentos"],
        /* Capacidades do módulo TIPO PROCESSO*/
        ["MOD_TIPO_PROC", "Permite acessar item de menu cadastro->tipo de processo"],
        ["MOD_TIPO_PROC_CONS", "Permite consultar tipos de processos"],
        ["MOD_TIPO_PROC_EDT", "Permite editar tipos de processos"],
        ["MOD_TIPO_PROC_EXCL", "Permite excluir tipos de processos"],
        ["MOD_TIPO_PROC_INCL", "Permite incluir tipos de processos"],
        ["MOD_TPMAF_INCL", "Permite incluir tipos de motivos de afastamentos"],
        /* Capacidades do módulo TAREFAS*/
        ["MOD_TRF", "Permite acessar módulo/item de menu tarefas"],
        ["MOD_TRF_CONS", "Permite consultar tarefa"],
        ["MOD_TRF_EDT", "Permite editar tarefas"],
        ["MOD_TRF_EXCL", "Permite excluir tarefas"],
        ["MOD_TRF_INCL", "Permite incluir tarefas"],
        /* Capacidades do módulo de UNIDADES*/
        ["MOD_UND_CONS", "Permite consultar Unidades"],
        ["MOD_UND_EDT", "Permite editar Unidade"],
        ["MOD_UND_EXCL", "Permite excluir Unidade"],
        ["MOD_UND_INCL", "Permite incluir Unidades"],
        ["MOD_UND_UNIR", "Permite Unificar Unidades"],
        ["MOD_UND_TUDO", "Permite consultar qualquer unidade independente de subordinação"],
        ["MOD_UND_INATV", "Permite inativar uma unidade"],
        /* Capacidades do módulo USUÁRIO*/
        ["MOD_USER_CONS", "Permite consultar dados de usuário"],
        ["MOD_USER_EDT", "Permite alterar dados de usuário"],
        ["MOD_USER_EXCL", "Permite excluir dados de usuário"],
        ["MOD_USER_INCL", "Permite incluir usuário"],
        ["MOD_USER_TUDO", "Permite consultar qualquer usuário independente de lotação"],
        ["MOD_PERF_CONS", "Permite consultar perfil"],
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
