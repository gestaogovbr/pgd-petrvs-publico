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
import { SafeUrl } from '@angular/platform-browser';
import { UnidadeService } from './services/unidade.service';

export type Contexto = "EXECUCAO" | "GESTAO" | "ADMINISTRADOR" | "DEV" | "PONTO" | "PROJETO" | "RAIOX";
export type Schema = {
  name: string,
  permition?: string,
  route?: string[],
  metadata?: RouteMetadata,
  params?: any,
  icon: string;
  onClick?: () => void;
};
export type MenuSchema = { [key: string]: Schema };
export type MenuItem = {
  name: string,
  permition?: string,
  id: string,
  menu: Schema[]
} | Schema;

export type PetrvsModule = {
  name: string,
  icon: string
}
export type MenuContexto = {
  key: Contexto,
  permition?: string,
  icon: string,
  name: string,
  menu?: MenuItem[],
  petrvsModule?: string
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

  public static instance: AppComponent;

  public title: string = 'petrvs';
  public error: string = '';
  public unidadeHora: string = "";

  public gb: GlobalsService;
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
  public moduloProjeto: any;
  public moduloGestao: any;
  public menuOperacional: any;
  public moduloPonto: any;
  public moduloRaioX: any;
  public moduloExecucao: any;
  public moduloAdministrador: any;
  public moduloDev: any;
  public unidadeService: UnidadeService;
  private _menu: any;
  private _menuDetectChanges: any;

  constructor(public injector: Injector) {
    /* Instancia singleton da aplicação */
    AppComponent.instance = this;
    /* Injector */
    this.gb = injector.get<GlobalsService>(GlobalsService);
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
    this.unidadeService = injector.get<UnidadeService>(UnidadeService);
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
  }

  public setMenuVars() {
    this.menuSchema = {
      /* Cadastros */
      CIDADES: { name: this.lex.translate("Cidades"), permition: 'MOD_CID', route: ['cadastros', 'cidade'], icon: this.entity.getIcon('Cidade') },
      CLIENTES: { name: this.lex.translate("Clientes"), permition: 'MOD_CLI', route: ['cadastros', 'cliente'], icon: this.entity.getIcon('Cliente') }, // TODO : retornar esse menu ao subir produtos
      EIXOS_TEMATICOS: { name: this.lex.translate("Eixos Temáticos"), permition: 'MOD_EXTM', route: ['cadastros', 'eixo-tematico'], icon: this.entity.getIcon('EixoTematico') },
      // ENTREGAS: { name: this.lex.translate("Modelos de Entregas"), permition: 'MOD_ENTRG', route: ['cadastros', 'entrega'], icon: this.entity.getIcon('Entrega') },
      FERIADOS: { name: this.lex.translate("Feriados"), permition: 'MOD_FER', route: ['cadastros', 'feriado'], icon: this.entity.getIcon('Feriado') },
      MATERIAIS_SERVICOS: { name: this.lex.translate("Materiais e Serviços"), permition: '', route: ['cadastros', 'material-servico'], icon: this.entity.getIcon('MaterialServico') },
      TEMPLATES: { name: this.lex.translate("Templates"), permition: 'MOD_TEMP', route: ['cadastros', 'templates'], icon: this.entity.getIcon('Template'), params: { modo: "listagem" } },
      TIPOS_TAREFAS: { name: this.lex.translate("Tipos de Tarefas"), permition: 'MOD_TIPO_TRF', route: ['cadastros', 'tipo-tarefa'], icon: this.entity.getIcon('TipoTarefa') },
      TIPOS_ATIVIDADES: { name: this.lex.translate("Tipos de Atividades"), permition: 'MOD_TIPO_ATV', route: ['cadastros', 'tipo-atividade'], icon: this.entity.getIcon('TipoAtividade') },
      TIPOS_CLIENTES: { name: this.lex.translate("Tipos de Clientes"), permition: 'MOD_TIPO_CLI', route: ['cadastros', 'tipo-cliente'], icon: this.entity.getIcon('TipoCliente') },
      // TIPOS_AVALIACOES: { name: this.lex.translate("Tipos de Avaliação"), permition: 'MOD_TIPO_AVAL', route: ['cadastros', 'tipo-avaliacao'], icon: this.entity.getIcon('TipoAvaliacao') },
      TIPOS_DOCUMENTOS: { name: this.lex.translate("Tipos de Documento"), permition: 'MOD_TIPO_DOC', route: ['cadastros', 'tipo-documento'], icon: this.entity.getIcon('TipoDocumento') },
      TIPOS_JUSTIFICATIVAS: { name: this.lex.translate("Tipos de Justificativa"), permition: 'MOD_TIPO_JUST', route: ['cadastros', 'tipo-justificativa'], icon: this.entity.getIcon('TipoJustificativa') },
      // TIPOS_MODALIDADES: { name: this.lex.translate("Tipos de Modalidade"), permition: 'MOD_TIPO_MDL', route: ['cadastros', 'tipo-modalidade'], icon: this.entity.getIcon('TipoModalidade') },
      // TIPOS_MOTIVOS_AFASTAMENTOS: { name: this.lex.translate("Tipos de Motivo de Afastamento"), permition: 'MOD_TIPO_MTV_AFT', route: ['cadastros', 'tipo-motivo-afastamento'], icon: this.entity.getIcon('TipoMotivoAfastamento') },
      TIPOS_PROCESSOS: { name: this.lex.translate("Tipos de Processo"), permition: 'MOD_TIPO_PROC', route: ['cadastros', 'tipo-processo'], icon: this.entity.getIcon('TipoProcesso') },
      /* Gestão */
      AFASTAMENTOS: { name: this.lex.translate("Afastamentos"), permition: 'MOD_AFT', route: ['gestao', 'afastamento'], icon: this.entity.getIcon('Afastamento') },
      OCORRENCIAS: { name: this.lex.translate("Ocorrencias"), permition: 'MOD_OCOR', route: ['gestao', 'ocorrencia'], icon: this.entity.getIcon('Ocorrencia') },
      CADEIAS_VALORES: { name: this.lex.translate("Cadeias de Valores"), permition: 'MOD_CADV', route: ['gestao', 'cadeia-valor'], icon: this.entity.getIcon('CadeiaValor') },
      ATIVIDADES: { name: this.lex.translate("Atividades"), permition: 'MOD_ATV', route: ['gestao', 'atividade'], icon: this.entity.getIcon('Atividade') },
      PLANEJAMENTOS_INSTITUCIONAIS: { name: this.lex.translate("Planejamentos Institucionais"), permition: 'MOD_PLAN_INST', route: ['gestao', 'planejamento'], icon: this.entity.getIcon('Planejamento') },
      PLANOS_ENTREGAS: { name: this.lex.translate("Planos de Entregas"), permition: 'MOD_PENT', route: ['gestao', 'plano-entrega'], icon: this.entity.getIcon('PlanoEntrega') },
      PLANOS_TRABALHOS: { name: this.lex.translate("Planos de Trabalho"), permition: 'MOD_PTR', route: ['gestao', 'plano-trabalho'], icon: this.entity.getIcon('PlanoTrabalho') },
      CONSOLIDACOES: { name: this.lex.translate("Consolidações"), permition: 'MOD_PTR_CSLD', route: ['gestao', 'plano-trabalho', 'consolidacao'], icon: this.entity.getIcon('PlanoTrabalhoConsolidacao') },
      PROGRAMAS_GESTAO: { name: this.lex.translate("Programas de Gestão"), permition: 'MOD_PRGT', route: ['gestao', 'programa'], icon: this.entity.getIcon('Programa') },
      HABILITACOES_PROGRAMA: { name: this.lex.translate("Habilitações"), permition: 'MOD_PART', route: ['gestao', 'programa', 'participantes'], icon: this.entity.getIcon('Programa') },
      PORTIFOLIOS: { name: this.lex.translate("Portifólios"), permition: 'MOD_PROJ', route: ['gestao', 'projeto'], icon: this.entity.getIcon('Projeto') },
      PROJETOS: { name: this.lex.translate("Projetos"), permition: 'MOD_PROJ', route: ['gestao', 'projeto'], icon: this.entity.getIcon('Projeto') },
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
      TESTE_IMPERSONATE: { name: "Teste IMPERSONATE", permition: '', route: ['impersonate'], icon: this.entity.getIcon('Teste') },
      LOGS_ENVIOS: { name: "Log dos Envios à API PGD", permition: '', route: ['logs', 'envios'], icon: this.entity.getIcon('Envio') },
      DEV_CPF_CONSULTA_SIAPE: { name: "Consulta CPF SIAPE", permition: '', route: ['consultas', 'cpf-siape'], icon: this.entity.getIcon('ConsultaCPFSIAPE') },
      DEV_UNIDADE_CONSULTA_SIAPE: { name: "Consulta Unidade SIAPE", permition: '', route: ['consultas', 'unidade-siape'], icon: this.entity.getIcon('ConsultaUnidadeSIAPE') },
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
        this.menuSchema.RELATORIO_UNIDADES
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
        this.menuSchema.RELATORIO_UNIDADES
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
        this.menuSchema.LOGS_ENVIOS
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
      permition: "MENU_DEV_CONSULTAS",
      id: "navbarDropdownDevConsultas",
      menu: [
        this.menuSchema.DEV_CPF_CONSULTA_SIAPE,
        this.menuSchema.DEV_UNIDADE_CONSULTA_SIAPE
      ]
    }];

    this.menuContexto = [
      { key: "GESTAO", permition: "CTXT_GEST", icon: "bi bi-clipboard-data", name: this.lex.translate("PGD"), menu: this.moduloGestao },
      { key: "EXECUCAO", permition: "CTXT_EXEC", icon: "bi bi-clipboard-data", name: this.lex.translate("PGD"), menu: this.moduloExecucao },
      { key: "ADMINISTRADOR", permition: "CTXT_ADM", icon: "bi bi-emoji-sunglasses", name: this.lex.translate("Administrador"), menu: this.moduloAdministrador },
      { key: "DEV", permition: "CTXT_DEV", icon: "bi bi-braces", name: this.lex.translate("Desenvolvedor"), menu: this.moduloDev }
    ]

  }

  public orderMenu(a: any, b: any) {
    return a.nome < b.nome ? -1 : 1;
  }

  public rootMenuClick(item: any) {
    if (!item.menu?.length) this.go.navigate({ route: item.route }, item.metadata || { root: true });
  }

  public get modulo(): any {
    switch (this.gb.contexto?.key) {
      case "GESTAO": return this.moduloGestao;
      case "EXECUCAO": return this.moduloExecucao;
      case "ADMINISTRADOR": return this.moduloAdministrador;
      case "DEV": return this.moduloDev;
      default: return [];
    }
  }

  public ngAfterViewInit() {
    /* Container para a criação de dialogs */
    this.dialog.container = this.dialogs;
    this.dialog.cdRef = this.cdRef;
    this.gb.refresh();

    let gestaoPGD = this.auth.hasPermissionTo("CTXT_GEST");
    let execucaoPGD = this.auth.hasPermissionTo("CTXT_EXEC");

    if (gestaoPGD) {
      this.menuContexto = this.menuContexto.filter(item => item.key !== "EXECUCAO");
    } else if (execucaoPGD && !gestaoPGD) {
      this.menuContexto = this.menuContexto.filter(item => item.key !== "GESTAO");
    }
  }

  public toolbarLogin() {
    this.go.navigate({ route: ["login"] }, { modal: true });
  }

  public menuItemClass(baseClass: string, item: any) {
    let routeUrl = this.go.getRouteUrl().replace(/^\//, "");
    if (item.menu?.find((x: any) => !x)) console.log(item);
    return baseClass + (item.route?.join("/") == routeUrl || item.menu?.find((x: any) => x?.route?.join("/") == routeUrl) ? " fw-bold" : "");
  }

  public isButtonRunning(btn: ToolbarButton): boolean {
    return btn.running || !!btn.items?.find(x => x.running);
  }

  public buttonId(button: ToolbarButton) {
    return "button_" + this.utils.md5((button.icon || "") + (button.hint || "") + (button.label || ""));
  }

  public openModule(item: any) {
    if (item.route) this.go.navigate({ route: item.route, params: item.params }, item.metadata || { root: true });
  }

  public get unidades(): any[] {
    return this.auth.unidades || [];
  }

  public get usuarioNome(): string {
    return this.utils.shortName(this.auth.usuario?.apelido.length ? this.auth.usuario?.apelido : this.auth.usuario?.nome || "");
  }

  public get usuarioFoto(): SafeUrl {
    return this.gb.getResourcePath(this.auth.usuario?.url_foto || "assets/images/profile.png");
  }

  public onCollapseContainerClick() {
    this.auth.usuarioConfig = { ocultar_container_petrvs: !this.auth.usuario!.config.ocultar_container_petrvs };
    this.cdRef.detectChanges();
  }

  public get collapseContainer(): boolean {
    return this.gb.isEmbedded && this.auth.logged && !!this.auth.usuario?.config.ocultar_container_petrvs;
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

  public emDesenvolvimento() {
    this.dialog.alert('Atenção', 'Item em desenvolvimento');
  }

}