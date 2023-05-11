import { ChangeDetectorRef, Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarButton } from './components/toolbar/toolbar.component';
import { ListenerAllPagesService } from './listeners/listener-all-pages.service';
import { IIndexable } from './models/base.model';
import { Usuario } from './models/usuario.model';
import { AuthService } from './services/auth.service';
import { DialogService } from './services/dialog.service';
import { DialogComponent } from './services/dialog/dialog.component';
import { GlobalsService } from './services/globals.service';
import { LexicalService } from './services/lexical.service';
import { FullRoute, NavigateService } from './services/navigate.service';
import { UtilService } from './services/util.service';
import { LookupService } from './services/lookup.service';
import { EntityService } from './services/entity.service';

export let appInjector: Injector;

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
  public menuSchema: any;
  public menuContexto: any[];
  public contexto: any;
  public menuPgd: any;
  public menuProjeto: any;
  public menuGestao: any;
  public menuOperacional: any;
  public menuPonto: any;
  public menuRaioX: any;

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
    /* Inicializações */
    this.auth.success = (usuario: Usuario, redirectTo?: FullRoute) => {
      this.go.navigate(redirectTo || { route: this.globals.initialRoute });
    };
    this.auth.fail = (error: any) => {
      this.go.navigate({ route: ['login'], params: { error: error?.error || error?.message || error } });
    };
    this.auth.leave = () => {
      this.go.navigate({ route: ['login'] });
    };
    this.globals.refresh = () => {
      this.cdRef.detectChanges();
    };
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
    //this.auth.loadGapi();
    /* Definição do menu do sistema */

    this.menuSchema = {
      /* Cadastros */
      AFASTAMENTOS: { name: this.lex.noun("Afastamento", true), permition: 'MOD_AFT', route: ['cadastros', 'afastamento'], icon: this.entity.getIcon('Afastamento') },
      CIDADES: { name: this.lex.noun("Cidade", true), permition: 'MOD_CID', route: ['cadastros', 'cidade'], icon: this.entity.getIcon('Cidade') },
      EIXOS_TEMATICOS: { name: this.lex.noun("Eixo Temático", true), permition: 'MOD_PLAN_INST_CONS', route: ['cadastros', 'eixo-tematico'], icon: this.entity.getIcon('EixoTematico') },
      ENTREGAS: { name: this.lex.noun("Entrega", true), permition: 'MOD_ENTRG', route: ['cadastros', 'entrega'], icon: this.entity.getIcon('Entrega') },
      FERIADOS: { name: this.lex.noun("Feriado", true), permition: 'MOD_FER', route: ['cadastros', 'feriado'], icon: this.entity.getIcon('Feriado') },
      MATERIAIS_SERVICOS: { name: this.lex.noun("Material e Serviço", true), permition: '', route: ['cadastros', 'material-servico'], icon: this.entity.getIcon('MaterialServico') },
      TAREFAS: { name: this.lex.noun("Tarefa", true), permition: 'MOD_DMD', route: ['cadastros', 'tarefa'], icon: this.entity.getIcon('Tarefa') },
      TEMPLATES: { name: this.lex.noun("Template", true), permition: 'MOD_DMD', route: ['cadastros', 'template'], icon: this.entity.getIcon('Template') },
      TIPOS_ATIVIDADES: { name: "Tipos de " + this.lex.noun("Atividade", true), permition: 'MOD_TIPO_ATV', route: ['cadastros', 'tipo-atividade'], icon: this.entity.getIcon('TipoAtividade') },
      TIPOS_AVALIACOES: { name: "Tipos de " + this.lex.noun("Avaliação", true), permition: 'MOD_TIPO_AVAL', route: ['cadastros', 'tipo-avaliacao'], icon: this.entity.getIcon('TipoAvaliacao') },
      TIPOS_DOCUMENTOS: { name: "Tipos de " + this.lex.noun("Documento", true), permition: 'MOD_TIPO_DOC', route: ['cadastros', 'tipo-documento'], icon: this.entity.getIcon('TipoDocumento') },
      TIPOS_JUSTIFICATIVAS: { name: "Tipos de " + this.lex.noun("Justificativa", true), permition: 'MOD_TIPO_JUST', route: ['cadastros', 'tipo-justificativa'], icon: this.entity.getIcon('TipoJustificativa') },
      TIPOS_MODALIDADES: { name: "Tipos de " + this.lex.noun("Modalidade", true), permition: 'MOD_TIPO_MDL', route: ['cadastros', 'tipo-modalidade'], icon: this.entity.getIcon('TipoModalidade') },
      TIPOS_MOTIVOS_AFASTAMENTOS: { name: "Tipos de " + this.lex.noun("Motivo de Afastamento", true), permition: 'MOD_TIPO_MTV_AFT', route: ['cadastros', 'tipo-motivo-afastamento'], icon: this.entity.getIcon('TipoMotivoAfastamento') },
      TIPOS_PROCESSOS: { name: "Tipos de " + this.lex.noun("Processo", true), permition: 'MOD_TIPO_PROC', route: ['cadastros', 'tipo-processo'], icon: this.entity.getIcon('TipoProcesso') },
      /* Gestão */
      ADESAO: { name: this.lex.noun("Adesao", true), permition: 'MOD_ADES', route: ['gestao', 'adesao'], icon: this.entity.getIcon('Adesao') },
      ATIVIDADES: { name: this.lex.noun("Atividade", true), permition: 'MOD_ATV', route: ['gestao', 'atividade'], icon: this.entity.getIcon('Atividade') },
      CADEIAS_VALORES: { name: this.lex.noun("Cadeia de Valor", true), permition: 'MOD_CADV_CONS', route: ['gestao', 'cadeia-valor'], icon: this.entity.getIcon('CadeiaValor') },
      DEMANDAS: { name: this.lex.noun("Demanda", true), permition: '', route: ['gestao', 'demanda'], icon: this.entity.getIcon('Demanda') },
      PLANEJAMENTOS_INSTITUCIONAIS: { name: this.lex.noun("Planejamento Institucional", true), permition: 'MOD_PENT_CONS', route: ['gestao', 'planejamento'], icon: this.entity.getIcon('Planejamento') },
      PLANOS_ENTREGAS: { name: this.lex.noun("Plano de Entrega", true), permition: 'MOD_PENT_CONS', route: ['gestao', 'plano-entrega'], icon: this.entity.getIcon('PlanoEntrega') },
      PLANOS_TRABALHOS: { name: this.lex.noun("Plano de Trabalho", true), permition: 'MOD_PTR', route: ['gestao', 'plano-trabalho'], icon: this.entity.getIcon('Plano') },
      PROGRAMAS_GESTAO: { name: this.lex.noun("Programa de Gestão", true), permition: 'MOD_PRGT', route: ['gestao', 'programa'], icon: this.entity.getIcon('Programa') },
      PROJETOS: { name: this.lex.noun("Projeto", true), permition: 'MOD_PROJ', route: ['gestao', 'projeto'], icon: this.entity.getIcon('Projeto') },
      /* Relatórios */
      FORCAS_TRABALHOS_SERVIDORES: { name: "Força de Trabalho - Servidor", permition: 'MOD_PTR_CONS', route: ['relatorios', 'forca-de-trabalho', 'servidor'], icon: this.entity.getIcon('RelatorioServidor') },
      FORCAS_TRABALHOS_AREAS: { name: "Força de Trabalho - Área", permition: 'MOD_PTR_CONS', route: ['relatorios', 'forca-de-trabalho', 'area'], icon: this.entity.getIcon('RelatorioArea') },
      /* CONFIGURAÇÕES */
      PREFERENCIAS: { name: "Preferências", permition: '', route: ['configuracoes', 'preferencia'], metadata: { root: true, modal: true }, icon: this.entity.getIcon('Preferencia') },
      //"-",
      ENTIDADES: { name: this.lex.noun("Entidade", true), permition: 'MOD_CFG_ENTD', route: ['configuracoes', 'entidade'], icon: this.entity.getIcon('Entidade') },
      UNIDADES: { name: this.lex.noun("Unidade", true), permition: 'MOD_CFG_UND', route: ['configuracoes', 'unidade'], icon: this.entity.getIcon('Unidade') },
      USUARIOS: { name: this.lex.noun("Usuário", true), permition: 'MOD_CFG_USER', route: ['configuracoes', 'usuario'], icon: this.entity.getIcon('Usuario') },
      PERFIS: { name: "Perfis", permition: 'MOD_CFG_PERFS', route: ['configuracoes', 'perfil'], icon: this.entity.getIcon('Perfil') },
      SOBRE: { name: "Sobre", permition: '', route: ['configuracoes', 'sobre'], icon: "" },
      /* LOGS */
      ROTINAS_INTEGRACAO: { name: "Rotina de Integração", permition: '', route: ['rotinas', 'integracao'], icon: this.entity.getIcon('Integracao') },
      LOGS_ALTERACOES: { name: "Log das Alterações", permition: '', route: ['logs', 'change'], icon: this.entity.getIcon('Change') },
      LOGS_ERROS: { name: "Log dos Erros", permition: '', route: ['logs', 'error'], icon: this.entity.getIcon('Error') },
      LOGS_TRAFEGOS: { name: "Log do Tráfego", permition: '', route: ['logs', 'traffic'], icon: this.entity.getIcon('Traffic') },
      //"-",
      LOGS_TESTES_EXPEDIENTES: { name: "Teste Expediente", permition: '', route: ['teste'], icon: this.entity.getIcon('Teste') },
      TESTE_CALCULA_DATATEMPO: { name: "Teste calculaDataTempo", permition: '', route: ['teste', 'calcula-tempo'], icon: this.entity.getIcon('Teste') },
      /* RAIO X */
      RXHOME: { name: this.lex.noun("Home RX", true), permition: 'RX', route: ['raiox', 'home'], icon: "bi bi-toggle-off" },
      RXCADASTRO_PESSOAL: { name: this.lex.noun("Cadastro dos Dados Pessoais", true), permition: 'MOD_RX_VIS_DPE', route: ['raiox', 'pessoal'], icon: "bi bi-activity" },
      RXCADASTRO_PROFISSIONAL: { name: this.lex.noun("Cadastro dos Dados Profissionais", true), permition: 'MOD_RX_VIS_DPR', route: ['raiox', 'profissional'], icon: "bi bi-activity" },
      RXCADASTRO_ATRIBUTOS: { name: this.lex.noun("Cadastro dos Atributos Comportamentais", true), permition: 'MOD_RX_VIS_ATR', route: ['raiox', 'pessoal'], icon: "bi bi-activity" },
      RXVISUALIZA_OPORTUNIDADES: { name: this.lex.noun("Cadastro Pesquisa Oportunidades", true), permition: 'MOD_RX_VIS_OPO', route: ['raiox', 'pessoal'], icon: "bi bi-activity" },
      RXCADASTRO_OPORTUNIDADES: { name: this.lex.noun("Cadastro das Oportunidades", true), permition: 'MOD_RX_EDT_OPO', route: ['raiox', 'pessoal'], icon: "bi bi-activity" },
      RXCADASTRO_ADM_AREA_CONHECIMENTO: { name: this.lex.noun("Cadastro ADM das Áreas de Conhecimento", true), permition: 'MOD_RX_VIS_DPE', route: ['raiox', 'cadastros','gerais','areaconhecimento'], icon: "bi bi-activity" },
      RXCADASTRO_ADM_CURSOS: { name: this.lex.noun("Cadastro ADM dos Cursos", true), permition: 'MOD_RX_VIS_DPR', route: ['raiox', 'cadastros','gerais','curso'], icon: "bi bi-activity" },
      RXCADASTRO_ADM_ATRIBUTOS: { name: this.lex.noun("Cadastro ADM dos Atributos Comportamentais", true), permition: 'MOD_RX_VIS_ATR', route: ['raiox', 'atribadm'], icon: "bi bi-activity" },
      RXVISUALIZA_ADM_OPORTUNIDADES: { name: this.lex.noun("Cadastro ADM Pesquisa Oportunidades", true), permition: 'MOD_RX_VIS_OPO', route: ['raiox', 'pesqadm'], icon: "bi bi-activity" },
      RXCADASTRO_ADM_OPORTUNIDADES: { name: this.lex.noun("Cadastro ADM das Oportunidades", true), permition: 'MOD_RX_EDT_OPO', route: ['raiox', 'apoadm'], icon: "bi bi-activity" },
      /*PROJETOS*/


    };


    this.menuPgd = [
      {
        name: "Cadastros", permition: "MENU_CAD_ACESSO", route: ['cadastros'], id: "navbarDropdownCadastros", menu: [
         
          this.menuSchema.AFASTAMENTOS,
          this.menuSchema.CIDADES,
          this.menuSchema.EIXOS_TEMATICOS,
          this.menuSchema.ENTREGAS,
          this.menuSchema.FERIADOS,
          this.menuSchema.MATERIAIS_SERVICOS,
          this.menuSchema.TAREFAS,
          this.menuSchema.TEMPLATES,
          "-",
          this.menuSchema.TIPOS_ATIVIDADES,
          this.menuSchema.TIPOS_AVALIACOES,
          this.menuSchema.TIPOS_DOCUMENTOS,
          this.menuSchema.TIPOS_JUSTIFICATIVAS,
          this.menuSchema.TIPOS_MODALIDADES,
          this.menuSchema.TIPOS_MOTIVOS_AFASTAMENTOS,
          this.menuSchema.TIPOS_PROCESSOS

        ]
      },
      {
        name: "Gestão", permition: "MENU_GESTAO_ACESSO", route: ['gestao'], id: "navbarDropdownGestao", menu: [
          this.menuSchema.ADESAO,
          this.menuSchema.ATIVIDADES,
          this.menuSchema.CADEIAS_VALORES,
          this.menuSchema.DEMANDAS,
          this.menuSchema.PLANEJAMENTOS_INSTITUCIONAIS,
          this.menuSchema.PLANOS_ENTREGAS,
          this.menuSchema.PLANOS_TRABALHOS,
          this.menuSchema.PROGRAMAS_GESTAO,
          this.menuSchema.PROJETOS,
        ]
      },
      {
        name: "Relatórios", permition: "MENU_REL_ACESSO", route: ['relatorios'], id: "navbarDropdownRelatorios", menu: [
          this.menuSchema.FORCAS_TRABALHOS_AREAS,
          this.menuSchema.FORCAS_TRABALHOS_SERVIDORES,

        ]
      },
      {
        name: "Configurações", permition: "MENU_CONFIG_ACESSO", route: ['configuracoes'], id: "navbarDropdownConfiguracoes", menu: [
          this.menuSchema.PREFERENCIAS,
          this.menuSchema.ENTIDADES,
          this.menuSchema.UNIDADES,
          this.menuSchema.USUARIOS,
          this.menuSchema.PERFIS,
          this.menuSchema.SOBRE,
        ]
      },
      {
        name: "Desenvolvedor", permition: "DEV_MENU_LOGS_ACESSO", route: ['logs'], id: "navbarDropdownLogs", menu: [
          this.menuSchema.ROTINAS_INTEGRACAO,
          this.menuSchema.LOGS_ALTERACOES,
          this.menuSchema.LOGS_ERROS,
          this.menuSchema.LOGS_TRAFEGOS,
          this.menuSchema.LOGS_TESTES_EXPEDIENTES,
          this.menuSchema.TESTE_CALCULA_DATATEMPO,

        ]
      }
    ];

    this.menuRaioX= [
      {
        name: "Cadastros", permition: "MOD_RX_VIS_DPE", route: ['raiox'], id: "navbarDropdownCadastros", menu: [
          this.menuSchema.RXCADASTRO_PESSOAL,
          this.menuSchema.RXCADASTRO_PROFISSIONAL,
          this.menuSchema.RXCADASTRO_ATRIBUTOS,
          this.menuSchema.RXCADASTRO_OPORTUNIDADES
        ]
      },
      {
        name: "Oportunidades", permition: "MOD_RX_VIS_DPE", route: ['raiox'], id: "navbarDropdownCadastros", menu: [
          this.menuSchema.RXCADASTRO_PESSOAL,
          this.menuSchema.RXCADASTRO_PROFISSIONAL,
          this.menuSchema.RXCADASTRO_ATRIBUTOS,
          this.menuSchema.RXCADASTRO_OPORTUNIDADES
        ]
      },
      {
        name: "Pesquisas", permition: "MOD_RX_VIS_DPE", route: ['raiox'], id: "navbarDropdownCadastros", menu: [
          this.menuSchema.RXCADASTRO_PESSOAL,
          this.menuSchema.RXCADASTRO_PROFISSIONAL,
          this.menuSchema.RXCADASTRO_ATRIBUTOS,
          this.menuSchema.RXCADASTRO_OPORTUNIDADES
        ]
      },
      {
        name: "Cadastros Gerais", permition: "MOD_RX_VIS_DPE", route: ['raiox/cadastros/gerais'], id: "navbarDropdownCadastros", menu: [
          this.menuSchema.RXCADASTRO_ADM_AREA_CONHECIMENTO,
          this.menuSchema.RXCADASTRO_ADM_CURSOS,
          this.menuSchema.RXCADASTRO_ADM_ATRIBUTOS,
          this.menuSchema.RXCADASTRO_ADM_OPORTUNIDADES
        ]
      }

    ];

    this.menuPonto= [
      {
      }

    ];

    this.menuContexto = [
      { key: "PGD", name: "PGD", menu: this.menuPgd },
      { key: "PROJETO", name: "Projetos", menu: this.menuProjeto },
      { key: "GESTAO", name: "Gestão", menu: this.menuGestao },
      { key: "OPERACIONAL", name: "Operacional", menu: this.menuOperacional },
      { key: "PONTO", name: "Ponto eletrônico", menu: this.menuPonto },
      { key: "RAIOX", name: "Raio X", menu: this.menuRaioX }
    ];
    this.contexto = this.menuContexto[0].key;
   // this.contexto.key = "PGD"

  }

  public onContextoSelect(item: any) {
    this.contexto = item;
    console.log('onContexto',item)
    this.goHome();
  }

  public goHome() {
    this.go.navigate({ route: this.contexto?.key == 'RAIOX' ? ['raiox/home'] : ['home'] });
  }

  public get menu(): any {
    console.log('GET MENU',this.contexto)

    switch (this.contexto.key) {

      case "PGD":
        return this.menuPgd;

      case "RAIOX":
        return this.menuRaioX;

      case "PONTO":
        return this.menuPonto;

      default:
        return [];
    }


  }

  public ngAfterViewInit() {
    /* Container para a criação de dialogs */
    this.dialog.container = this.dialogs;
    this.dialog.cdRef = this.cdRef;
  }

  public toolbarLogin() {
    this.go.navigate({ route: ["login"] }, { modal: true });
  }

  public menuItemClass(baseClass: string, activeRoute: string[]) {
    return baseClass + (this.go.isActivePath(activeRoute) ? " fw-bold" : "");
  }

  public isButtonRunning(btn: ToolbarButton): boolean {
    return btn.running || !!btn.items?.find(x => x.running);
  }

  public buttonId(button: ToolbarButton) {
    return "button_" + this.utils.md5((button.icon || "") + (button.hint || "") + (button.label || ""));
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
    //this.auth.usuario!.config.ocultar_container_petrvs = !this.auth.usuario!.config.ocultar_container_petrvs;
    this.auth.usuarioConfig = { ocultar_container_petrvs: !this.auth.usuario!.config.ocultar_container_petrvs };
    this.cdRef.detectChanges();
  }

  public get collapseContainer(): boolean {
    return this.globals.isEmbedded && this.auth.logged && !!this.auth.usuario?.config.ocultar_container_petrvs;
  }

  public onRestoreClick(popup: DialogComponent) {
    popup.restore();
  }

  public selecionaUnidade(event: Event) {
    const key = (event.target as HTMLInputElement).value;
    this.auth.selecionaUnidade(key, this.cdRef);
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
