import { ChangeDetectorRef, Component, Inject, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarButton } from './components/toolbar/toolbar.component';
import { ListenerAllPagesService } from './listeners/listener-all-pages.service';
import { AuthService } from './services/auth.service';
import { DialogService } from './services/dialog.service';
import { DialogComponent } from './services/dialog/dialog.component';
import { GlobalsService } from './services/globals.service';
import { LexicalService } from './services/lexical.service';
import { NavigateService, RouteMetadata } from './services/navigate.service';
import { UtilService } from './services/util.service';
import { LookupService } from './services/lookup.service';
import { EntityService } from './services/entity.service';
import { NotificacaoService } from './modules/uteis/notificacoes/notificacao.service';
import { DOCUMENT } from '@angular/common';

export let appInjector: Injector;
export type Contexto = "EXECUCAO" | "AVALIACAO" | "GESTAO" | "ADMINISTRADOR" | "DEV" | "PONTO" | "PROJETO" | "RAIOX";
export type Schema = {
  name: string, 
  permition?: string, 
  route: string[],
  metadata?: RouteMetadata,
  icon: string
};
export type MenuSchema = {[key: string]: Schema};
export type MenuItem = {
  name: string,
  permition?: string,
  id: string,
  menu: Schema[]
} | Schema;
export type MenuContexto = {
  key: Contexto,
  icon: string,
  name: string,
  menu: MenuItem[]
};	

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{
    provide: 'ID_GENERATOR_BASE',
    useFactory: (self: AppComponent, go: NavigateService, util: UtilService) => {
      return util.onlyAlphanumeric(go.getRouteUrl());
    },
    deps: [AppComponent, NavigateService, UtilService]
  }]
})
export class AppComponent {
  @ViewChild('dialogs', { read: ViewContainerRef }) dialogs?: ViewContainerRef;

  public title: string = 'petrvs';
  public error: string = '';
  public unidadeHora: string = "";

  public globals: GlobalsService;
  public cdRef: ChangeDetectorRef;
  public auth: AuthService;
  public dialog: DialogService;
  public lex: LexicalService;
  public router: Router;
  public route: ActivatedRoute;
  public go: NavigateService;
  public allPages: ListenerAllPagesService;
  public utils: UtilService;
  public lookup: LookupService;
  public entity: EntityService;
  public notificacao: NotificacaoService;
  public menuSchema: MenuSchema = {};
  public menuToolbar: any[] = [];
  public menuContexto: MenuContexto[] = [];
  public contexto: MenuContexto;
  public menuProjeto: any;
  public menuGestao: any;
  public menuOperacional: any;
  public menuPonto: any;
  public menuRaioX: any;
  public menuExecucao: any;
  public menuAvaliacao: any;	
  public menuAdministrador: any;
  public menuDev: any;
  private _menu: any;
  private _menuDetectChanges: any;

