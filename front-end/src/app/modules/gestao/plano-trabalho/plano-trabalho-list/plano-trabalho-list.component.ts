import { LookupItem } from '../../../../services/lookup.service';
import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { FullRoute } from 'src/app/services/navigate.service';
import { PlanoTrabalhoService } from '../plano-trabalho.service';
import { DocumentoService } from 'src/app/modules/uteis/documentos/documento.service';

@Component({
  selector: 'plano-trabalho-list',
  templateUrl: './plano-trabalho-list.component.html',
  styleUrls: ['./plano-trabalho-list.component.scss']
})
export class PlanoTrabalhoListComponent extends PageListBase<PlanoTrabalho, PlanoTrabalhoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public static selectRoute?: FullRoute = { route: ["gestao", "plano-trabalho"] };
  public unidadeDao: UnidadeDaoService;
  public documentoDao: DocumentoDaoService;
  public documentoService: DocumentoService;
  public programaDao: ProgramaDaoService;
  public usuarioDao: UsuarioDaoService;
  public planoTrabalhoService: PlanoTrabalhoService;
  public routeStatus: FullRoute = { route: ["uteis", "status"] };
  public tipoModalidadeDao: TipoModalidadeDaoService;
  public multiselectAllFields: string[] = ["tipo_modalidade_id", "usuario_id", "unidade_id", "documento_id"];
  public botoes: ToolbarButton[] = [];
  public BOTAO_ALTERAR: ToolbarButton;
  public BOTAO_ARQUIVAR: ToolbarButton;
  public BOTAO_ASSINAR: ToolbarButton;
  public BOTAO_ATIVAR: ToolbarButton;
  public BOTAO_CANCELAR_ASSINATURA: ToolbarButton;
  public BOTAO_CANCELAR_PLANO: ToolbarButton;
  public BOTAO_DESARQUIVAR: ToolbarButton;
  public BOTAO_ENVIAR_ASSINATURA: ToolbarButton;
  public BOTAO_INFORMACOES: ToolbarButton;
  public BOTAO_REATIVAR: ToolbarButton;
  public BOTAO_SUSPENDER: ToolbarButton;
  public BOTAO_TERMOS: ToolbarButton;
  public DATAS_FILTRO: LookupItem[] = [
    { key: "VIGENTE", value: "Vigente" },
    { key: "NAOVIGENTE", value: "Não vigente" },
    { key: "INICIAM", value: "Iniciam" },
    { key: "FINALIZAM", value: "Finalizam" }
  ];

  constructor(public injector: Injector) {
    super(injector, PlanoTrabalho, PlanoTrabalhoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
    this.documentoService = injector.get<DocumentoService>(DocumentoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.planoTrabalhoService = injector.get<PlanoTrabalhoService>(PlanoTrabalhoService);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Planos de Trabalho");
    this.code = "MOD_PTR";
    this.filter = this.fh.FormBuilder({
      agrupar: { default: true },
      usuario: { default: "" },
      unidade_id: { default: null },
      tipo_modalidade_id: { default: null },
      data_filtro: { default: null },
      data_filtro_inicio: { default: new Date() },
      data_filtro_fim: { default: new Date() }
    }, this.cdRef, this.filterValidate);
    this.join = ["unidade.entidade", "unidade.gestor.usuario:id", "usuario", "programa", "documento.assinaturas.usuario:id,nome,url_foto", "tipo_modalidade", 
                "entregas.plano_entrega_entrega.entrega", "entregas.plano_entrega_entrega.plano_entrega:id,unidade_id", "entregas.plano_entrega_entrega.plano_entrega.unidade", "entregas.entrega"];
    this.groupBy = [{ field: "unidade.sigla", label: "Unidade" }];
    this.BOTAO_ALTERAR = { label: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: this.edit.bind(this) };
    this.BOTAO_ARQUIVAR = { label: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
    this.BOTAO_ASSINAR = { label: "Assinar", icon: "bi bi-pen", onClick: this.assinar.bind(this) };
    this.BOTAO_ATIVAR = { label: "Ativar", icon: this.lookup.getIcon(this.lookup.PLANO_TRABALHO_STATUS, "ATIVO"), color: this.lookup.getColor(this.lookup.PLANO_TRABALHO_STATUS, "ATIVO"), onClick: this.ativar.bind(this) };
    this.BOTAO_CANCELAR_ASSINATURA = { label: "Cancelar assinatura", icon: this.lookup.getIcon(this.lookup.PLANO_TRABALHO_STATUS, "AGUARDANDO_ASSINATURA ou INCLUIDO"), color: this.lookup.getColor(this.lookup.PLANO_TRABALHO_STATUS, "AGUARDANDO_ASSINATURA ou INCLUIDO"), onClick: this.cancelarAssinatura.bind(this) };
    this.BOTAO_CANCELAR_PLANO = { label: "Cancelar plano", icon: this.lookup.getIcon(this.lookup.PLANO_TRABALHO_STATUS, "CANCELADO"), color: this.lookup.getColor(this.lookup.PLANO_TRABALHO_STATUS, "CANCELADO"), onClick: this.cancelarPlano.bind(this) };
    this.BOTAO_DESARQUIVAR = { label: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };
    this.BOTAO_ENVIAR_ASSINATURA = { label: "Enviar para assinatura", icon: this.lookup.getIcon(this.lookup.PLANO_TRABALHO_STATUS, "AGUARDANDO_ASSINATURA"), color: this.lookup.getColor(this.lookup.PLANO_TRABALHO_STATUS, "AGUARDANDO_ASSINATURA"), onClick: this.enviarParaAssinatura.bind(this) };
    this.BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
    this.BOTAO_TERMOS = { label: "Termos", icon: "bi bi-file-earmark-check", onClick: ((row: PlanoTrabalho) => this.go.navigate({ route: ['uteis', 'documentos', 'TCR', row.id] }, { modalClose: (modalResult) => console.log(modalResult?.conteudo), metadata: this.planoTrabalhoService.metadados(row) })).bind(this) };
    this.BOTAO_REATIVAR = { label: "Reativar", icon: this.lookup.getIcon(this.lookup.PLANO_TRABALHO_STATUS, "ATIVO"), color: this.lookup.getColor(this.lookup.PLANO_TRABALHO_STATUS, "ATIVO"), onClick: this.reativar.bind(this) };
    this.BOTAO_SUSPENDER = { label: "Suspender", icon: this.lookup.getIcon(this.lookup.PLANO_TRABALHO_STATUS, "SUSPENSO"), color: this.lookup.getColor(this.lookup.PLANO_TRABALHO_STATUS, "SUSPENSO"), onClick: this.suspender.bind(this) };
    this.botoes = [this.BOTAO_ALTERAR, this.BOTAO_ARQUIVAR, this.BOTAO_ASSINAR, this.BOTAO_ATIVAR, this.BOTAO_CANCELAR_ASSINATURA, this.BOTAO_CANCELAR_PLANO,
      this.BOTAO_DESARQUIVAR, this.BOTAO_ENVIAR_ASSINATURA, this.BOTAO_INFORMACOES, this.BOTAO_TERMOS, this.BOTAO_REATIVAR, this.BOTAO_SUSPENDER];
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.metadata?.minha_unidade) {
      this.filter?.controls.unidade_id.setValue(this.auth.unidade?.id);
    }
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    this.botoes.forEach(botao => {
      if (this.botaoAtendeCondicoes(botao, row)) result.push(botao);
    });
    return result;    
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let planoTrabalho: PlanoTrabalho = row as PlanoTrabalho;
    switch (this.planoTrabalhoService.situacaoPlano(planoTrabalho)) {
      case 'INCLUIDO':
        if(this.botaoAtendeCondicoes(this.BOTAO_ASSINAR, row)) result.push(this.BOTAO_ASSINAR)
        else if(this.botaoAtendeCondicoes(this.BOTAO_ATIVAR, row)) result.push(this.BOTAO_ATIVAR)
        else if(this.botaoAtendeCondicoes(this.BOTAO_ENVIAR_ASSINATURA, row)) result.push(this.BOTAO_ENVIAR_ASSINATURA);
        /*         
          - botões-padrão:
            - 'Assinar'. Condições para ser exibido: vide RN_PTR_O;                  (quando for exigida apenas a assinatura do usuário logado no TCR)
            - 'Ativar'. Condições para ser exibido: vide RN_PTR_P;                   (quando não for exigida nenhuma assinatura no TCR)
            - 'Enviar para Assinatura'. Condições para ser exibido: vide RN_PTR_U;
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S; 
        */        
        break;
      case 'AGUARDANDO_ASSINATURA':
        if(this.botaoAtendeCondicoes(this.BOTAO_ASSINAR, row)) result.push(this.BOTAO_ASSINAR);
        /**
          - botões-padrão:
            - 'Assinar'. Condições para ser exibido: vide RN_PTR_O;
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
        */
        break;
      case 'ATIVO':
        /**
          - botões-padrão:
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
        */
        break;
      case 'CONCLUIDO':
        if(this.botaoAtendeCondicoes(this.BOTAO_ARQUIVAR, row)) result.push(this.BOTAO_ARQUIVAR);
        /**
          - botões-padrão:
            - 'Arquivar'. Condições para ser exibido: vide RN_PTR_N;
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S; 
        */
        break;
      case 'SUSPENSO':
        /**
          - botões-padrão:
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
        */
        break;
      case 'ARQUIVADO':
        /**
          - botões-padrão:
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
        */
        break;
      case 'CANCELADO':
        /**
          - botões-padrão:
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
        */
        break;
    }
    if (!result.length) result.push(this.BOTAO_INFORMACOES);
    return result;
  }

  public filterValidate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if (controlName == "data_filtro_inicio" && control.value > this.filter?.controls.data_filtro_fim.value) {
      result = "Maior que fim";
    } else if (controlName == "data_filtro_fim" && control.value < this.filter?.controls.data_filtro_inicio.value) {
      result = "Menor que início";
    }
    return result;
  }

  public filterClear(filter: FormGroup) {
    filter.controls.usuario.setValue("");
    filter.controls.unidade_id.setValue(null);
    filter.controls.tipo_modalidade_id.setValue(null);
    filter.controls.data_filtro.setValue(null);
    filter.controls.data_filtro_inicio.setValue(new Date());
    filter.controls.data_filtro_fim.setValue(new Date());
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if (form.tipo_modalidade_id?.length) {
      result.push(["tipo_modalidade_id", "==", form.tipo_modalidade_id]);
    }
    if (form.data_filtro) {
      result.push(["data_filtro", "==", form.data_filtro]);
      result.push(["data_filtro_inicio", "==", form.data_filtro_inicio]);
      result.push(["data_filtro_fim", "==", form.data_filtro_fim]);
    }
    if (form.usuario?.length) {
      result.push(["usuario.nome", "like", "%" + form.usuario.trim().replace(" ", "%") + "%"]);
    }
    if (form.unidade_id?.length) {
      result.push(["unidade_id", "==", form.unidade_id]);
    }

    return result;
  }

  public onAgruparChange(event: Event) {
    const agrupar = this.filter!.controls.agrupar.value;
    if ((agrupar && !this.groupBy?.length) || (!agrupar && this.groupBy?.length)) {
      this.groupBy = agrupar ? [{ field: "unidade.sigla", label: "Unidade" }] : [];
      this.grid!.reloadFilter();
    }
  }

  public dynamicMultiselectMenu = (multiselected: IIndexable): ToolbarButton[] => {
    let assinar = !!Object.keys(multiselected).length;
    let menu = [];
    Object.entries(multiselected).forEach(([key, value]) => {
      if (!this.planoTrabalhoService.needSign(value)) assinar = false;
    });
    if (assinar) menu.push({ label: "Assinar", icon: "bi bi-pen", onClick: this.assinar.bind(this) });
    return menu;
  }

  public botaoAtendeCondicoes(botao: ToolbarButton, planoTrabalho: PlanoTrabalho): boolean {
    let assinaturasExigidas: string[] = planoTrabalho.assinaturasExigidas;
    let usuarioEhGestorUnidadeExecutora: boolean = this.auth.usuario?.id == planoTrabalho.unidade?.gestor?.usuario?.id;
    let usuarioJaAssinouTCR: boolean = planoTrabalho.jaAssinaramTCR.includes(this.auth.usuario?.id!);
    let assinaturaUsuarioEhExigida: boolean = planoTrabalho.assinaturasExigidas.includes(this.auth.usuario?.id!);
    let planoIncluido = this.planoTrabalhoService.situacaoPlano(planoTrabalho) == 'INCLUIDO'; 
    let usuarioEhParticipante = this.auth.usuario?.id == planoTrabalho.usuario_id; 
    let planoAguardandoAssinatura = this.planoTrabalhoService.situacaoPlano(planoTrabalho) == 'AGUARDANDO_ASSINATURA'; 
    let planoAtivo = this.planoTrabalhoService.situacaoPlano(planoTrabalho) == 'ATIVO'; 
    let planoConcluido = this.planoTrabalhoService.situacaoPlano(planoTrabalho) == 'CONCLUIDO'; 
    let planoArquivado = this.planoTrabalhoService.situacaoPlano(planoTrabalho) == 'ARQUIVADO'; 
    let programaExigeOutrasAssinaturas = !!assinaturasExigidas.filter(a => a != this.auth.usuario?.id).length;
    let planoSuspenso = this.planoTrabalhoService.situacaoPlano(planoTrabalho) == 'SUSPENSO'; 
    let planoPossuiEntrega = planoTrabalho.entregas.length > 0; 
    switch (botao) {
      case this.BOTAO_ALTERAR:
        /*
          (RN_PTR_M) Condições para que um Plano de Trabalho possa ser alterado:
          O usuário logado precisa possuir a capacidade "MOD_PTR_EDT", o Plano de Trabalho precisa ser válido (ou seja, nem deletado, nem arquivado, nem estar no status CANCELADO), e:
              - estando com o status 'INCLUIDO', o usuário logado precisa ser o participante do plano ou o gestor da Unidade Executora;
              - estando com o status 'AGUARDANDO_ASSINATURA', o usuário logado precisa ser um dos que já assinaram o TCR e todas as assinaturas tornam-se sem efeito;
              - estando com o status 'ATIVO', o usuário precisa ser gestor da Unidade Executora e possuir a capacidade MOD_PTR_EDT_ATV. Após alterado, o Plano de Trabalho precisa ser repactuado (novo TCR), e o plano retorna ao status 'AGUARDANDO_ASSINATURA';
        */
       let condition1 = this.auth.hasPermissionTo("MOD_PTR_EDT");
       let condition2 = this.planoTrabalhoService.isValido(planoTrabalho);
       let condition3 = planoIncluido && (usuarioEhParticipante || usuarioEhGestorUnidadeExecutora);
       let condition4 = planoAguardandoAssinatura && usuarioJaAssinouTCR;
       let condition5 = planoAtivo && usuarioEhGestorUnidadeExecutora && this.auth.hasPermissionTo("MOD_PTR_EDT_ATV");
        return  condition1 && condition2 && (condition3 || condition4 || condition5);
      case this.BOTAO_ARQUIVAR:
        /*
          (RN_PTR_N) ARQUIVAR
          O plano precisa estar com o status CONCLUIDO, não ter sido arquivado, e:
            - o usuário logado precisa ser o participante ou o gestor da Unidade Executora;
        */
        return planoConcluido && !planoArquivado && (usuarioEhParticipante || usuarioEhGestorUnidadeExecutora);
      case this.BOTAO_ASSINAR:
        /*
          (RN_PTR_O) ASSINAR
            - o plano precisa possuir ao menos uma entrega, e:
            - o plano precisa estar com o status INCLUIDO, e:
              - o usuário logado precisa ser o participante do plano ou o gestor da sua Unidade Executora, e
              - a assinatura do usuário logado precisa ser uma das exigidas pelo Programa de Gestão, e ele não ter ainda assinado;
            - ou o plano precisa estar com o status AGUARDANDO_ASSINATURA, e:
              - a assinatura do usuário logado precisa ser uma das exigidas pelo Programa de Gestão, e ele não ter ainda assinado;
        */
       let condicao1 = usuarioEhParticipante || usuarioEhGestorUnidadeExecutora;
       let condicao2 = assinaturaUsuarioEhExigida && !usuarioJaAssinouTCR;
        return planoPossuiEntrega && ((planoIncluido && condicao1 && condicao2) || (planoAguardandoAssinatura && condicao2));
      case this.BOTAO_ATIVAR:
        /*
          (RN_PTR_P) ATIVAR
          O plano precisa estar no status 'INCLUIDO', e
              - o usuário logado precisa ser o participante do plano ou gestor da Unidade Executora, e
              - nenhuma assinatura no TCR ser exigida pelo programa, e
              - o plano de trabalho precisa ter ao menos uma entrega;        
        */
        return planoIncluido && (usuarioEhParticipante || usuarioEhGestorUnidadeExecutora) && !assinaturasExigidas.length && planoPossuiEntrega;
      case this.BOTAO_CANCELAR_ASSINATURA:
        /*
          (RN_PTR_Q) CANCELAR ASSINATURA
          O plano precisa estar no status 'AGUARDANDO_ASSINATURA'; e
            - o usuário logado precisa já ter assinado o TCR;
        */
        return planoAguardandoAssinatura && usuarioJaAssinouTCR;
      case this.BOTAO_CANCELAR_PLANO:
        /*
          (RN_PTR_R) CANCELAR 
          O usuário logado precisa possuir a capacidade "MOD_PTR_CNC", e
            - o plano precisa estar em um dos seguintes status: INCLUIDO, AGUARDANDO_ASSINATURA, ATIVO ou CONCLUIDO; e
            - o usuário logado precisa ser gestor da Unidade Executora;
        */
        return this.auth.hasPermissionTo("MOD_PTR_CNC") && ['INCLUIDO', 'AGUARDANDO_ASSINATURA', 'ATIVO', 'CONCLUIDO'].includes(planoTrabalho.status);
      case this.BOTAO_INFORMACOES:
        /*
          (RN_PTR_S) CONSULTAR
          Todos os participantes podem visualizar todos os planos de trabalho, desde que possuam a capacidade "MOD_PTR";
        */
        return this.auth.hasPermissionTo("MOD_PTR");
      case this.BOTAO_DESARQUIVAR:
        /*
          (RN_PTR_T) DESARQUIVAR
          O plano precisa estar arquivado, e:
              - o usuário logado precisa ser o participante ou gestor da Unidade Executora;
        */
        return planoArquivado && (usuarioEhParticipante || usuarioEhGestorUnidadeExecutora);
      case this.BOTAO_ENVIAR_ASSINATURA:
        /*
          (RN_PTR_U) ENVIAR PARA ASSINATURA
          O plano precisa estar com o status INCLUIDO; e
            - o usuário logado precisa ser o participante do plano ou gestor da sua Unidade Executora; e
            - o programa de gestão precisa exigir não só a assinatura do usuário logado, e
            - o plano precisa possui ao menos uma entrega;
        */
        return planoIncluido && (usuarioEhParticipante || usuarioEhGestorUnidadeExecutora) && programaExigeOutrasAssinaturas && planoPossuiEntrega;
      case this.BOTAO_REATIVAR:
        /*
          (RN_PTR_W) REATIVAR
          O plano precisa estar com o status SUSPENSO, e
            - o usuário logado precisa ser gestor da Unidade Executora;
        */
        return planoSuspenso && usuarioEhGestorUnidadeExecutora;
      case this.BOTAO_SUSPENDER:
        /*
          (RN_PTR_X) SUSPENDER
          O plano precisa estar com o status ATIVO, e
            - o usuário logado precisa ser gestor da Unidade Executora;
        */
        return planoAtivo && usuarioEhGestorUnidadeExecutora;
      case this.BOTAO_TERMOS:
        return this.auth.hasPermissionTo("MOD_PTR");
    }
    return false;
  }

  public arquivar(planoTrabalho: PlanoTrabalho) {
    this.go.navigate(this.routeStatus, {
      metadata: { tipo: "PlanoTrabalho", entity: planoTrabalho, novoStatus: planoTrabalho.status, onClick: this.dao!.arquivar.bind(this.dao) },
      title: "Arquivar Plano de Trabalho",
      modalClose: (modalResult) => {
        if (modalResult) {
          (this.grid?.query || this.query!).refreshId(planoTrabalho.id);
        };
      }
    });
  }

  public assinar(planoTrabalho?: PlanoTrabalho) {
    const planosIds = planoTrabalho ? [planoTrabalho.id] : Object.keys(this.grid!.multiselected || {});
    const documentos = this.grid!.items.filter(x => planosIds.includes(x.id) && x.documento_id?.length).map(x => x.documento);
    if (!documentos.length) {
      this.dialog.alert("Selecione", "Nenhum plano selecionado!");
    } else {
      this.documentoService.sign(documentos).then(() => this.grid!.reset());
    }
  }

  public ativar(planoTrabalho: PlanoTrabalho) {
    this.go.navigate(this.routeStatus, {
      metadata: { tipo: "PlanoTrabalho", entity: planoTrabalho, novoStatus: "ATIVO", onClick: this.dao!.ativar.bind(this.dao) },
      title: "Ativar Plano de Trabalho",
      modalClose: (modalResult) => {
        if (modalResult) {
          (this.grid?.query || this.query!).refreshId(planoTrabalho.id);
        };
      }
    });
  }

  // COMPLEMENTAR A IMPLEMENTAÇÃO DO MÉTODO
  public cancelarAssinatura(planoTrabalho: PlanoTrabalho) {
    this.go.navigate(this.routeStatus, {
      metadata: { tipo: "PlanoTrabalho", entity: planoTrabalho, novoStatus: "AGUARDANDO_ASSINATURA", onClick: this.dao!.cancelarAssinatura.bind(this.dao) },
      title: "Cancelar Assinatura do TCR",
      modalClose: (modalResult) => {
        if (modalResult) {
          (this.grid?.query || this.query!).refreshId(planoTrabalho.id);
        };
      }
    });
  }

  public cancelarPlano(planoTrabalho: PlanoTrabalho) {
    this.go.navigate(this.routeStatus, {
      metadata: { tipo: "PlanoTrabalho", entity: planoTrabalho, novoStatus: "CANCELADO", onClick: this.dao!.cancelarPlano.bind(this.dao) },
      title: "Cancelar Plano de Trabalho",
      modalClose: (modalResult) => {
        if (modalResult) {
          (this.grid?.query || this.query!).refreshId(planoTrabalho.id);
        };
      }
    });
  }

  public desarquivar(planoTrabalho: PlanoTrabalho) {
    this.go.navigate(this.routeStatus, {
      metadata: { tipo: "PlanoTrabalho", entity: planoTrabalho, novoStatus: planoTrabalho.status, onClick: this.dao!.desarquivar.bind(this.dao) },
      title: "Desarquivar Plano de Trabalho",
      modalClose: (modalResult) => {
        if (modalResult) {
          (this.grid?.query || this.query!).refreshId(planoTrabalho.id);
        };
      }
    });
  }

  public enviarParaAssinatura(planoTrabalho: PlanoTrabalho) {
    this.go.navigate(this.routeStatus, {
      metadata: { tipo: "PlanoTrabalho", entity: planoTrabalho, novoStatus: "AGUARDANDO_ASSINATURA", onClick: this.dao!.enviarParaAssinatura.bind(this.dao) },
      title: "Disponibilizar Plano de Trabalho para assinatura",
      modalClose: (modalResult) => {
        if (modalResult) {
          (this.grid?.query || this.query!).refreshId(planoTrabalho.id);
        };
      }
    });
  }

  public reativar(planoTrabalho: PlanoTrabalho) {
    this.go.navigate(this.routeStatus, {
      metadata: { tipo: "PlanoTrabalho", entity: planoTrabalho, novoStatus: "ATIVO", onClick: this.dao!.reativar.bind(this.dao) },
      title: "Reativar Plano de Trabalho",
      modalClose: (modalResult) => {
        if (modalResult) {
          (this.grid?.query || this.query!).refreshId(planoTrabalho.id);
        };
      }
    });
  }

  public suspender(planoTrabalho: PlanoTrabalho) {
    this.go.navigate(this.routeStatus, {
      metadata: { tipo: "PlanoTrabalho", entity: planoTrabalho, novoStatus: "SUSPENSO", onClick: this.dao!.suspender.bind(this.dao) },
      title: "Suspender Plano de Trabalho",
      modalClose: (modalResult) => {
        if (modalResult) {
          (this.grid?.query || this.query!).refreshId(planoTrabalho.id);
        };
      }
    });
  }

  public canAdd() {
    return this.auth.hasPermissionTo('MOD_PTR_INCL');
    //IMPLEMENTAR AS DEMAIS CONDIÇÕES NA VALIDAÇÃO DO FORM *******************
    /*
    (RN_PTR_V) INCLUIR/INSERIR
    O usuário logado precisa possuir a capacidade "MOD_PTR_INCL", e:
        - o usuário logado precisa ser um participante do PGD, habilitado, ou ser gestor da Unidade Executora do plano; (RN_PTR_B); e
        - o participante do plano precisa estar lotado em uma das áreas de trabalho do usuário logado, ou este deve possuir a capacidade MOD_PTR_USERS_INCL; e
        - o participante do plano precisa estar lotado na Unidade Executora, ou o usuário logado possuir a capacidade MOD_PTR_INCL_SEM_LOT; e
        - o novo Plano de Trabalho não pode apresentar período conflitante com outro plano já existente para a mesma Unidade Executora e mesmo participante, ou o usuário logado possuir a capacidade MOD_PTR_INTSC_DATA
    */
  }

}

