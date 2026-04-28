var AppComponent_1;
import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { DialogService } from './services/dialog.service';
import { GlobalsService } from './services/globals.service';
import { LexicalService } from './services/lexical.service';
import { NavigateService } from './services/navigate.service';
import { UtilService } from './services/util.service';
import { LookupService } from './services/lookup.service';
import { EntityService } from './services/entity.service';
import { NotificacaoService } from './modules/uteis/notificacoes/notificacao.service';
import { UnidadeService } from './services/unidade.service';
import { SiapeBlacklistServidorDaoService } from './dao/siape-blacklist-servidor-dao.service';
import { IntegranteService } from './services/integrante.service';
let AppComponent = class AppComponent {
    static { AppComponent_1 = this; }
    constructor(injector) {
        this.injector = injector;
        this.title = 'petrvs';
        this.error = '';
        this.unidadeHora = "";
        this.menuSchema = {};
        this.menuToolbar = [];
        this.menuContexto = [];
        this.siapeBlacklistRows = [];
        this.siapeBlacklistMatriculas = [];
        this.tooltipWarning = 'Matrícula em processo de inativação';
        /* Instancia singleton da aplicação */
        AppComponent_1.instance = this;
        /* Injector */
        this.gb = injector.get(GlobalsService);
        this.cdRef = injector.get(ChangeDetectorRef);
        this.auth = injector.get(AuthService);
        this.dialog = injector.get(DialogService);
        this.lex = injector.get(LexicalService);
        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.go = injector.get(NavigateService);
        this.utils = injector.get(UtilService);
        this.lookup = injector.get(LookupService);
        this.entity = injector.get(EntityService);
        this.notificacao = injector.get(NotificacaoService);
        this.unidadeService = injector.get(UnidadeService);
        this.siapeBlacklistDao = injector.get(SiapeBlacklistServidorDaoService);
        this.integranteService = injector.get(IntegranteService);
        /* Inicializações */
        this.notificacao.heartbeat();
        this.auth.app = this;
        this.lex.app = this;
        this.gb.app = this;
        if (this.gb.isEmbedded && this.gb.initialRoute?.length) {
            this.go.navigate({ route: this.gb.initialRoute });
        }
        this.lex.cdRef = this.cdRef;
        /* Definição do menu do sistema */
        this.setMenuVars();
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event) => {
            window.clarity?.('set', 'page', event.urlAfterRedirects);
        });
    }
    setMenuVars() {
        this.menuSchema = {
            /* Cadastros */
            CIDADES: { name: this.lex.translate("Cidades"), permition: 'MOD_CID', route: ['cadastros', 'cidade'], icon: this.entity.getIcon('Cidade') },
            CLIENTES: { name: this.lex.translate("Clientes"), permition: 'MOD_CLI', route: ['cadastros', 'cliente'], icon: this.entity.getIcon('Cliente') }, // TODO : retornar esse menu ao subir produtos
            EIXOS_TEMATICOS: { name: this.lex.translate("Eixos Temáticos"), permition: 'MOD_EXTM', route: ['cadastros', 'eixo-tematico'], icon: this.entity.getIcon('EixoTematico') },
            // ENTREGAS: { name: this.lex.translate("Modelos de Entregas"), permition: 'MOD_ENTRG', route: ['cadastros', 'entrega'], icon: this.entity.getIcon('Entrega') },
            FERIADOS: { name: this.lex.translate("Feriados"), permition: 'MOD_FER', route: ['cadastros', 'feriado'], icon: this.entity.getIcon('Feriado') },
            TEMPLATES: { name: this.lex.translate("Templates"), permition: 'MOD_TEMP', route: ['cadastros', 'templates'], icon: this.entity.getIcon('Template'), params: { modo: "listagem" } },
            TIPOS_TAREFAS: { name: this.lex.translate("Tipos de Tarefas"), permition: 'MOD_TIPO_TRF', route: ['cadastros', 'tipo-tarefa'], icon: this.entity.getIcon('TipoTarefa') },
            TIPOS_ATIVIDADES: { name: this.lex.translate("Tipos de Atividades"), permition: 'MOD_TIPO_ATV', route: ['cadastros', 'tipo-atividade'], icon: this.entity.getIcon('TipoAtividade') },
            TIPOS_CLIENTES: { name: this.lex.translate("Tipos de Clientes"), permition: 'MOD_TIPO_CLI', route: ['cadastros', 'tipo-cliente'], icon: this.entity.getIcon('TipoCliente') },
            // TIPOS_AVALIACOES: { name: this.lex.translate("Tipos de Avaliação"), permition: 'MOD_TIPO_AVAL', route: ['cadastros', 'tipo-avaliacao'], icon: this.entity.getIcon('TipoAvaliacao') },
            TIPOS_DOCUMENTOS: { name: this.lex.translate("Tipos de Documento"), permition: 'MOD_TIPO_DOC', route: ['cadastros', 'tipo-documento'], icon: this.entity.getIcon('TipoDocumento') },
            TIPOS_JUSTIFICATIVAS: { name: this.lex.translate("Tipos de Justificativa"), permition: 'MOD_TIPO_JUST', route: ['cadastros', 'tipo-justificativa'], icon: this.entity.getIcon('TipoJustificativa') },
            // TIPOS_MOTIVOS_AFASTAMENTOS: { name: this.lex.translate("Tipos de Motivo de Afastamento"), permition: 'MOD_TIPO_MTV_AFT', route: ['cadastros', 'tipo-motivo-afastamento'], icon: this.entity.getIcon('TipoMotivoAfastamento') },
            TIPOS_PROCESSOS: { name: this.lex.translate("Tipos de Processo"), permition: 'MOD_TIPO_PROC', route: ['cadastros', 'tipo-processo'], icon: this.entity.getIcon('TipoProcesso') },
            /* Gestão */
            AFASTAMENTOS: { name: this.lex.translate("Ocorrências"), permition: 'MOD_AFT', route: ['gestao', 'afastamento'], icon: this.entity.getIcon('Afastamento') },
            OCORRENCIAS: { name: this.lex.translate("Ocorrencias"), permition: 'MOD_OCOR', route: ['gestao', 'ocorrencia'], icon: this.entity.getIcon('Ocorrencia') },
            CADEIAS_VALORES: { name: this.lex.translate("Cadeias de Valores"), permition: 'MOD_CADV', route: ['gestao', 'cadeia-valor'], icon: this.entity.getIcon('CadeiaValor') },
            ATIVIDADES: { name: this.lex.translate("Atividades"), permition: 'MOD_ATV', route: ['gestao', 'atividade'], icon: this.entity.getIcon('Atividade') },
            PLANEJAMENTOS_INSTITUCIONAIS: { name: this.lex.translate("Planejamentos Institucionais"), permition: 'MOD_PLAN_INST', route: ['gestao', 'planejamento'], icon: this.entity.getIcon('Planejamento') },
            PLANOS_ENTREGAS: { name: this.lex.translate("Planos de Entregas"), permition: 'MOD_PENT', route: ['gestao', 'plano-entrega'], icon: this.entity.getIcon('PlanoEntrega'), params: { planejamento: true } },
            PLANOS_TRABALHOS: { name: this.lex.translate("Planos de Trabalho"), permition: 'MOD_PTR', route: ['gestao', 'plano-trabalho'], icon: this.entity.getIcon('PlanoTrabalho') },
            CONSOLIDACOES: { name: this.lex.translate("Consolidações"), permition: 'MOD_PTR_CSLD', route: ['gestao', 'plano-trabalho', 'consolidacao'], icon: this.entity.getIcon('PlanoTrabalhoConsolidacao') },
            PROGRAMAS_GESTAO: { name: this.lex.translate("Programas de Gestão"), permition: 'MOD_PRGT', route: ['gestao', 'programa'], icon: this.entity.getIcon('Programa') },
            HABILITACOES_PROGRAMA: { name: this.lex.translate("Habilitações"), permition: 'MOD_PART', route: ['gestao', 'programa', 'participantes'], icon: this.entity.getIcon('Programa') },
            PORTIFOLIOS: { name: this.lex.translate("Portifólios"), permition: 'MOD_PROJ', route: ['gestao', 'projeto'], icon: this.entity.getIcon('Projeto') },
            PRODUTOS: { name: this.lex.translate("Produtos e Serviços"), permition: 'MOD_PROD', route: ['gestao', 'produto'], icon: this.entity.getIcon('Projeto') }, // TODO : retornar esse menu ao subir produtos
            SOLUCOES: { name: this.lex.translate("Soluções"), permition: 'MOD_SOLUCOES', route: ['gestao', 'solucao'], icon: this.entity.getIcon('Solucao') }, // TODO : retornar esse menu ao subir produtos
            /* Execucao */
            EXECUCAO_PLANOS_ENTREGAS: { name: this.lex.translate("Planos de Entregas"), permition: 'MOD_PENT', route: ['execucao', 'plano-entrega'], icon: this.entity.getIcon('PlanoEntrega'), params: { execucao: true } },
            /* Relatórios */
            FORCAS_TRABALHOS_SERVIDORES: { name: "Força de Trabalho - Servidor", permition: 'MOD_PTR_CONS', route: ['relatorios', 'forca-de-trabalho', 'servidor'], icon: this.entity.getIcon('RelatorioServidor') },
            FORCAS_TRABALHOS_AREAS: { name: "Força de Trabalho - Área", permition: 'MOD_PTR_CONS', route: ['relatorios', 'forca-de-trabalho', 'area'], icon: this.entity.getIcon('RelatorioArea') },
            /* Avaliações */
            AVALIACAO_CONSOLIDACAO_PLANO_TRABALHO: { name: this.lex.translate("Consolidações"), permition: 'MOD_PTR_CSLD_AVAL', route: ['avaliacao', 'plano-trabalho', 'consolidacao', 'avaliacao'], icon: this.entity.getIcon('PlanoTrabalho') },
            AVALIACAO_PLANOS_ENTREGAS: { name: this.lex.translate("Planos de Entregas"), permition: 'MOD_PENT_AVAL', route: ['avaliacao', 'plano-entrega'], icon: this.entity.getIcon('PlanoEntrega'), params: { avaliacao: true } },
            /* Configurações */
            PREFERENCIAS: { name: "Preferências", permition: '', route: ['configuracoes', 'preferencia'], metadata: { root: true, modal: true }, icon: this.entity.getIcon('Preferencia') },
            ENTIDADES: { name: this.lex.translate("Entidades"), permition: 'MOD_CFG_ENTD', route: ['configuracoes', 'entidade'], icon: this.entity.getIcon('Entidade') },
            UNIDADES: { name: this.lex.translate("Unidades"), permition: 'MOD_CFG_UND', route: ['configuracoes', 'unidade'], icon: this.entity.getIcon('Unidade') },
            USUARIOS: { name: this.lex.translate("Usuários"), permition: 'MOD_CFG_USER', route: ['configuracoes', 'usuario'], icon: this.entity.getIcon('Usuario') },
            PERFIS: { name: this.lex.translate("Perfis"), permition: 'MOD_CFG_PERFS', route: ['configuracoes', 'perfil'], icon: this.entity.getIcon('Perfil') },
            SOBRE: { name: this.lex.translate("Sobre"), permition: '', route: ['configuracoes', 'sobre'], icon: "" },
            /* Logs */
            ROTINAS_INTEGRACAO: { name: "Rotina de Integração", permition: '', route: ['rotinas', 'integracao'], icon: this.entity.getIcon('Integracao') },
            LOGS_ALTERACOES: { name: "Log das Alterações", permition: '', route: ['logs', 'change'], icon: this.entity.getIcon('Change') },
            LOGS_ERROS: { name: "Log dos Erros", permition: '', route: ['logs', 'error'], icon: this.entity.getIcon('Error') },
            LOGS_TRAFEGOS: { name: "Log do Tráfego", permition: '', route: ['logs', 'traffic'], icon: this.entity.getIcon('Traffic') },
            LOGS_SYSTEM: { name: "Logs do Sistema", permition: '', route: ['logs', 'system-logs'], icon: 'bi bi-file-earmark-text' },
            TESTE_IMPERSONATE: { name: "IMPERSONATE", permition: '', route: ['impersonate'], icon: this.entity.getIcon('Teste') },
            DEV_CPF_CONSULTA_SIAPE: { name: "Consulta CPF SIAPE", permition: '', route: ['consultas', 'cpf-siape'], icon: this.entity.getIcon('ConsultaCPFSIAPE') },
            DEV_UNIDADE_CONSULTA_SIAPE: { name: "Consulta Unidade SIAPE", permition: '', route: ['consultas', 'unidade-siape'], icon: this.entity.getIcon('ConsultaUnidadeSIAPE') },
            ENVIO_LOGS: { name: "Log dos Envios", permition: '', route: ['logs', 'envios'], icon: 'bi-list-check' },
            ENVIO_FORCAR: { name: "Forçar Envio", permition: '', route: ['envios', 'forcar'], icon: this.entity.getIcon('Envio') },
            ENVIO_REINICIAR: { name: "Resetar Envios", permition: '', route: ['envios', 'reiniciar'], icon: 'bi-arrow-clockwise' },
            /* SIAPE */
            BLACKLIST_SERVIDOR: { name: "CPFs indisponíveis", permition: '', route: ['siape', 'blacklist-servidor'], icon: 'bi bi-person-x' },
            BLACKLIST_UNIDADE: { name: "Unidades indisponíveis", permition: '', route: ['siape', 'blacklist-unidade'], icon: 'bi bi-building-dash' },
            /* RELATORIOS */
            RELATORIO_PLANO_TRABALHO: {
                name: this.lex.translate("Planos de Trabalho"),
                permition: 'MOD_RELATORIO_PT',
                route: ['relatorios', 'planos-trabalho'],
                icon: this.entity.getIcon('PlanoTrabalho')
            },
            RELATORIO_PLANO_ENTREGA: {
                name: this.lex.translate("Planos de Entrega"),
                permition: 'MOD_RELATORIO_PE',
                route: ['relatorios', 'planos-entrega'],
                icon: this.entity.getIcon('PlanoEntrega')
            },
            RELATORIO_USUARIOS: {
                name: this.lex.translate("Agentes Públicos"),
                permition: 'MOD_RELATORIO_USUARIO',
                icon: this.entity.getIcon('Usuario'),
                route: ['relatorios', 'agentes'],
            },
            RELATORIO_UNIDADES: {
                name: "Unidades",
                permition: 'MOD_RELATORIO_UNIDADE',
                icon: this.entity.getIcon('Unidade'),
                route: ['relatorios', 'unidades'],
                //onClick: ()=> this.emDesenvolvimento()
            },
            RELATORIO_CARGA_INDIVIDUAL_SIAPE: {
                name: "Carga Individual SIAPE",
                permition: 'MOD_SIAPE_RELATORIO_CARGA',
                icon: 'bi bi-clipboard-data',
                route: ['relatorios', 'carga-individual-siape'],
            },
            INDICADORES_ENTREGAS: {
                name: "Entregas",
                //permition: 'MOD_IND_ENTREGAS',
                icon: this.entity.getIcon('PlanoEntrega'),
                route: ['relatorios', 'indicadores', 'entregas'],
            },
            INDICADORES_EQUIPES: {
                name: "Equipes",
                // permition: 'MOD_IND_EQUIPES',
                icon: this.entity.getIcon('Usuario'),
                route: ['relatorios', 'indicadores', 'equipes'],
            },
            INDICADORES_GESTAO: {
                name: "Gestão do PGD",
                // permition: 'MOD_IND_GESTAO',
                icon: this.entity.getIcon('Unidade'),
                route: ['relatorios', 'indicadores', 'gestao'],
            },
            /* Outros */
            PAINEL: { name: "Painel", permition: '', route: ['panel'], icon: "" },
            AUDITORIA: { name: "Auditoria", permition: '', route: ['configuracoes', 'sobre'], icon: "" }
        };
        this.moduloGestao = [{
                name: this.lex.translate("Planejamento"),
                permition: "MENU_GESTAO_ACESSO",
                id: "navbarDropdownGestaoPlanejamento",
                menu: [
                    this.menuSchema.PLANEJAMENTOS_INSTITUCIONAIS,
                    this.menuSchema.CADEIAS_VALORES,
                    // this.menuSchema.SOLUCOES,
                    // this.menuSchema.PRODUTOS,
                    this.menuSchema.PROGRAMAS_GESTAO,
                    this.menuSchema.HABILITACOES_PROGRAMA,
                    this.menuSchema.PLANOS_ENTREGAS,
                    this.menuSchema.PLANOS_TRABALHOS,
                ].sort(this.orderMenu)
            }, {
                name: this.lex.translate("Execução"),
                permition: "MENU_GESTAO_ACESSO",
                id: "navbarDropdownGestaoExecucao",
                menu: [
                    this.menuSchema.EXECUCAO_PLANOS_ENTREGAS,
                    Object.assign({}, this.menuSchema.CONSOLIDACOES, { params: { tab: "USUARIO" } }),
                    this.menuSchema.OCORRENCIAS,
                    this.menuSchema.AFASTAMENTOS,
                    this.menuSchema.ATIVIDADES
                ].sort(this.orderMenu)
            }, {
                name: this.lex.translate("Avaliação"),
                permition: "MENU_GESTAO_ACESSO",
                id: "navbarDropdownGestaoAvaliacao",
                menu: [
                    this.menuSchema.AVALIACAO_CONSOLIDACAO_PLANO_TRABALHO,
                    this.menuSchema.AVALIACAO_PLANOS_ENTREGAS
                ].sort(this.orderMenu)
            }, {
                name: this.lex.translate("Gerenciamento"),
                permition: "MENU_CONFIG_ACESSO",
                id: "navbarDropdownGestaoGerencial",
                menu: [
                    this.menuSchema.ENTIDADES,
                    this.menuSchema.UNIDADES,
                    this.menuSchema.USUARIOS,
                    this.menuSchema.PERFIS,
                    // this.menuSchema.CLIENTES,
                ].sort(this.orderMenu)
            }, {
                name: this.lex.translate("Cadastros"),
                permition: "MENU_CAD_ACESSO",
                id: "navbarDropdownGestaoCadastros",
                menu: [
                    this.menuSchema.EIXOS_TEMATICOS,
                    // this.menuSchema.ENTREGAS,
                    // this.menuSchema.TIPOS_AVALIACOES,
                    this.menuSchema.TIPOS_ATIVIDADES,
                    //this.menuSchema.TIPOS_CLIENTES,
                    this.menuSchema.TIPOS_JUSTIFICATIVAS,
                    // this.menuSchema.TIPOS_MODALIDADES,
                    // this.menuSchema.TIPOS_MOTIVOS_AFASTAMENTOS,
                    this.menuSchema.TIPOS_TAREFAS
                ].sort(this.orderMenu)
            }, {
                name: this.lex.translate("Relatórios"),
                permition: "MOD_RELATORIOS",
                id: "navbarDropdownRelatorios",
                menu: [
                    this.menuSchema.RELATORIO_PLANO_TRABALHO,
                    this.menuSchema.RELATORIO_PLANO_ENTREGA,
                    this.menuSchema.RELATORIO_USUARIOS,
                    this.menuSchema.RELATORIO_UNIDADES,
                    this.menuSchema.RELATORIO_CARGA_INDIVIDUAL_SIAPE
                ].sort(this.orderMenu)
            }, {
                name: this.lex.translate("Indicadores"),
                id: "navbarDropdownIndicadores",
                menu: [
                    this.menuSchema.INDICADORES_ENTREGAS,
                    this.menuSchema.INDICADORES_EQUIPES,
                    this.menuSchema.INDICADORES_GESTAO
                ].sort(this.orderMenu)
            }];
        this.moduloExecucao = [
            Object.assign({}, this.menuSchema.PLANOS_TRABALHOS, { metadata: { minha_unidade: true } }),
            this.menuSchema.ATIVIDADES,
            Object.assign({}, this.menuSchema.CONSOLIDACOES, { params: { tab: "UNIDADE" } }),
            //this.menuSchema.AFASTAMENTOS,
            this.menuSchema.OCORRENCIAS,
            {
                name: this.lex.translate("Relatórios"),
                permition: "MOD_RELATORIOS",
                id: "navbarDropdownRelatorios",
                menu: [
                    this.menuSchema.RELATORIO_USUARIOS
                ].sort(this.orderMenu)
            }, {
                name: this.lex.translate("Indicadores"),
                id: "navbarDropdownIndicadores",
                menu: [
                    this.menuSchema.INDICADORES_ENTREGAS,
                    this.menuSchema.INDICADORES_EQUIPES,
                    this.menuSchema.INDICADORES_GESTAO
                ].sort(this.orderMenu)
            }
        ];
        this.moduloAdministrador = [{
                name: this.lex.translate("Cadastros"),
                permition: "MENU_CAD_ACESSO",
                id: "navbarDropdownCadastrosAdm",
                menu: [
                    this.menuSchema.AFASTAMENTOS,
                    this.menuSchema.CIDADES,
                    this.menuSchema.CLIENTES,
                    this.menuSchema.EIXOS_TEMATICOS,
                    // this.menuSchema.ENTREGAS,
                    this.menuSchema.FERIADOS,
                    this.menuSchema.MATERIAIS_SERVICOS,
                    this.menuSchema.OCORRENCIAS,
                    this.menuSchema.TEMPLATES,
                    this.menuSchema.TIPOS_ATIVIDADES,
                    // this.menuSchema.TIPOS_AVALIACOES,
                    this.menuSchema.TIPOS_DOCUMENTOS,
                    this.menuSchema.TIPOS_JUSTIFICATIVAS,
                    // this.menuSchema.TIPOS_MODALIDADES,
                    // this.menuSchema.TIPOS_MOTIVOS_AFASTAMENTOS,
                    this.menuSchema.TIPOS_PROCESSOS,
                    this.menuSchema.TIPOS_TAREFAS
                ].sort(this.orderMenu)
            }, {
                name: this.lex.translate("Gerenciamento"),
                permition: "MENU_CONFIG_ACESSO",
                id: "navbarDropdownGerencialAdm",
                menu: [
                    this.menuSchema.ENTIDADES,
                    this.menuSchema.UNIDADES,
                    this.menuSchema.USUARIOS,
                    this.menuSchema.PERFIS
                ].sort(this.orderMenu)
            }, {
                name: this.lex.translate("Relatórios"),
                permition: "MOD_RELATORIOS",
                id: "navbarDropdownRelatorios",
                menu: [
                    this.menuSchema.RELATORIO_PLANO_TRABALHO,
                    this.menuSchema.RELATORIO_PLANO_ENTREGA,
                    this.menuSchema.RELATORIO_USUARIOS,
                    this.menuSchema.RELATORIO_UNIDADES,
                    this.menuSchema.RELATORIO_CARGA_INDIVIDUAL_SIAPE
                ].sort(this.orderMenu)
            }, {
                name: this.lex.translate("Indicadores"),
                id: "navbarDropdownIndicadores",
                menu: [
                    this.menuSchema.INDICADORES_ENTREGAS,
                    this.menuSchema.INDICADORES_EQUIPES,
                    this.menuSchema.INDICADORES_GESTAO
                ].sort(this.orderMenu)
            }];
        this.moduloDev = [{
                name: this.lex.translate("Manutenção"),
                permition: "MENU_DEV_ACESSO",
                id: "navbarDropdownDevManutencao",
                menu: [
                    this.menuSchema.ROTINAS_INTEGRACAO,
                    this.menuSchema.PAINEL
                ]
            }, {
                name: this.lex.translate("Logs e Auditorias"),
                permition: "MENU_DEV_ACESSO",
                id: "navbarDropdownDevLogs",
                menu: [
                    this.menuSchema.LOGS_ALTERACOES,
                    this.menuSchema.LOGS_ERROS,
                    this.menuSchema.LOGS_TRAFEGOS,
                    this.menuSchema.LOGS_SYSTEM
                ]
            }, {
                name: this.lex.translate("Testes"),
                permition: "MENU_DEV_ACESSO",
                id: "navbarDropdownDevTestes",
                menu: [
                    this.menuSchema.TESTE_IMPERSONATE,
                ]
            }, {
                name: this.lex.translate("Consultas"),
                permition: "MENU_DEV_ACESSO",
                id: "navbarDropdownDevConsultas",
                menu: [
                    this.menuSchema.DEV_CPF_CONSULTA_SIAPE,
                    this.menuSchema.DEV_UNIDADE_CONSULTA_SIAPE,
                    this.menuSchema.BLACKLIST_SERVIDOR,
                    this.menuSchema.BLACKLIST_UNIDADE
                ]
            }, {
                name: this.lex.translate("Relatórios"),
                permition: "MENU_DEV_ACESSO",
                id: "navbarDropdownDevRelatorios",
                menu: [
                    this.menuSchema.RELATORIO_CARGA_INDIVIDUAL_SIAPE
                ]
            }, {
                name: this.lex.translate("Envio API"),
                permition: "MENU_DEV_ACESSO",
                id: "navbarDropdownDevApiPgd",
                menu: [
                    this.menuSchema.ENVIO_LOGS,
                    this.menuSchema.ENVIO_FORCAR,
                    this.menuSchema.ENVIO_REINICIAR
                ]
            }];
        this.menuContexto = [
            { key: "GESTAO", permition: "CTXT_GEST", icon: "bi bi-clipboard-data", name: this.lex.translate("PGD"), menu: this.moduloGestao },
            { key: "EXECUCAO", permition: "CTXT_EXEC", icon: "bi bi-clipboard-data", name: this.lex.translate("PGD"), menu: this.moduloExecucao },
            { key: "ADMINISTRADOR", permition: "CTXT_ADM", icon: "bi bi-emoji-sunglasses", name: this.lex.translate("Administrador"), menu: this.moduloAdministrador },
            { key: "DEV", permition: "CTXT_DEV", icon: "bi bi-braces", name: this.lex.translate("Desenvolvedor"), menu: this.moduloDev },
        ];
    }
    orderMenu(a, b) {
        return a.nome < b.nome ? -1 : 1;
    }
    rootMenuClick(item) {
        if (!item.menu?.length)
            this.go.navigate({ route: item.route }, item.metadata || { root: true });
    }
    get modulo() {
        switch (this.gb.contexto?.key) {
            case "GESTAO": return this.moduloGestao;
            case "EXECUCAO": return this.moduloExecucao;
            case "ADMINISTRADOR": return this.moduloAdministrador;
            case "DEV": return this.moduloDev;
            default: return [];
        }
    }
    ngAfterViewInit() {
        /* Container para a criação de dialogs */
        this.dialog.container = this.dialogs;
        this.dialog.cdRef = this.cdRef;
        this.gb.refresh();
        let gestaoPGD = this.auth.hasPermissionTo("CTXT_GEST");
        let execucaoPGD = this.auth.hasPermissionTo("CTXT_EXEC");
        if (gestaoPGD) {
            this.menuContexto = this.menuContexto.filter(item => item.key !== "EXECUCAO");
        }
        else if (execucaoPGD && !gestaoPGD) {
            this.menuContexto = this.menuContexto.filter(item => item.key !== "GESTAO");
        }
    }
    toolbarLogin() {
        this.go.navigate({ route: ["login"] }, { modal: true });
    }
    menuItemClass(baseClass, item) {
        let routeUrl = this.go.getRouteUrl().replace(/^\//, "");
        return baseClass + (item.route?.join("/") == routeUrl || item.menu?.find((x) => x?.route?.join("/") == routeUrl) ? " fw-bold" : "");
    }
    isButtonRunning(btn) {
        return btn.running || !!btn.items?.find(x => x.running);
    }
    buttonId(button) {
        return "button_" + this.utils.md5((button.icon || "") + (button.hint || "") + (button.label || ""));
    }
    openModule(item) {
        if (item.route)
            this.go.navigate({ route: item.route, params: item.params }, item.metadata || { root: true });
    }
    get unidades() {
        return this.auth.unidades || [];
    }
    get unidadesVinculadas() {
        return this.auth.unidadesVinculadas || [];
    }
    get usuarioNome() {
        return this.utils.shortName(this.auth.usuario?.apelido.length ? this.auth.usuario?.apelido : this.auth.usuario?.nome || "");
    }
    get usuarioFoto() {
        return this.gb.getResourcePath(this.auth.usuario?.url_foto || "assets/images/profile.png");
    }
    onCollapseContainerClick() {
        this.auth.usuarioConfig = { ocultar_container_petrvs: !this.auth.usuario.config.ocultar_container_petrvs };
        this.cdRef.detectChanges();
    }
    get collapseContainer() {
        return this.gb.isEmbedded && this.auth.logged && !!this.auth.usuario?.config.ocultar_container_petrvs;
    }
    onRestoreClick(popup) {
        popup.restore();
    }
    async selecionaUnidade(id, matricula) {
        if (!matricula)
            return;
        await this.auth.selecionaUnidade(id, matricula, this.cdRef);
        window.location.reload();
    }
    async onToolbarButtonClick(btn) {
        try {
            btn.running = true;
            this.cdRef.detectChanges();
            if (btn.onClick)
                await btn.onClick(btn);
        }
        finally {
            btn.running = false;
            this.cdRef.detectChanges();
        }
    }
    get isMinimized() {
        return !!this.dialog.minimized?.length;
    }
    logout() {
        this.auth.logOut();
    }
    emDesenvolvimento() {
        this.dialog.alert('Atenção', 'Item em desenvolvimento');
    }
};
__decorate([
    ViewChild('dialogs', { read: ViewContainerRef })
], AppComponent.prototype, "dialogs", void 0);
AppComponent = AppComponent_1 = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss'],
        providers: [{
                provide: 'ID_GENERATOR_BASE',
                useFactory: (self, go, util) => {
                    return util.onlyAlphanumeric(go.getRouteUrl());
                },
                deps: [AppComponent, NavigateService, UtilService]
            }],
        standalone: false
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map