  constructor(public injector: Injector) {
    /* Injector */
    this.globals = injector.get<GlobalsService>(GlobalsService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.auth = injector.get<AuthService>(AuthService);
    this.dialog = injector.get<DialogService>(DialogService);
    this.lex = injector.get<LexicalService>(LexicalService);
    this.router = injector.get<Router>(Router);
    this.route = injector.get<ActivatedRoute>(ActivatedRoute);
    this.go = injector.get<NavigateService>(NavigateService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.utils = injector.get<UtilService>(UtilService);
    this.lookup = injector.get<LookupService>(LookupService);
    this.entity = injector.get<EntityService>(EntityService);
    this.notificacao = injector.get<NotificacaoService>(NotificacaoService);
    /* Inicializações */
    this.notificacao.heartbeat();
    this.auth.app = this;
    this.lex.app = this;
    this.globals.app = this;
    if (this.globals.isEmbedded && this.globals.initialRoute?.length) {
      this.go.navigate({ route: this.globals.initialRoute });
    }
    setInterval(() => {
      let hora = this.auth.unidade ? this.auth.unidadeHora : "--:--";
      if (this.unidadeHora != hora) {
        this.unidadeHora = hora;
        this.cdRef.detectChanges();
      }
    }, 1000);
    this.lex.cdRef = this.cdRef;
    /* Definição do menu do sistema */
    this.setMenuVars();
    this.contexto = this.menuContexto[0];    
  }

  public setMenuVars() {
    this.menuSchema = {
      /* Cadastros */
      AFASTAMENTOS: { name: this.lex.translate("Afastamentos"), permition: 'MOD_AFT', route: ['cadastros', 'afastamento'], icon: this.entity.getIcon('Afastamento') },
      CIDADES:  { name: this.lex.translate("Cidades"), permition: 'MOD_CID', route: ['cadastros', 'cidade'], icon: this.entity.getIcon('Cidade') },
      EIXOS_TEMATICOS: { name: this.lex.translate("Eixos Temáticos"), permition: 'MOD_EXTM', route: ['cadastros', 'eixo-tematico'], icon: this.entity.getIcon('EixoTematico') },
      ENTREGAS: { name: this.lex.translate("Entregas"), permition: 'MOD_ENTRG', route: ['cadastros', 'entrega'], icon: this.entity.getIcon('Entrega') },
      FERIADOS: { name: this.lex.translate("Feriados"), permition: 'MOD_FER', route: ['cadastros', 'feriado'], icon: this.entity.getIcon('Feriado') },
      MATERIAIS_SERVICOS: { name: this.lex.translate("Materiais e Serviços"), permition: '', route: ['cadastros', 'material-servico'], icon: this.entity.getIcon('MaterialServico') },
      TAREFAS: { name: this.lex.translate("Tarefas"), permition: 'MOD_DMD', route: ['cadastros', 'tarefa'], icon: this.entity.getIcon('Tarefa') },
      TEMPLATES: { name: this.lex.translate("Templates"), permition: 'MOD_TEMP', route: ['cadastros', 'template'], icon: this.entity.getIcon('Template') },
      TIPOS_ATIVIDADES: { name: this.lex.translate("Tipos de Atividade"), permition: 'MOD_TIPO_ATV', route: ['cadastros', 'tipo-atividade'], icon: this.entity.getIcon('TipoAtividade') },
      TIPOS_AVALIACOES: { name: this.lex.translate("Tipos de Avaliação"), permition: 'MOD_TIPO_AVAL', route: ['cadastros', 'tipo-avaliacao'], icon: this.entity.getIcon('TipoAvaliacao') },
      TIPOS_DOCUMENTOS: { name: this.lex.translate("Tipos de Documento"), permition: 'MOD_TIPO_DOC', route: ['cadastros', 'tipo-documento'], icon: this.entity.getIcon('TipoDocumento') },
      TIPOS_JUSTIFICATIVAS: { name: this.lex.translate("Tipos de Justificativa"), permition: 'MOD_TIPO_JUST', route: ['cadastros', 'tipo-justificativa'], icon: this.entity.getIcon('TipoJustificativa') },
      TIPOS_MODALIDADES: { name: this.lex.translate("Tipos de Modalidade"), permition: 'MOD_TIPO_MDL', route: ['cadastros', 'tipo-modalidade'], icon: this.entity.getIcon('TipoModalidade') },
      TIPOS_MOTIVOS_AFASTAMENTOS: { name: this.lex.translate("Tipos de Motivo de Afastamento"), permition: 'MOD_TIPO_MTV_AFT', route: ['cadastros', 'tipo-motivo-afastamento'], icon: this.entity.getIcon('TipoMotivoAfastamento') },
      TIPOS_PROCESSOS: { name: this.lex.translate("Tipos de Processo"), permition: 'MOD_TIPO_PROC', route: ['cadastros', 'tipo-processo'], icon: this.entity.getIcon('TipoProcesso') },
      /*Gestão*/
      CADEIAS_VALORES: { name: this.lex.translate("Cadeias de valor"), permition: 'MOD_CADV', route: ['gestao', 'cadeia-valor'], icon: this.entity.getIcon('CadeiaValor') },
      ATIVIDADES: { name: this.lex.translate("Atividades"), permition: 'MOD_ATV', route: ['gestao', 'atividade'], icon: this.entity.getIcon('Atividade') },
      PLANEJAMENTOS_INSTITUCIONAIS: { name: this.lex.translate("Planejamentos Institucional"), permition: 'MOD_PLAN_INST', route: ['gestao', 'planejamento'], icon: this.entity.getIcon('Planejamento') },
      PLANOS_ENTREGAS: { name: this.lex.translate("Planos de Entrega"), permition: 'MOD_PENT', route: ['gestao', 'plano-entrega'], icon: this.entity.getIcon('PlanoEntrega') },
      PLANOS_TRABALHOS: { name: this.lex.translate("Planos de Trabalho"), permition: 'MOD_PTR', route: ['gestao', 'plano-trabalho'], icon: this.entity.getIcon('PlanoTrabalho') },
      CONSOLIDACOES: { name: this.lex.translate("Consolidações"), permition: 'MOD_PTR_CSLD', route: ['gestao', 'plano-trabalho', 'consolidacao'], icon: this.entity.getIcon('PlanoTrabalhoConsolidacao') },
      PROGRAMAS_GESTAO: { name: this.lex.translate("Programas de Gestão"), permition: 'MOD_PRGT', route: ['gestao', 'programa'], icon: this.entity.getIcon('Programa') },
      PORTIFOLIOS: { name: this.lex.translate("Portifólios"), permition: 'MOD_PROJ', route: ['gestao', 'projeto'], icon: this.entity.getIcon('Projeto') },
      PROJETOS: { name: this.lex.translate("Projetos"), permition: 'MOD_PROJ', route: ['gestao', 'projeto'], icon: this.entity.getIcon('Projeto') },
      /* Relatórios */
      FORCAS_TRABALHOS_SERVIDORES: { name: "Força de Trabalho - Servidor", permition: 'MOD_PTR_CONS', route: ['relatorios', 'forca-de-trabalho', 'servidor'], icon: this.entity.getIcon('RelatorioServidor') },
      FORCAS_TRABALHOS_AREAS: { name: "Força de Trabalho - Área", permition: 'MOD_PTR_CONS', route: ['relatorios', 'forca-de-trabalho', 'area'], icon: this.entity.getIcon('RelatorioArea') },
      /* Avaliações */	
      AVALIACAO_CONSOLIDACAO_PLANO_TRABALHO: { name: "Consolidações (Plano de Trabalho)", permition: '', route: [], icon: this.entity.getIcon('PlanoTrabalho') },	
      AVALIACAO_PLANO_ENTREGAS: { name: "Plano de Entregas", permition: '', route: [], icon: this.entity.getIcon('PlanoEntrega') },
      /* CONFIGURAÇÕES */
      PREFERENCIAS: { name: "Preferências", permition: '', route: ['configuracoes', 'preferencia'], metadata: { root: true, modal: true }, icon: this.entity.getIcon('Preferencia') },
      ENTIDADES: { name: this.lex.translate("Entidades"), permition: 'MOD_CFG_ENTD', route: ['configuracoes', 'entidade'], icon: this.entity.getIcon('Entidade') },
      UNIDADES: { name: this.lex.translate("Unidades"), permition: 'MOD_CFG_UND', route: ['configuracoes', 'unidade'], icon: this.entity.getIcon('Unidade') },
      USUARIOS: { name: this.lex.translate("Usuários"), permition: 'MOD_CFG_USER', route: ['configuracoes', 'usuario'], icon: this.entity.getIcon('Usuario') },
      PERFIS: { name: "Perfis", permition: 'MOD_CFG_PERFS', route: ['configuracoes', 'perfil'], icon: this.entity.getIcon('Perfil') },
      SOBRE: { name: "Sobre", permition: '', route: ['configuracoes', 'sobre'], icon: "" },
      /* LOGS */
      ROTINAS_INTEGRACAO: { name: "Rotina de Integração", permition: '', route: ['rotinas', 'integracao'], icon: this.entity.getIcon('Integracao') },
      LOGS_ALTERACOES: { name: "Log das Alterações", permition: '', route: ['logs', 'change'], icon: this.entity.getIcon('Change') },
      LOGS_ERROS: { name: "Log dos Erros", permition: '', route: ['logs', 'error'], icon: this.entity.getIcon('Error') },
      LOGS_TRAFEGOS: { name: "Log do Tráfego", permition: '', route: ['logs', 'traffic'], icon: this.entity.getIcon('Traffic') },
      LOGS_TESTES_EXPEDIENTES: { name: "Teste Expediente", permition: '', route: ['teste'], icon: this.entity.getIcon('Teste') },
      TESTE_CALCULA_DATATEMPO: { name: "Teste calculaDataTempo", permition: '', route: ['teste', 'calcula-tempo'], icon: this.entity.getIcon('Teste') },
      /* RAIO X */
      RXHOME: { name: "Home RX", permition: 'RX', route: ['raiox', 'home'], icon: "bi bi-toggle-off" },
      RXCADASTRO_PESSOAL: { name: this.lex.translate("Dados Pessoais"), permition: 'MOD_RX_VIS_DPE', route: ['raiox', 'pessoal'], icon: "bi bi-file-person" },
      RXCADASTRO_PROFISSIONAL: { name: this.lex.translate("Dados Profissionais"), permition: 'MOD_RX_VIS_DPR', route: ['raiox', 'profissional'], icon: "fa fa-briefcase"},
      RXCADASTRO_ATRIBUTOS: { name: this.lex.translate("Atributos Comportamentais"), permition: 'MOD_RX_VIS_ATR', route: ['raiox', 'big5'], icon: "fa fa-brain" },
      RXVISUALIZA_OPORTUNIDADES: { name: this.lex.translate("Pesquisa Oportunidades"), permition: 'MOD_RX_VIS_OPO', route: ['raiox', 'pessoal'], icon: "bi bi-lightbulb-fill" },
      RXCADASTRO_OPORTUNIDADES: { name: this.lex.translate("Oportunidades"), permition: 'MOD_RX_EDT_OPO', route: ['raiox', 'pessoal'], icon: "bi bi-lightbulb-fill" },
      RXCADASTRO_ADM_AREA_CONHECIMENTO: { name: this.lex.translate("Áreas de Conhecimento"), permition: 'MOD_RX_VIS_DPE', route: ['raiox', 'cadastros','gerais','areaconhecimento'], icon: "bi bi-mortarboard" },
      RXCADASTRO_ADM_CURSOS: { name: this.lex.translate("Cursos"), permition: 'MOD_RX_VIS_DPR', route: ['raiox', 'cadastros','gerais','curso'], icon: "bi bi-mortarboard-fill" },
      RXCADASTRO_ADM_TIPOS_CURSOS: { name: this.lex.translate("Tipos de Cursos"), permition: 'MOD_RX_VIS_DPR', route: ['raiox', 'cadastros','gerais','tipocurso'], icon: "bi bi-box-seam" },
      RXCADASTRO_ADM_ATRIBUTOS: { name: this.lex.translate("Atributos Comportamentais"), permition: 'MOD_RX_VIS_ATR', route: ['raiox', 'atribadm'], icon: "fa fa-brain" },
      RXCADASTRO_ADM_CT: { name: this.lex.translate("Centros de Treinamentos"), permition: 'MOD_RX_VIS_ATR', route: ['raiox', 'cadastros','gerais','centrotreinamento'], icon: "bi bi-building-fill" },
      RXCADASTRO_ADM_FUNCAO: { name: this.lex.translate("Funções"), permition: 'MOD_RX_VIS_ATR', route: ['raiox', 'cadastros','gerais','funcao'], icon: "bi bi-check-circle-fill" },
      RXCADASTRO_ADM_CARGO: { name: this.lex.translate("Cargos"), permition: 'MOD_RX_VIS_ATR', route: ['raiox', 'cadastros','gerais','cargo'], icon: "bi bi-person-badge" },
      RXCADASTRO_ADM_GRUPOS_ESPECIALIZADOS: { name: this.lex.translate("de Grupos Especializados"), permition: 'MOD_RX_VIS_ATR', route: ['raiox', 'cadastros','gerais','ge'], icon: "bi bi-check-circle" },
      RXCADASTRO_ADM_OPORTUNIDADES: { name: this.lex.translate("Oportunidades"), permition: 'MOD_RX_EDT_OPO', route: ['raiox', 'apoadm'], icon: "bi bi-lightbulb" },
      RXCADASTRO_ADM_MATERIAS: { name: this.lex.translate("Matérias"), permition: 'MOD_RX_EDT_OPO', route: ['raiox', 'cadastros','gerais','materia'], icon: "bi bi-list-check" },
      RXVISUALIZA_ADM_OPORTUNIDADES: { name: this.lex.translate("Pesquisa Oportunidades"), permition: 'MOD_RX_VIS_OPO', route: ['raiox', 'pesqadm'], icon: "bi bi-emoji-smile-fill" },
      RXCADASTRO_ADM_ATIVIDADESEXT: { name: this.lex.translate("Atividades Externas"), permition: 'MOD_RX_VIS_DPE', route: ['raiox', 'cadastros','gerais','areaatividadeexterna'], icon: "bi bi-arrows-fullscreen" },
      RXCADASTRO_ADM_AREASTEMATICAS: { name: this.lex.translate("Áreas Temáticas"), permition: 'MOD_RX_VIS_DPE', route: ['raiox', 'cadastros','gerais','areatematica'], icon: "bi bi-box-arrow-in-down" },
      RXCADASTRO_ADM_CAPACIDADES_TECNICAS: { name: this.lex.translate("Capacidades Técnicas"), permition: 'MOD_RX_VIS_DPE', route: ['raiox', 'cadastros','gerais','capacidadetecnica'], icon: "bi bi-arrows-angle-contract" },
      RXCADASTRO_ADM_QUESTIONARIOS_PERGUNTAS: { name: this.lex.translate("Perguntas"), permition: 'MOD_RX_VIS_DPE', route: ['raiox', 'cadastros','gerais','questionariopergunta'], icon: "bi bi-patch-question" },
      RXCADASTRO_ADM_QUESTIONARIOS_RESPOSTAS: { name: this.lex.translate("Respostas"), permition: 'MOD_RX_VIS_DPE', route: ['raiox', 'cadastros','gerais','questionarioresposta'], icon: "bi bi-list-task" },
      RXVISUALIZA_ADM_PESQUISA1: { name:"Usuario", permition: 'MOD_RX_VIS_OPO', route: ['raiox', 'pesqadm'], icon: "bi bi-search" },
      RXVISUALIZA_ADM_PESQUISA2: { name:"Administrador", permition: 'MOD_RX_VIS_OPO', route: ['raiox', 'pesqadm'], icon: "bi bi-binoculars" },
      /*PROJETOS*/
      PAINEL: { name: "Painel", permition: '', route: ['configuracoes', 'sobre'], icon: "" },
      AUDITORIA: { name: "Auditoria", permition: '', route: ['configuracoes', 'sobre'], icon: "" }
    };

    this.menuGestao = [{
      name: "Planejamento",
      permition: "MENU_GESTAO_ACESSO",
      id: "navbarDropdownGestaoPlanejamento",
      menu: [
        this.menuSchema.CADEIAS_VALORES,
        this.menuSchema.PLANEJAMENTOS_INSTITUCIONAIS,
        this.menuSchema.PLANOS_ENTREGAS,
        this.menuSchema.PLANOS_TRABALHOS,
        this.menuSchema.PROGRAMAS_GESTAO
      ].sort(this.orderMenu)
    }, {
      name: "Execução",
      permition: "MENU_GESTAO_ACESSO",
      id: "navbarDropdownGestaoExecucao",
      menu: [
        this.menuSchema.ATIVIDADES,
        this.menuSchema.AFASTAMENTOS,
        this.menuSchema.PLANOS_ENTREGAS,//Carlos
        Object.assign({}, this.menuSchema.CONSOLIDACOES, {params: {tab: "USUARIO"}})
      ].sort(this.orderMenu)
    }, {
      name: "Avaliação",	
      permition: "MENU_GESTAO_ACESSO",	
      id: "navbarDropdownGestaoAvaliacao",	
      menu: [	
        this.menuSchema.AVALIACAO_CONSOLIDACAO_PLANO_TRABALHO,	
        this.menuSchema.AVALIACAO_PLANO_ENTREGAS      	
      ].sort(this.orderMenu)	
    }, {
      name: "Gerenciamento",
      permition: "MENU_CONFIG_ACESSO",
      id: "navbarDropdownGestaoGerencial",
      menu: [
        this.menuSchema.ENTIDADES,
        this.menuSchema.UNIDADES,
        this.menuSchema.USUARIOS,
        this.menuSchema.PERFIS
      ].sort(this.orderMenu)
    }, {
      name: "Cadastros",
      permition: "MENU_CAD_ACESSO",
      id: "navbarDropdownGestaoCadastros",
      menu: [
        this.menuSchema.EIXOS_TEMATICOS,
        this.menuSchema.ENTREGAS,
        this.menuSchema.TIPOS_AVALIACOES,
        this.menuSchema.TIPOS_ATIVIDADES,
        this.menuSchema.TIPOS_JUSTIFICATIVAS,
        this.menuSchema.TIPOS_MODALIDADES,
        this.menuSchema.TIPOS_MOTIVOS_AFASTAMENTOS,
        this.menuSchema.TIPOS_TAREFAS
      ].sort(this.orderMenu)
    }];

    this.menuExecucao = [
      this.menuSchema.PLANOS_TRABALHOS,
      this.menuSchema.ATIVIDADES,
      Object.assign({}, this.menuSchema.CONSOLIDACOES, {params: {tab: "UNIDADE"}}),
      this.menuSchema.AFASTAMENTOS
    ];

    this.menuAvaliacao = [	
      this.menuSchema.AVALIACAO_CONSOLIDACAO_PLANO_TRABALHO	
    ];

    this.menuAdministrador = [{
      name: "Cadastros",
      permition: "MENU_CAD_ACESSO",
      id: "navbarDropdownCadastrosAdm",
      menu: [
        this.menuSchema.AFASTAMENTOS,
        this.menuSchema.CIDADES,
        this.menuSchema.EIXOS_TEMATICOS,
        this.menuSchema.ENTREGAS,
        this.menuSchema.FERIADOS,
        this.menuSchema.MATERIAIS_SERVICOS,
        this.menuSchema.TAREFAS,
        this.menuSchema.TEMPLATES,
        this.menuSchema.TIPOS_ATIVIDADES,
        this.menuSchema.TIPOS_AVALIACOES,
        this.menuSchema.TIPOS_DOCUMENTOS,
        this.menuSchema.TIPOS_JUSTIFICATIVAS,
        this.menuSchema.TIPOS_MODALIDADES,
        this.menuSchema.TIPOS_MOTIVOS_AFASTAMENTOS,
        this.menuSchema.TIPOS_PROCESSOS
      ].sort(this.orderMenu)
    },{
      name: "Gerenciamento",
      permition: "MENU_CONFIG_ACESSO",
      id: "navbarDropdownGerencialAdm",
      menu: [
        this.menuSchema.ENTIDADES,
        this.menuSchema.UNIDADES,
        this.menuSchema.USUARIOS,
        this.menuSchema.PERFIS
      ].sort(this.orderMenu)
    }];

    this.menuDev = [{
      name: "Manutenção",
      permition: "DEV_MENU_LOGS_ACESSO",
      id: "navbarDropdownDevManutencao",
      menu: [
        this.menuSchema.ROTINAS_INTEGRACAO,
        this.menuSchema.PAINEL
      ]
    }, {
      name: "Logs e Auditoria",
      permition: "DEV_MENU_LOGS_ACESSO",
      id: "navbarDropdownDevLogs",
      menu: [
        this.menuSchema.LOGS_ALTERACOES,
        this.menuSchema.LOGS_ERROS,
        this.menuSchema.LOGS_TRAFEGOS
      ]
    }, {
      name: "Testes",
      permition: "DEV_MENU_LOGS_ACESSO",
      id: "navbarDropdownDevTestes",
      menu: [
        this.menuSchema.LOGS_TESTES_EXPEDIENTES,
        this.menuSchema.TESTE_CALCULA_DATATEMPO
      ]
    }];

    this.menuPonto = [];

    this.menuProjeto = [{
      name: "Cadastros",
      permition: "MENU_CAD_ACESSO",
      id: "navbarDropdownProjetoCadastros",
      menu: [
        this.menuSchema.MATERIAIS_SERVICOS
      ]
    }, {
      name: "Gerencial",
      permition: "MENU_CAD_ACESSO",
      id: "navbarDropdownProjetoGerencial",
      menu: [
        this.menuSchema.UNIDADES,
        this.menuSchema.USUARIOS
      ]
    }, 
    this.menuSchema.PORTIFOLIO,
    this.menuSchema.PROJETOS];

    this.menuRaioX = [{
      name: "Cadastros",
      permition: "MOD_RX_VIS_DPE",
      id: "navbarDropdownRXCadastros",
      menu: [
        this.menuSchema.RXCADASTRO_PESSOAL,
        this.menuSchema.RXCADASTRO_PROFISSIONAL,
        this.menuSchema.RXCADASTRO_ATRIBUTOS
        //this.menuSchema.RXCADASTRO_OPORTUNIDADES
      ]
    }, {
      name: "Oportunidades",
      permition: "MOD_RX_VIS_DPE",
      id: "navbarDropdownRXOportunidades",
      menu: [
        this.menuSchema.RXCADASTRO_ADM_OPORTUNIDADES
      ]
    }, {
      name: "Pesquisas",
      permition: "MOD_RX_VIS_DPE",
      id: "navbarDropdownRXPesquisas",
      menu: [
        this.menuSchema.RXVISUALIZA_ADM_PESQUISA1,
        this.menuSchema.RXVISUALIZA_ADM_PESQUISA2
      ]
    }, {
      name: "Questionários Dinâmicos",
      permition: "MOD_RX_VIS_DPE",
      id: "navbarDropdownRXQD",
      menu: [
        this.menuSchema.RXCADASTRO_ADM_QUESTIONARIOS_PERGUNTAS,
        this.menuSchema.RXCADASTRO_ADM_QUESTIONARIOS_RESPOSTAS
      ]
    }, {
      name: "Cadastros Gerais",
      permition: "MOD_RX_VIS_DPE",
      id: "navbarDropdownRXCadastrosGerais",
      menu: [
        this.menuSchema.RXCADASTRO_ADM_AREA_CONHECIMENTO,
        this.menuSchema.RXCADASTRO_ADM_TIPOS_CURSOS,
        this.menuSchema.RXCADASTRO_ADM_CURSOS,
        this.menuSchema.RXCADASTRO_ADM_MATERIAS,
        "-",
        this.menuSchema.RXCADASTRO_ADM_CT,
        this.menuSchema.RXCADASTRO_ADM_CARGO,
        this.menuSchema.RXCADASTRO_ADM_FUNCAO,
        "-",
        this.menuSchema.RXCADASTRO_ADM_ATIVIDADESEXT,
        this.menuSchema.RXCADASTRO_ADM_AREASTEMATICAS,
        this.menuSchema.RXCADASTRO_ADM_CAPACIDADES_TECNICAS,
        "-",
        this.menuSchema.RXCADASTRO_ADM_OPORTUNIDADES
      ]
    }];


  this.menuContexto = [
      { key: "EXECUCAO", icon: "bi bi-person-check", name: "Participante (PGD)", menu: this.menuExecucao },	
      { key: "AVALIACAO", icon: "bi bi-question-square", name: "Avaliador (PGD)", menu: this.menuAvaliacao },	
      { key: "GESTAO", icon: "bi bi-people-fill", name: "Gestor (PGD)", menu: this.menuGestao },
      { key: "ADMINISTRADOR", icon: "bi bi-emoji-sunglasses", name: "Administrador", menu: this.menuAdministrador },
      { key: "DEV", icon: "bi bi-braces", name: "Desenvolvedor", menu: this.menuDev },
      { key: "PONTO", icon: "bi bi-stopwatch", name: "Ponto eletrônico", menu: this.menuPonto },
      { key: "PROJETO", icon: "bi bi-graph-up-arrow", name: "Projetos", menu: this.menuProjeto },
      { key: "RAIOX", icon: "bi bi-camera", name: "Raio X", menu: this.menuRaioX }
    ];
   // this.contexto.key = "PGD"
  }

  public onContextoSelect(item: any) {
    this.contexto = item;
    this.auth.usuarioConfig = {menu_contexto: item.key};
    this.goHome();
  }

  public goHome() {
    this.go.navigate({ route: ["home/"+this.contexto.key.toLowerCase( )] });
  }

  public orderMenu(a: any, b: any) {
    return a.nome < b.nome ? -1 : 1;
  }

  public rootMenuClick(item: any) {
    if(!item.menu?.length) this.go.navigate({route: item.route}, item.metadata || {root: true});
  }

  public get menu(): any {
    switch (this.contexto.key) {
      case "GESTAO": return this.menuGestao;
      case "EXECUCAO": return this.menuExecucao;
      case "AVALIACAO": return this.menuAvaliacao;
      case "ADMINISTRADOR": return this.menuAdministrador;
      case "DEV": return this.menuDev;
      case "PONTO": return this.menuPonto;
      case "PROJETO": return this.menuProjeto;
      case "RAIOX": return this.menuRaioX;
      default: return [];
    }
  }

  public ngAfterViewInit() {
    /* Container para a criação de dialogs */
    this.dialog.container = this.dialogs;
    this.dialog.cdRef = this.cdRef;
    this.globals.refresh();    
  }

  public toolbarLogin() {
    this.go.navigate({ route: ["login"] }, { modal: true });
  }

  public menuItemClass(baseClass: string, item: any) {
    let routeUrl = this.go.getRouteUrl().replace(/^\//, "");
    if(item.menu?.find((x: any) => !x)) console.log(item);
    return baseClass + (item.route?.join("/") == routeUrl || item.menu?.find((x: any) => x?.route?.join("/") == routeUrl) ? " fw-bold" : "");
  }

  public isButtonRunning(btn: ToolbarButton): boolean {
    return btn.running || !!btn.items?.find(x => x.running);
  }

  public buttonId(button: ToolbarButton) {
    return "button_" + this.utils.md5((button.icon || "") + (button.hint || "") + (button.label || ""));
  }

  public openModule(item: any) {
    if(item.route) this.go.navigate({route: item.route, params: item.params}, item.metadata || {root: true});
  }

  public get unidades(): any[] {
    return this.auth.unidades || [];
  }

  public get usuarioNome(): string {
    return this.utils.shortName(this.auth.usuario?.apelido.length ? this.auth.usuario?.apelido : this.auth.usuario?.nome || "");
  }

  public get usuarioFoto(): string {
    return this.auth.usuario?.url_foto || "assets/images/profile.png";
  }

  public onCollapseContainerClick() {
    this.auth.usuarioConfig = { ocultar_container_petrvs: !this.auth.usuario!.config.ocultar_container_petrvs };
    this.cdRef.detectChanges();
  }

  public get collapseContainer(): boolean {
    return this.globals.isEmbedded && this.auth.logged && !!this.auth.usuario?.config.ocultar_container_petrvs;
  }

  public onRestoreClick(popup: DialogComponent) {
    popup.restore();
  }

  public selecionaUnidade(id: string) {
    this.auth.selecionaUnidade(id, this.cdRef);
  }

  public async onToolbarButtonClick(btn: ToolbarButton) {
    try {
      btn.running = true;
      this.cdRef.detectChanges();
      if (btn.onClick) await btn.onClick(btn);
    } finally {
      btn.running = false;
      this.cdRef.detectChanges();
    }
  }

  public get isMinimized(): boolean {
    return !!this.dialog.minimized?.length;
  }

  public logout() {
    this.auth.logOut();
  }

  public get isConfig(): boolean {
    return this.router.url.indexOf("/extension/options") >= 0;
  }

}

