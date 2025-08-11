<?php

namespace App\Services;

use App\Models\TipoCapacidade;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;

class TipoCapacidadeService extends ServiceBase
{
  public $tiposCapacidades =
  [
    [
      "codigo" => "MOD_CTXT",
      "descricao" => "Módulo de Acesso aos Contextos",
      "capacidades" => [
        /* Capacidades do menu principal*/
        ["CTXT_GEST", "Permite acessar o contexto GESTÃO"],
        ["CTXT_EXEC", "Permite acessar o contexto EXECUÇÃO"],
        ["CTXT_ADM", "Permite acessar o contexto ADMINISTRADOR"],
        ["CTXT_DEV", "Permite acessar o contexto DEV"],
      ]
    ], [
      "codigo" => "ACESSO",    // Não é validado no front-end
      "descricao" => "Acesso aos Menus",  // Não é um módulo!
      "capacidades" => [
        ["MENU_CAD_ACESSO", "Permite acessar o menu Cadastros e Gerencial"],
        ["MENU_CONFIG_ACESSO", "Permite acessar o menu Gerenciamento"],
        ["MENU_GESTAO_ACESSO", "Permite acessar os menus Planejamento, Execução e Avaliação"],
        ["MENU_DEV_ACESSO", "Permite acessar os menus Manutenção, Logs e Auditorias e Testes"],
        ["MENU_DEV_CONSULTAS", "Permite acessar menus de consultas do Desenvolvedor"],
        ["MENU_RX_CURRICULUM_ACESSO", "Permite acessar o menu Curriculum"],
        ["MENU_RX_OPORTUNIDADES_ACESSO", "Permite acessar o menu Oportunidades"],
        ["MENU_RX_PESQUISAS_ACESSO", "Permite acessar o menu Pesquisas"],
        ["MENU_RX_QUEST_DINAMICOS_ACESSO", "Permite acessar o menu Questionários Dinâmicos"],
        ["MENU_RX_CADASTROS_ACESSO", "Permite acessar o menu Cadastros (RaioX)"],
        ["MENU_RELATORIOS", "Permite acessar o menu Relatórios"],
      ]
    ], [
      "codigo" => "MOD_AFT",
      "descricao" => "Módulo de afastamentos",
      "capacidades" => [
        /* Capacidades do módulo AFASTAMENTO*/
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
        ["MOD_ATV_DASH", "Permite mostrar o dashboard de atividades"],
      ]
    ], [
      "codigo" => "MOD_CADV",
      "descricao" => "Módulo Cadeia de Valor",
      "capacidades" => [
        /* Capacidades do módulo CADEIA DE VALOR*/
        ["MOD_CADV_EDT", "Permite editar cadeia de valor"],
        ["MOD_CADV_EXCL", "Permite excluir cadeia de valor"],
        ["MOD_CADV_INCL", "Permite incluir cadeia de valor"],
      ]
    ], [
      "codigo" => "MOD_CID", // ok
      "descricao" => "Módulo Cidades",
      "capacidades" => [
        /* Capacidades do módulo CIDADE*/
        ["MOD_CID_EDT", "Permite editar cidades"],
        ["MOD_CID_EXCL", "Permite excluir cidades"],
        ["MOD_CID_INCL", "Permite incluir cidades"],
      ]
    ], [
      "codigo" => "MOD_DEV", // ok
      "descricao" => "Módulo Desenvolvedor",
      "capacidades" => [
        /* Capacidades do módulo Desenvolvedor */
        ["MOD_DEV_TUDO", "Permite manter registros de logs, testes e integração"],
      ]
    ], [
      "codigo" => "MOD_CFG", // ok
      "descricao" => "Módulo de configurações",
      "capacidades" => [
        /* Capacidades do módulo CONFIGURAÇÃO*/
        ["MOD_CFG_ENTD", "Permite acessar Entidade no menu configurações"],
        ["MOD_CFG_PERFS", "Permite configuração de perfis no petrvs"],
        ["MOD_CFG_UND", "Permite configurar unidade"],
        ["MOD_CFG_USER", "Permite alterar configurações de usuário"],
        ["MOD_CFG_USER_CPF", "Permite alterar valor campo CPF do usuário"],
        ["MOD_CFG_USER_MAIL", "Permite alterar valor campo e-Mail do usuário"],
        ["MOD_CFG_USER_MAT", "Permite alterar valor campo matrícula do usuário"],
        ["MOD_CFG_USER_PERFIL", "Permite alterar valor campo perfil do usuário"],
        /* Capacidades do módulo Configurações de PERFIL*/
        ["MOD_PERF_EDT", "Permite editar perfil"],
        ["MOD_PERF_EXCL", "Permite excluir perfil"],
        ["MOD_PERF_INCL", "Permite incluir perfil"],
      ]
    ], [
      "codigo" => "MOD_ENTD", // ok
      "descricao" => "Módulo Entidade",
      "capacidades" => [
        /* Capacidades do módulo ENTIDADE*/
        ["MOD_ENTD_EDT", "Permite editar entidade"],
        ["MOD_ENTD_EXCL", "Permite excluir Entidade"],
        ["MOD_ENTD_INCL", "Permite incluir Entidade"],
      ]
    ], [
      "codigo" => "MOD_EXTM", //ok
      "descricao" => "Módulo Eixos Temáticos",
      "capacidades" => [
        /* Capacidades do módulo EIXOS TEMÁTICOS */
        ["MOD_EXTM_INCL", "Permite incluir Eixos temáticos"],
        ["MOD_EXTM_EDT", "Permite editar Eixos temáticos"],
        ["MOD_EXTM_EXCL", "Permite excluir Eixos temáticos"],
      ]
    ] /*[
      "codigo" => "MOD_ENTRG", //ok
      "descricao" => "Módulo de Entregas",
      "capacidades" => [
        ["MOD_ENTRG_INCL", "Permite incluir Entregas"],
        ["MOD_ENTRG_EDT", "Permite editar Entregas"],
        ["MOD_ENTRG_EXCL", "Permite excluir Entregas"],
      ]
    ]*/, [
      "codigo" => "MOD_FER", //ok
      "descricao" => "Módulo feriados",
      "capacidades" => [
        /* Capacidades do módulo FERIADO*/
        ["MOD_FER_EDT", "Permite editar feriados"],
        ["MOD_FER_EXCL", "Permite excluir feriado"],
        ["MOD_FER_INCL", "Permite incluir feriados"],
      ]
    ], [
      "codigo" => "MOD_MATSRV", //ok
      "descricao" => "Módulo materiais e serviços",
      "capacidades" => [
        /* Capacidades do módulo MATERIAIS E SERVIÇOS*/
        ["MOD_MATSRV_EDT", "Permite editar materiais e serviços"],
        ["MOD_MATSRV_EXCL", "Permite excluir materiais e serviços"],
        ["MOD_MATSRV_INCL", "Permite incluir materiais e serviços"],
      ]
    ], [
      "codigo" => "MOD_PLAN_INST", //ok
      "descricao" => "Módulo de Planejamento Institucional",
      "capacidades" => [
        /* Capacidades do módulo PLANEJAMENTO INSTITUCIONAL */
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
      "codigo" => "MOD_PTR",
      "descricao" => "Módulo de Plano de Trabalho",
      "capacidades" => [
        /* Capacidades do módulo PLANO DE TRABALHO */
        ["MOD_PTR_EDT", "Permite editar planos de trabalho"],
        ["MOD_PTR_INCL", "Permite incluir planos de trabalho"],
        ["MOD_PTR_EDT_ATV", "Permite editar planos de trabalho ativos"],
        ["MOD_PTR_CNC", "Permite cancelar planos de trabalho"],
        ["MOD_PTR_USERS_INCL",   "Permite incluir planos de trabalho para usuários que não estão lotados nas áreas de trabalho do usuário logado"],
        ["MOD_PTR_INTSC_DATA", "Permite incluir planos de trabalho que possuam períodos conflitantes com outro plano já existente na mesma unidade executora"]
      ]
    ], [
      "codigo" => "MOD_PTR_ENTR",
      "descricao" => "Módulo de Plano de Trabalho - Entregas",
      "capacidades" => [
        /* Capacidades do módulo PLANO DE TRABALHO */
        ["MOD_PTR_ENTR_EDT", "Permite editar entregas de um plano de trabalho"],
        ["MOD_PTR_ENTR_EXCL", "Permite excluir entregas de um plano de trabalho"],
        ["MOD_PTR_ENTR_INCL", "Permite incluir entregas de um plano de trabalho"],
      ]
    ], [
      "codigo" => "MOD_PTR_CSLD", //ok
      "descricao" => "Módulo de consolidações do Plano de Trabalho",
      "capacidades" => [
        ["MOD_PTR_CSLD_EDT", "Permite editar a consolidação do planos de trabalho"],
        ["MOD_PTR_CSLD_EXCL", "Permite excluir a consolidação do planos de trabalho"],
        ["MOD_PTR_CSLD_INCL", "Persmite incluir a consolidação do planos de trabalho"],
        ["MOD_PTR_CSLD_CONCL", "Permite realizar conclusão (independete de ser o usuário da consolidação)"],
        ["MOD_PTR_CSLD_DES_CONCL", "Permite desfazer conclusão (independete de ser o usuário da consolidação)"],
        ["MOD_PTR_CSLD_CANC_AVAL", "Permite cancelar avaliação"],
        ["MOD_PTR_CSLD_AVAL", "Permite avaliar"],
        ["MOD_PTR_CSLD_REC_AVAL", "Permite recorrer da avaliação"]
      ]
    ],
    [
      "codigo" => "MOD_PENT",
      "descricao" => "Permite acesso ao menu e consultas do módulo Plano de Entregas.",
      "capacidades" => [
        /* Capacidades do módulo PLANO DE ENTREGA */
        ["MOD_PENT_INCL", "Permite incluir planos de entregas."],
        ["MOD_PENT_EDT", "Permite editar planos de entregas."],
        ["MOD_PENT_EXCL", "Permite excluir planos de entregas."],
        ["MOD_PENT_CNC", "Permite cancelar planos de entregas."],
        ["MOD_PENT_EDT_ATV_HOMOL", "Permite editar planos de entregas que estejam no status ATIVO. O plano voltará ao status HOMOLOGANDO."],
        ["MOD_PENT_EDT_ATV_ATV", "Permite editar planos de entregas que estejam no status ATIVO, mantendo-os neste status."],
        ["MOD_PENT_HOMOL", "Permite homologar planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação."],
        ["MOD_PENT_CANC_HOMOL", "Permite cancelar a homologação dos planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação."],
        ["MOD_PENT_AVAL", "Permite avaliar planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação."],
        ["MOD_PENT_AVAL_SUBORD", "Permite avaliar planos de entregas de todas as Unidades subordinadas à sua Unidade de lotação."],
        ["MOD_PENT_CANC_AVAL", "Permite cancelar a avaliação dos planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação."],
        ["MOD_PENT_EDT_FLH", "Permite alterar planos de entregas das Unidades imediatamente subordinadas à sua Unidade de lotação."],
        ["MOD_PENT_LIB_HOMOL", "Permite liberar para homologação planos de entregas da sua Unidade de lotação."],
        ["MOD_PENT_RET_HOMOL", "Permite retirar de homologação planos de entregas da sua Unidade de lotação."],
        ["MOD_PENT_CONC", "Permite marcar como concluídos planos de entregas da sua Unidade de lotação."],
        ["MOD_PENT_CANC_CONCL", "Permite cancelar a conclusão de planos de entregas da sua Unidade de lotação."],
        ["MOD_PENT_SUSP", "Permite suspender planos de entregas da sua Unidade de lotação."],
        ["MOD_PENT_RTV", "Permite reativar planos de entregas suspensos, desde que sejam da sua Unidade de lotação."],
        ["MOD_PENT_ARQ", "Permite arquivar planos de entregas da sua Unidade de lotação."],
        ["MOD_PENT_QQR_UND", "Permite Incluir/Editar planos de entregas de qualquer Unidade, desde que possua também as respectivas MOD_PENT_INCL/MOD_PENT_EDT (independente de qualquer outra condição)."],
        /* Capacidades do módulo PLANO DE ENTREGAS - ENTREGAS*/
        ["MOD_PENT_ENTR_EDT", "Permite editar entregas de um plano de entregas"],
        ["MOD_PENT_ENTR_EXCL", "Permite excluir entregas de um plano de entregas"],
        ["MOD_PENT_ENTR_INCL", "Permite incluir entregas de um plano de entregas"],
        ["MOD_PENT_ENTR_EXTRPL", "Permite incluir entregas que extrapolem o plano de entregas"],
        /* Capacidades do módulo PLANO DE ENTREGAS - ENTREGAS - PROGRESSOS*/
        ["MOD_PENT_ENTR_PRO_INCL", "Permite incluir o progresso da entrega de um plano de entregas"],
        ["MOD_PENT_ENTR_PRO_EDT", "Permite editar o progresso da entrega de um plano de entregas"],
        ["MOD_PENT_ENTR_PRO_EXCL", "Permite excluir o progresso da entrega de um plano de entregas"],
      ]
    ], [
      "codigo" => "MOD_PRGT",
      "descricao" => "Módulo de Programa de Gestão",
      "capacidades" => [
        /* Capacidades do módulo PROGRAMA DE GESTÃO */
        ["MOD_PRGT_EDT", "Permite editar programas de gestão"],
        ["MOD_PRGT_EXCL", "Permite excluir programas de gestão"],
        ["MOD_PRGT_INCL", "Permite incluir programas de gestão"],
        ["MOD_PRGT_CONCL", "Permite concluir programas de gestão"],
      ]
    ], [
      "codigo" => "MOD_PART",
      "descricao" => "Módulo de Participantes do Programa de Gestão",
      "capacidades" => [
        /* Capacidades do módulo PARTICIPANTES DO PROGRAMA DE GESTÃO */
        ["MOD_PART_HAB", "Permite habilitar participantes do programa"],
        ["MOD_PART_INCL", "Permite incluir participantes do programa"],
        ["MOD_PART_DESAB", "Permite desabilitar participantes do programa"],
        ["MOD_PRGT_EXT", "Permite visualizar todos os programas, independente da hierarquia de unidades"],
        ["MOD_PART_PEDAGIO", "Permite gerenciar o período de pedagio dos participantes do programa"]
      ]
    ], [
      "codigo" => "MOD_PROD",
      "descricao" => "Módulo de Produtos e Serviços",
      "capacidades" => [
        /* Capacidades do módulo PRODUTO */
        ["MOD_PROD", "Permite acesso aos produtos e serviços"],
        ["MOD_PROD_INCL", "Permite incluir catálogo de produtos e serviços"],
        ["MOD_PROD_EDT", "Permite editar produtos e serviços"],
        ["MOD_PROD_EXCL", "Permite excluir produtos e serviços"]
      ]
    ], [
      "codigo" => "MOD_SOLUCOES",
      "descricao" => "Módulo de Soluções",
      "capacidades" => [
        ["MOD_SOLUCOES_EDT", "Permite editar Soluções"],
        ["MOD_SOLUCOES_EXCL", "Permite excluir Soluções"],
        ["MOD_SOLUCOES_INCL", "Permite incluir Soluções"]
      ]
    ], [
      "codigo" => "MOD_TEMP",
      "descricao" => "Módulo de Templates",
      "capacidades" => [
        /* Capacidades do módulo de templates */
        ["MOD_TEMP_INCL", "Permite incluir template"],
        ["MOD_TEMP_EDT", "Permite editar template"],
        ["MOD_TEMP_EXCL", "Permite excluir template"],
      ]
    ], [
      "codigo" => "MOD_TIPO_ATV",
      "descricao" => "Módulo de Tipos de Atividade",
      "capacidades" => [
        /* Capacidades do módulo TIPO ATIVIDADE*/
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
      "codigo" => "MOD_TIPO_DOC",
      "descricao" => "Módulo de Tipos de Documentos",
      "capacidades" => [
        /* Capacidades do módulo TIPO DOCUMENTO*/
        ["MOD_TIPO_DOC_EDT", "Permite editar tipos de documentos"],
        ["MOD_TIPO_DOC_EXCL", "Permite excluir tipos de documentos"],
        ["MOD_TIPO_DOC_INCL", "Permite incluir tipos de documentos"],
      ]
    ], [
      "codigo" => "MOD_TIPO_JUST",
      "descricao" => "Módulo de Tipos de Justificativa",
      "capacidades" => [
        /* Capacidades do módulo TIPO JUSTIFICATIVA*/
        ["MOD_TIPO_JUST_EDT", "Permite editar tipos de justificativas"],
        ["MOD_TIPO_JUST_EXCL", "Permite excluir tipos de justificativas"],
        ["MOD_TIPO_JUST_INCL", "Permite incluir tipos de justificativas"],
      ]
    ] /*[
      "codigo" => "MOD_TIPO_MDL",
      "descricao" => "Módulo de Tipos de Modalidade",
      "capacidades" => [
        ["MOD_TIPO_MDL_EDT", "Permite editar tipos de modalidades"],
        ["MOD_TIPO_MDL_EXCL", "Permite excluir tipos de modalidades"],
        ["MOD_TIPO_MDL_INCL", "Permite incluir tipos de modalidades"],
      ]
    ], [
      "codigo" => "MOD_TIPO_MTV_AFT", //ok
      "descricao" => "Módulo de Tipos de Motivos de Afastamento",
      "capacidades" => [
        ["MOD_TIPO_MTV_AFT_EDT", "Permite editar tipos de motivos de afastamentos"],
        ["MOD_TIPO_MTV_AFT_EXCL", "Pemite excluir tipos de motivos de afastamentos"],
        ["MOD_TIPO_MTV_AFT_INCL", "Permite incluir tipos de motivos de afastamentos"],
        ["MOD_TPMAF_INCL", "Permite incluir tipos de motivos de afastamentos"], //só definição
      ]
    ]*/, [
      "codigo" => "MOD_TIPO_PROC",
      "descricao" => "Módulo de Tipos de Processos",
      "capacidades" => [
        /* Capacidades do módulo TIPO PROCESSO*/
        ["MOD_TIPO_PROC_EDT", "Permite editar tipos de processos"],
        ["MOD_TIPO_PROC_EXCL", "Permite excluir tipos de processos"],
        ["MOD_TIPO_PROC_INCL", "Permite incluir tipos de processos"],
      ]
    ], [
      "codigo" => "MOD_TRF",
      "descricao" => "Módulo Tarefas",
      "capacidades" => [
        /* Capacidades do módulo TAREFAS*/
        ["MOD_TRF_EDT", "Permite editar tarefas"],
        ["MOD_TRF_EXCL", "Permite excluir tarefas"],
        ["MOD_TRF_INCL", "Permite incluir tarefas"],
      ]
    ], [
      "codigo" => "MOD_TIPO_TRF",
      "descricao" => "Módulo Tipo Tarefas",
      "capacidades" => [
        /* Capacidades do módulo TIPO TAREFA*/
        ["MOD_TIPO_TRF_EDT", "Permite editar tipos de tarefas"],
        ["MOD_TIPO_TRF_EXCL", "Permite excluir tipos de tarefas"],
        ["MOD_TIPO_TRF_INCL", "Permite incluir tipos de tarefas"],
      ]
    ], [
      "codigo" => "MOD_UND",
      "descricao" => "Módulo Unidades",
      "capacidades" => [
        /* Capacidades do módulo UNIDADES*/
        ["MOD_UND_EDT", "Permite editar unidade"],
        ["MOD_UND_EXCL", "Permite excluir unidade"],
        ["MOD_UND_INCL", "Permite incluir unidade"],
        ["MOD_UND_TUDO", "Permite consultar qualquer unidade independente de subordinação"],
        ["MOD_UND_INATV", "Permite inativar uma unidade"],
        ["MOD_UND_INTG", "Permite gerenciar integrantes da unidade"],
        ["MOD_UND_INTG_INCL", "Permite incluir integrantes da unidade"],
        ["MOD_UND_INTG_EDT", "Permite editar integrantes da unidade"],
        ["MOD_UND_INTG_EXCL", "Permite excluir integrantes da unidade"],
        ["MOD_UND_INTG_GST", "Permite alterar gestor e substituto"],
        ["MOD_UND_INST", "Permite alterar o campo instituidora"],
      ]
    ], [
      "codigo" => "MOD_USER", //ok
      "descricao" => "Módulo Usuários",
      "capacidades" => [
        /* Capacidades do módulo USUÁRIOS */
        ["MOD_USER_EDT", "Permite alterar usuário"],
        ["MOD_USER_EXCL", "Permite excluir usuário"],
        ["MOD_USER_INCL", "Permite incluir usuário"],
        ["MOD_USER_TUDO", "Permite consultar qualquer usuário independente de lotação"],
        ["MOD_USER_ATRIB", "Permite gerenciar atribuições de usuário"],
      ]
    ], [
      "codigo" => "MOD_AUDIT",
      "descricao" => "Módulo Auditoria",
      "capacidades" => [
        ["MOD_AUDIT_DEL", "Permite visualizar registros deletados"],
        ["MOD_AUDIT_LOG", "Permite visualizar logs das tabelas"]
      ]
    ], [
      "codigo" => "MOD_CLI",
      "descricao" => "Módulo de Clientes",
      "capacidades" => [
        ["MOD_CLI_EDT", "Permite editar clientes"],
        ["MOD_CLI_EXCL", "Permite excluir clientes"],
        ["MOD_CLI_INCL", "Permite incluir clientes"]
      ]
    ], [
      "codigo" => "MOD_TIPO_CLI",
      "descricao" => "Módulo de Tipos de Clientes",
      "capacidades" => [
        ["MOD_TIPO_CLI_EDT", "Permite editar tipos de clientes"],
        ["MOD_TIPO_CLI_EXCL", "Permite excluir tipos de clientes"],
        ["MOD_TIPO_CLI_INCL", "Permite incluir tipos de clientes"]
      ]
    ],
    [
        "codigo" => "MOD_RELATORIOS",
        "descricao" => "Módulo de Relatórios",
    ],
    [
        "codigo" => "MOD_RELATORIO_PT",
        "descricao" => "Relatório de Planos de Trabalho",
    ],
    [
        "codigo" => "MOD_RELATORIO_PE",
        "descricao" => "Relatório de Planos de Entrega",
    ],
    [
        "codigo" => "MOD_RELATORIO_USUARIO",
        "descricao" => "Relatório de Agentes Públicos",
    ],
    [
        "codigo" => "MOD_RELATORIO_USUARIO_TODAS_UNIDADES",
        "descricao" => "Relatório de Agentes Públicos - Listar todas as unidades",
    ],
    [
        "codigo" => "MOD_RELATORIO_UNIDADE",
        "descricao" => "Relatório de Unidades",
    ],
    [
        "codigo" => "MOD_RELATORIO_UNIDADE_TODAS_UNIDADES",
        "descricao" => "Relatório de Unidades - Listar todas as unidades",
    ],
  ];

  private function differentDev(&$data)
  {
    if (!$this->isLoggedUserADeveloper()) {
      if (isset($data['where']) && count($data['where']) > 0) {
        if (gettype($data['where'][0]) == "string") {
          $data['where'] = [["not like", "DEV_%"], $data['where']];
        } else {
          $data['where'][] = ["not like", "DEV_%"];
        }
      } else {
        $data['where'] = [["not like", "DEV_%"]];
      }
    }
  }

  public function searchText($data)
  {
    $this->differentDev($data);
    return parent::searchText($data);
  }

  public function query($data)
  {
    $this->differentDev($data);
    return parent::query($data);
  }
}

/*
Navegação         Menus                     Capacidade
----------------------------------------------------------------------------
navGestao         Planejamento              MENU_GESTAO_ACESSO
                  Execução                  MENU_GESTAO_ACESSO
                  Avaliação                 MENU_GESTAO_ACESSO
                  Gerenciamento             MENU_CONFIG_ACESSO
                  Cadastros                 MENU_CAD_ACESSO

navAdministrador  Cadastros                 MENU_CAD_ACESSO
                  Gerenciamento             MENU_CONFIG_ACESSO

navDev            Manutenção                MENU_DEV_ACESSO
                  Logs e Auditorias         MENU_DEV_ACESSO
                  Testes                    MENU_DEV_ACESSO
                  Consultas                 MENU_DEV_ACESSO

navPonto
navProjeto        Cadastros                 MENU_CAD_ACESSO
                  Gerencial                 MENU_CAD_ACESSO

navRaioX          Curriculum                MENU_RX_CURRICULUM_ACESSO
                  Oportunidades             MENU_RX_OPORTUNIDADES_ACESSO
                  Pesquisas                 MENU_RX_PESQUISAS_ACESSO
                  Questionários Dinâmicos   MENU_RX_QUEST_DINAMICOS_ACESSO
                  Cadastros                 MENU_RX_CADASTROS_ACESSO
*/
