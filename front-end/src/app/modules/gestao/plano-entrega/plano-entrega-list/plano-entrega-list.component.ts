import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'plano-entrega-list',
  templateUrl: './plano-entrega-list.component.html',
  styleUrls: ['./plano-entrega-list.component.scss']
})
export class PlanoEntregaListComponent extends PageListBase<PlanoEntrega, PlanoEntregaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public showFilter: boolean = true;
  public linha?: PlanoEntrega;
  public unidadeDao: UnidadeDaoService;
  public planoEntregaDao: PlanoEntregaDaoService;
  public planejamentoDao: PlanejamentoDaoService;
  public cadeiaValorDao: CadeiaValorDaoService;
  public unidadeSelecionada: Unidade;
  public habilitarAdesaoToolbar: boolean = false;
  public toolbarButtons: ToolbarButton[] = [];
  public botoes: ToolbarButton[] = [];
  public BOTAO_ADERIR_TOOLBAR: ToolbarButton;
  public BOTAO_ADERIR_OPTION: ToolbarButton;
  public BOTAO_ALTERAR: ToolbarButton;
  public BOTAO_ARQUIVAR: ToolbarButton;
  public BOTAO_AVALIAR: ToolbarButton;
  public BOTAO_CANCELAR_AVALIACAO: ToolbarButton;
  public BOTAO_CANCELAR_CONCLUSAO: ToolbarButton;
  public BOTAO_CANCELAR_HOMOLOGACAO: ToolbarButton;
  public BOTAO_CONCLUIR: ToolbarButton;
  public BOTAO_CONSULTAR: ToolbarButton;
  public BOTAO_DESARQUIVAR: ToolbarButton;
  public BOTAO_EXCLUIR: ToolbarButton;
  public BOTAO_HOMOLOGAR: ToolbarButton;
  public BOTAO_LIBERAR_HOMOLOGACAO: ToolbarButton;
  public BOTAO_REATIVAR: ToolbarButton;
  public BOTAO_RETIRAR_HOMOLOGACAO: ToolbarButton;
  public BOTAO_SUSPENDER: ToolbarButton;

  constructor(public injector: Injector) {
    super(injector, PlanoEntrega, PlanoEntregaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.planoEntregaDao = injector.get<PlanoEntregaDaoService>(PlanoEntregaDaoService);
    this.planejamentoDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.cadeiaValorDao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.unidadeSelecionada = this.auth.unidade!;
    /* Inicializações */
    this.title = this.lex.noun('Plano de Entrega', true);
    this.filter = this.fh.FormBuilder({
      agrupar: { default: true },
      principais: { default: true },
      nome: { default: '' },
      inicio: { default: '' },
      fim: { default: '' },
      status: { default: '' },
      unidade_id: { default: null },
      planejamento_id: { default: null },
      cadeia_valor_id: { default: null },
    });
    this.join = ['planejamento:id,nome', 'cadeiaValor:id,nome', 'unidade:id,sigla,path', 'entregas.entrega', 'entregas.unidade'];
    this.groupBy = [{ field: "unidade.sigla", label: "Unidade" }];
    this.BOTAO_ADERIR_OPTION = { label: "Aderir", icon: this.entityService.getIcon("Adesao"), onClick: (() => { this.go.navigate({route: ['gestao', 'plano-entrega', 'adesao']}, { metadata: { planoEntrega: this.linha }, modalClose: (modalResult) => { this.refresh(); } }); }).bind(this) };
    this.BOTAO_ADERIR_TOOLBAR = { label: "Aderir", disabled: !this.habilitarAdesaoToolbar, icon: this.entityService.getIcon("Adesao"), onClick: (() => { this.go.navigate({ route: ['gestao', 'plano-entrega', 'adesao'] }, { modalClose: (modalResult) => { this.refresh(); } }); }).bind(this) };
    this.BOTAO_ALTERAR = { label: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: (planoEntrega: PlanoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'edit'] }, this.modalRefreshId(planoEntrega)) };
    this.BOTAO_ARQUIVAR = { label: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
    this.BOTAO_AVALIAR = { label: "Avaliar", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "AVALIADO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "AVALIADO"), onClick: this.avaliar.bind(this) };
    this.BOTAO_CANCELAR_AVALIACAO = { label: "Cancelar avaliação", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"), onClick: this.cancelarAvaliacao.bind(this) };
    this.BOTAO_CANCELAR_CONCLUSAO = { label: "Cancelar conclusão", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"), onClick: this.cancelarConclusao.bind(this) };
    this.BOTAO_CANCELAR_HOMOLOGACAO = { label: "Cancelar homologação", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "HOMOLOGANDO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "HOMOLOGANDO"), onClick: this.cancelarHomologacao.bind(this) };
    this.BOTAO_CONCLUIR = { label: "Concluir", id: "CONCLUIDO", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"), onClick: this.concluir.bind(this) };
    this.BOTAO_CONSULTAR = { label: "Informações", icon: "bi bi-info-circle", onClick: (planoEntrega: PlanoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'consult'] }, { modal: true }) };
    this.BOTAO_DESARQUIVAR = { label: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };
    this.BOTAO_EXCLUIR = { label: "Excluir", icon: "bi bi-trash", onClick: this.delete.bind(this) };
    this.BOTAO_HOMOLOGAR = { label: "Homologar", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"), onClick: this.homologar.bind(this) };
    this.BOTAO_LIBERAR_HOMOLOGACAO = { label: "Liberar para homologação", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "HOMOLOGANDO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "HOMOLOGANDO"), onClick: this.liberarHomologacao.bind(this) };
    this.BOTAO_REATIVAR = { label: "Reativar", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"), onClick: this.reativar.bind(this) };
    this.BOTAO_RETIRAR_HOMOLOGACAO = { label: "Retirar de homologação", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "INCLUINDO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "INCLUINDO"), onClick: this.retirarHomologacao.bind(this) };
    this.BOTAO_SUSPENDER = { label: "Suspender", id: "PAUSADO", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "SUSPENSO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "SUSPENSO"), onClick: this.suspender.bind(this) };
    this.botoes = [this.BOTAO_ADERIR_OPTION, this.BOTAO_ADERIR_TOOLBAR, this.BOTAO_ALTERAR, this.BOTAO_ARQUIVAR, this.BOTAO_AVALIAR, this.BOTAO_CANCELAR_AVALIACAO, this.BOTAO_CANCELAR_CONCLUSAO, 
                  this.BOTAO_CANCELAR_HOMOLOGACAO, this.BOTAO_CONCLUIR, this.BOTAO_CONSULTAR, this.BOTAO_DESARQUIVAR, this.BOTAO_EXCLUIR, this.BOTAO_HOMOLOGAR, this.BOTAO_LIBERAR_HOMOLOGACAO, 
                  this.BOTAO_REATIVAR, this.BOTAO_RETIRAR_HOMOLOGACAO, this.BOTAO_SUSPENDER];
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.showFilter = typeof this.queryParams?.showFilter != "undefined" ? (this.queryParams.showFilter == "true") : true;
    this.checaBotaoAderirToolbar();
    this.toolbarButtons.push(this.BOTAO_ADERIR_TOOLBAR);
  }

  ngAfterContentChecked(): void {
    if (this.auth.unidade != this.unidadeSelecionada) {
      this.unidadeSelecionada = this.auth.unidade!;
      this.checaBotaoAderirToolbar();
      this.cdRef.detectChanges();
    }
  }

  public checaBotaoAderirToolbar() {
    let planos_ativos_unidade_pai = this.planosEntregasAtivosUnidadePai().map(x => x.id);
    let planos_superiores_vinculados_pela_unidade_selecionada = this.planosEntregasAtivosUnidadeSelecionada().map(x => x.plano_entrega_id).filter(x => x != null);
    let condition1 = this.auth.isGestorUnidade() || this.auth.isGestorUnidade(this.auth.unidade?.unidade_id) || (this.auth.isLotacaoPrincipal(this.auth.unidade) && this.auth.hasPermissionTo("MOD_PENT_ADERIR"));
    let condition2 = !!planos_ativos_unidade_pai.filter(x => !planos_superiores_vinculados_pela_unidade_selecionada.includes(x)).length;
    this.habilitarAdesaoToolbar = condition1 && condition2;
    this.BOTAO_ADERIR_TOOLBAR.disabled = !this.habilitarAdesaoToolbar;
    /*  (RI_PENT_1)
        O botão Aderir, na toolbar, deverá ser exibido sempre, mas para ficar habilitado:
        1. o usuário logado precisa ser gestor da unidade selecionada ou da sua unidade-pai, ou uma destas ser sua unidade de lotação principal e ele 
        possuir a capacidade "MOD_PENT_ADERIR" (RN_PENT_2_4); e
        2. a unidade-pai da unidade selecionada precisa possuir plano de entrega com o status ATIVO, que já não tenha sido vinculado pela unidade selecionada;
    */
  }

  public planosEntregasAtivosUnidadePai(): PlanoEntrega[] {
    return this.auth.unidade?.unidade?.planos_entregas?.filter(x => this.planoEntregaDao.isAtivo(x)) || [];
  }

  public planosEntregasAtivosUnidadeSelecionada(): PlanoEntrega[] {
    return this.auth?.unidade?.planos_entregas?.filter(x => this.planoEntregaDao.isAtivo(x)) || [];
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.inicio.setValue(null);
    filter.controls.fim.setValue(null);
    filter.controls.unidade_id.setValue(null);
    filter.controls.planejamento_id.setValue(null);
    filter.controls.cadeia_valor_id.setValue(null);
    filter.controls.status.setValue(null);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    /*
        (RI_PENT_4) A consulta do grid retornará inicialmente os principais Planos de Entrega do usuário logado (a opção "principais" já vem marcada), que são:
        - os válidos das unidades onde ele possui lotação, e
        - se ele for gestor, os ativos das unidades-pai de onde ele é gestor;
    */
    if (this.filter?.controls.principais.value) {
      let w1 = ["unidade_id", "in", this.auth.unidades?.map(u => u.id)];
      let w2 = ["unidade_id", "in", this.auth.unidades?.map(u => u.unidade?.id)];
      if (this.auth.isGestorAlgumaLotacao()) result.push(["or", w1, w2]); else result.push(w1);
    } else {
      if (form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome + "%"]);
      }
      if (form.inicio) {
        result.push(["inicio", ">=", form.inicio]);
      }
      if (form.fim) {
        result.push(["fim", "<=", form.fim]);
      }
      if (form.unidade_id) {
        result.push(["unidade_id", "==", form.unidade_id]);
      }
      if (form.planejamento_id) {
        result.push(["planejamento_id", "==", form.planejamento_id]);
      }
      if (form.cadeia_valor_id) {
        result.push(["cadeia_valor_id", "==", form.cadeia_valor_id]);
      }
      if (form.status) {
        result.push(["status", "==", form.status]);
      }
    }
    //  (RI_PENT_5) Por padrão, os planos de entregas retornados na listagem do grid são os que possuem data_arquivamento e data_cancelamento nulas.
    result.push(["data_cancelamento", "==", null]);
    result.push(["data_arquivamento", "==", null]);
    return result;
  }

  public onAgruparChange(event: Event) {
    const agrupar = this.filter!.controls.agrupar.value;
    if ((agrupar && !this.groupBy?.length) || (!agrupar && this.groupBy?.length)) {
      this.groupBy = agrupar ? [{ field: "unidade.sigla", label: "Unidade" }] : [];
      this.grid!.reloadFilter();
    }
  }

  public dynamicButtons(row: PlanoEntrega): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let planoEntrega: PlanoEntrega = row as PlanoEntrega;
    switch (this.situacaoPlano(planoEntrega)) {
      case 'INCLUINDO':
        if(this.botaoAtendeCondicoes(this.BOTAO_LIBERAR_HOMOLOGACAO, row)) result.push(this.BOTAO_LIBERAR_HOMOLOGACAO); else result.push(this.BOTAO_CONSULTAR);
        break;
      case 'HOMOLOGANDO':
        if(this.botaoAtendeCondicoes(this.BOTAO_HOMOLOGAR, row)) result.push(this.BOTAO_HOMOLOGAR); else result.push(this.BOTAO_CONSULTAR);
        break;
      case 'ATIVO':
        if(this.botaoAtendeCondicoes(this.BOTAO_CONCLUIR, row)) result.push(this.BOTAO_CONCLUIR); else result.push(this.BOTAO_CONSULTAR);
        break;
      case 'CONCLUIDO':
        if(this.botaoAtendeCondicoes(this.BOTAO_AVALIAR, row)) result.push(this.BOTAO_AVALIAR); else result.push(this.BOTAO_CONSULTAR);
        break;
      case 'SUSPENSO':
        if(this.botaoAtendeCondicoes(this.BOTAO_REATIVAR, row)) result.push(this.BOTAO_REATIVAR); else result.push(this.BOTAO_CONSULTAR);
        break;
      case 'AVALIADO':
        if(this.botaoAtendeCondicoes(this.BOTAO_CANCELAR_AVALIACAO, row)) result.push(this.BOTAO_CANCELAR_AVALIACAO); else result.push(this.BOTAO_CONSULTAR);
        break;
    }
    return result;
  }

  public dynamicOptions(row: PlanoEntrega): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    this.linha = row;
    this.botoes.forEach(botao => {
      if(this.botaoAtendeCondicoes(botao, row)) result.push(botao);
    });
    return result;
  }

  public botaoAtendeCondicoes(botao: ToolbarButton, planoEntrega: PlanoEntrega): boolean {
    switch(botao){
      case this.BOTAO_ADERIR_OPTION:
        /*         
          (RI_PENT_2) O botão Aderir, nas linhas do grid, deverá aparecer num plano somente se:
          - o plano estiver com o status Ativo; e
          - a unidade do plano for a unidade-pai da unidade selecionada pelo usuário; e
          - se o usuário for Gestor da unidade selecionada, ou ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_ADERIR" ; e
          - se a unidade selecionada não possuir plano de entrega Ativo no mesmo período do plano em questão;
        */
        return (this.situacaoPlano(planoEntrega) == 'ATIVO' && (planoEntrega.unidade_id == this.auth.unidade?.unidade_id) && (this.auth.isGestorUnidade() || (this.auth.isLotacaoPrincipal(this.auth.unidade) && this.auth.hasPermissionTo("MOD_PENT_ADERIR"))) &&
          (this.planosEntregasAtivosUnidadeSelecionada().filter(x => this.util.intersection([{ start: x.inicio, end: x.fim! }, { start: planoEntrega.inicio, end: planoEntrega.fim! }])).length == 0));
      case this.BOTAO_ALTERAR:
        /*
          (RN_PENT_4_2) Para ALTERAR um plano de entregas:
          - o plano precisa estar com o status INCLUINDO ou HOMOLOGANDO, e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_EDT"; ou
          - o plano precisa ser válido, o usuário logado precisa possuir a capacidade "MOD_PENT_EDT_FLH", e ser gestor da unidade-pai da unidade do plano ou possuir a atribuição de HOMOLOGADOR DE PLANO DE ENTREGA para a unidade-pai da unidade do plano; (RN_PENT_1_3) ou
          - o plano precisa estar com o status ATIVO, a unidade do plano precisa ser a unidade de lotação principal do usuário logado, e ele possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL" ou "MOD_PENT_EDT_ATV_ATV"; 
         */
        let b_alt1 = ['INCLUINDO', 'HOMOLOGANDO'].includes(this.situacaoPlano(planoEntrega)) && (this.auth.isGestorUnidade(planoEntrega.unidade) || (this.auth.isLotacaoPrincipal(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_EDT")));
        let b_alt2 = this.planoEntregaDao.isValido(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_EDT_FLH") && (this.auth.isGestorUnidade(planoEntrega.unidade?.unidade_id) || this.auth.isIntegrante('HOMOLOGADOR_PLANO_ENTREGA', planoEntrega.unidade!.unidade_id!));
        let b_alt3 = this.situacaoPlano(planoEntrega) == 'ATIVO' && this.auth.isLotacaoPrincipal(planoEntrega.unidade) && this.auth.hasPermissionTo(["MOD_PENT_EDT_ATV_HOMOL","MOD_PENT_EDT_ATV_ATV"]);
        return b_alt1 || b_alt2 || b_alt3;
      case this.BOTAO_ARQUIVAR:
        /*
          (RN_PENT_4_3) Para ARQUIVAR um plano de entregas:
          - o plano precisa estar com o status AVALIADO e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_ARQ";
        */
        return this.situacaoPlano(planoEntrega) == 'AVALIADO' && (this.auth.isGestorUnidade(planoEntrega.unidade) || (this.auth.isLotacaoPrincipal(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_ARQ")));
      case this.BOTAO_AVALIAR:
        /*
          (RN_PENT_4_4) Para AVALIAR um plano de entregas:
          - o plano precisa estar com o status CONCLUIDO e o usuário logado precisa ser gestor da unidade-pai da unidade do plano, ou possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para esta unidade; ou
          - o plano precisa estar com o status CONCLUIDO, o usuário logado precisa ser gestor de alguma unidade da linha hierárquica ascendente da unidade do plano, e possuir a capacidade "MOD_PENT_AVAL_SUBORD";
        */
       let b_av1 = this.situacaoPlano(planoEntrega) == 'CONCLUIDO' && (this.auth.isGestorUnidade(planoEntrega.unidade?.unidade_id) || this.auth.isIntegrante('AVALIADOR_PLANOS_ENTREGAS', planoEntrega.unidade!.unidade_id!));
       let b_av2 = this.situacaoPlano(planoEntrega) == 'CONCLUIDO' && this.auth.isGestorLinhaAscendente(planoEntrega.unidade!) && this.auth.hasPermissionTo("MOD_PENT_AVAL_SUBORD");
       return b_av1 || b_av2;
      case this.BOTAO_CANCELAR_AVALIACAO:
        /*
          (RN_PENT_4_5) Para CANCELAR a AVALIAÇÃO de um plano de entregas:
          - o plano precisa estar com o status AVALIADO e o usuário logado precisa ser gestor da unidade-pai da unidade do plano, ou possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para esta unidade;
        */
        return this.situacaoPlano(planoEntrega) == 'AVALIADO' && (this.auth.isGestorUnidade(planoEntrega.unidade?.unidade_id) || this.auth.isIntegrante('AVALIADOR_PLANOS_ENTREGAS', planoEntrega.unidade!.unidade_id!));
      case this.BOTAO_CANCELAR_CONCLUSAO:
        /*
          (RN_PENT_4_6) Para CANCELAR a CONCLUSÃO de um plano de entregas:
          - o plano precisa estar com o status CONCLUIDO e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_CANC_CONCL";
        */
        return this.situacaoPlano(planoEntrega) == 'CONCLUIDO' && (this.auth.isGestorUnidade(planoEntrega.unidade) || (this.auth.isLotacaoPrincipal(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_CANC_CONCL")));
      case this.BOTAO_CANCELAR_HOMOLOGACAO:
          /*
            (RN_PENT_4_7) Para CANCELAR a HOMOLOGAÇÃO de um plano de entregas:
            - o plano precisa estar com o status ATIVO e o usuário logado precisa ser gestor da unidade-pai da unidade do plano, ou possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a unidade-pai da unidade do plano;
          */
          return this.situacaoPlano(planoEntrega) == 'ATIVO' && (this.auth.isGestorUnidade(planoEntrega.unidade?.unidade_id) || this.auth.isIntegrante('HOMOLOGADOR_PLANOS_ENTREGAS', planoEntrega.unidade!.unidade_id!));
      case this.BOTAO_CONCLUIR:
        /*
          (RN_PENT_4_8) Para CONCLUIR um plano de entregas:
          - o plano precisa estar com o status ATIVO e o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_CONCLUIR";
        */
        return this.situacaoPlano(planoEntrega) == 'ATIVO' && (this.auth.isGestorUnidade(planoEntrega.unidade) || (this.auth.isLotacaoPrincipal(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_CONCLUIR")));        
      case this.BOTAO_CONSULTAR:
        /*
          (RN_PENT_4_9) CONSULTAR
          - todos os participantes podem visualizar todos os planos de entrega;
        */
        return true;          
      case this.BOTAO_DESARQUIVAR:
        /*

        */
        break;          
      case this.BOTAO_EXCLUIR:
        /*
          (RN_PENT_4_10) Para EXCLUIR um plano de entregas:
          - o plano precisa estar com o status INCLUINDO ou HOMOLOGANDO; e
          - o usuário logado precisa ser gestor da unidade do plano, ou esta ser sua unidade de lotação principal e ele possuir a capacidade "MOD_PENT_EXCL";
          - se o plano não atender às condições acima, o usuário deve ser informado das razões pelas quais o plano não foi excluído;
        */
        return ['INCLUINDO', 'HOMOLOGANDO'].includes(this.situacaoPlano(planoEntrega)) && (this.auth.isGestorUnidade(planoEntrega.unidade) || (this.auth.isLotacaoPrincipal(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_EXCL")));  ;  
      case this.BOTAO_HOMOLOGAR:
        /*
          (RN_PENT_4_11) Para HOMOLOGAR um plano de entregas:
          - o plano precisa estar com o status HOMOLOGANDO e o usuário logado ser gestor da unidade-pai da unidade do plano, ou possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a unidade-pai; (RN_PENT_1_3)(RN_PENT_3_2)
        */
        return this.situacaoPlano(planoEntrega) == 'HOMOLOGANDO' && (this.auth.isGestorUnidade(planoEntrega.unidade?.unidade_id) || this.auth.isIntegrante('HOMOLOGADOR_PLANOS_ENTREGAS', planoEntrega.unidade!.unidade_id!));  
      case this.BOTAO_LIBERAR_HOMOLOGACAO:
        /*
          (RN_PENT_4_13) Para LIBERAR PARA HOMOLOGAÇÃO um plano de entregas:
          - o plano precisa estar com o status INCLUINDO e o usuário logado precisa ser gestor da unidade do plano;
        */
        return this.situacaoPlano(planoEntrega) == 'INCLUINDO' && this.auth.isGestorUnidade(planoEntrega.unidade);  
      case this.BOTAO_REATIVAR:
        /*
          (RN_PENT_4_15) Para REATIVAR um plano de entregas:
          - o plano precisa estar com o status SUSPENSO e o usuário logado precisa ser gestor da unidade do plano, ou ser gestor de alguma unidade da linha hierarquica ascendente da unidade do plano;
        */
        return this.situacaoPlano(planoEntrega) == 'SUSPENSO' && (this.auth.isGestorUnidade(planoEntrega.unidade) || this.auth.isGestorLinhaAscendente(planoEntrega.unidade!));  
      case this.BOTAO_RETIRAR_HOMOLOGACAO:
        /*
          (RN_PENT_4_14) Para RETIRAR DE HOMOLOGAÇÃO um plano de entregas:
          - o plano precisa estar com o status HOMOLOGANDO, e o usuário logado precisa ser gestor da unidade do plano;
        */
        return this.situacaoPlano(planoEntrega) == 'HOMOLOGANDO' && this.auth.isGestorUnidade(planoEntrega.unidade); 
      case this.BOTAO_SUSPENDER:
        /*
          (RN_PENT_4_16) Para SUSPENDER um plano de entregas:
          - o plano precisa estar com o status ATIVO e o usuário logado precisa ser gestor da unidade do plano, ou ser gestor de alguma unidade da linha hierarquica ascendente da unidade do plano;
        */
        return this.situacaoPlano(planoEntrega) == 'ATIVO' && (this.auth.isGestorUnidade(planoEntrega.unidade) || this.auth.isGestorLinhaAscendente(planoEntrega.unidade!));  
    }
    return false;
  }

  public arquivar(planoEntrega: PlanoEntrega) {
    this.dialog.confirm("Arquivar?", "Deseja realmente arquivar o Plano de Entregas?").then(confirm => {
      if (confirm) {
        this.dao!.arquivar(planoEntrega.id, true).then(() => {
          if (this.filter?.controls.arquivadas?.value) {
            this.grid!.query!.refreshId(planoEntrega.id);
          } else {
            (this.grid?.query || this.query!).removeId(planoEntrega.id);
          }
        }).catch(error => this.dialog.alert("Erro", "Erro ao arquivar o Plano de Entregas: " + error?.message ? error?.message : error));
      }
    });
  }

  public avaliar(planoEntrega: PlanoEntrega) {
    const self = this;
    this.dao!.avaliar(planoEntrega.id).then(function () {
      (self.grid?.query || self.query!).refreshId(planoEntrega.id);
      self.dialog.alert("Sucesso", "Avaliado com sucesso!");
    }).catch(function (error) {
      self.dialog.alert("Erro", "Erro ao avaliar: " + error?.message ? error?.message : error);
    });
    this.auth.selecionaUnidade(this.auth!.unidade!.id);
    this.checaBotaoAderirToolbar();
  }

  public cancelarAvaliacao(planoEntrega: PlanoEntrega) {
    const self = this;
    this.dialog.confirm("Cancelar avaliacao ?", "Deseja realmente cancelar a avaliação?").then(confirm => {
      if (confirm) {
        this.dao!.cancelarAvaliacao(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Cancelado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao cancelar avaliacao: " + error?.message ? error?.message : error);
        });
      }
    });
    this.auth.selecionaUnidade(this.auth!.unidade!.id);
    this.checaBotaoAderirToolbar();
  }

  public cancelarConclusao(planoEntrega: PlanoEntrega) {
    const self = this;
    this.dialog.confirm("Cancelar conclusão ?", "Deseja realmente cancelar a conclusão?").then(confirm => {
      if (confirm) {
        this.dao!.cancelarConclusao(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Cancelado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao cancelar conclusão: " + error?.message ? error?.message : error);
        });
      }
    });
    this.auth.selecionaUnidade(this.auth!.unidade!.id);
    this.checaBotaoAderirToolbar();
  }

  public cancelarHomologacao(planoEntrega: PlanoEntrega) {
    const self = this;
    this.dialog.confirm("Cancelar homologacao ?", "Deseja realmente cancelar a homologacao?").then(confirm => {
      if (confirm) {
        this.dao!.cancelarHomologacao(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Cancelado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao cancelar a homologação: " + error?.message ? error?.message : error);
        });
      }
    });
    this.auth.selecionaUnidade(this.auth!.unidade!.id);
    this.checaBotaoAderirToolbar();
  }

  public concluir(planoEntrega: PlanoEntrega) {
    const self = this;
    this.dialog.confirm("Concluir ?", "Deseja realmente concluir este Plano de Entregas?").then(confirm => {
      if (confirm) {
        this.dao!.concluir(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Concluído com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao concluir: " + error?.message ? error?.message : error);
        });
      }
    });
    this.auth.selecionaUnidade(this.auth!.unidade!.id);
    this.checaBotaoAderirToolbar();
  }

  public desarquivar(planoEntrega: PlanoEntrega) {
    this.dialog.confirm("Desarquivar ?", "Deseja realmente desarquivar o Plano de Entregas?").then(confirm => {
      if (confirm) {
        this.dao!.arquivar(planoEntrega.id, false).then(() => {
          this.grid!.query!.refreshId(planoEntrega.id);
        }).catch(error => this.dialog.alert("Erro", "Erro ao desarquivar o Plano de Entregas: " + error?.message ? error?.message : error));
      }
    });
    this.auth.selecionaUnidade(this.auth!.unidade!.id);
    this.checaBotaoAderirToolbar();
  }

  public homologar(planoEntrega: PlanoEntrega) {
    const self = this;
    this.dialog.confirm("Homologar ?", "Deseja realmente homologar este Plano de Entregas?").then(confirm => {
      if (confirm) {
        this.dao!.homologar(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Homologado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao homologar: " + error?.message ? error?.message : error);
        });
        this.auth.selecionaUnidade(this.auth!.unidade!.id);
        this.checaBotaoAderirToolbar();
      }
    });
  }

  public liberarHomologacao(planoEntrega: PlanoEntrega) {
    const self = this;
    this.dialog.confirm("Liberar para homologação ?", "Deseja realmente liberar para a homologação?").then(confirm => {
      if (confirm) {
        this.dao!.liberarHomologacao(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Liberado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao liberar para homologação: " + error?.message ? error?.message : error);
        });
      }
    });
    this.auth.selecionaUnidade(this.auth!.unidade!.id);
    this.checaBotaoAderirToolbar();
  }

  public reativar(planoEntrega: PlanoEntrega) {
    const self = this;
    this.dialog.confirm("Reativar ?", "Deseja realmente reativar este Plano de Entregas?").then(confirm => {
      if (confirm) {
        this.dao!.reativar(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Reativado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao reativar: " + error?.message ? error?.message : error);
        });
      }
    });
    this.auth.selecionaUnidade(this.auth!.unidade!.id);
    this.checaBotaoAderirToolbar();
  }

  public retirarHomologacao(planoEntrega: PlanoEntrega) {
    const self = this;
    this.dialog.confirm("Retirar da homologação ?", "Deseja realmente retirar da homologação?").then(confirm => {
      if (confirm) {
        this.dao!.retirarHomologacao(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Retirado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao retirar da homologação: " + error?.message ? error?.message : error);
        });
      }
    });
    this.auth.selecionaUnidade(this.auth!.unidade!.id);
    this.checaBotaoAderirToolbar();
  }

  public suspender(planoEntrega: PlanoEntrega) {
    const self = this;
    this.dialog.confirm("Suspender ?", "Deseja realmente suspender este Plano de Entregas?").then(confirm => {
      if (confirm) {
        this.dao!.suspender(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Suspenso com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao suspender: " + error?.message ? error?.message : error);
        });
      }
    });
    this.auth.selecionaUnidade(this.auth!.unidade!.id);
    this.checaBotaoAderirToolbar();
  }

  public situacaoPlano(planoEntrega: PlanoEntrega): string {
    if (planoEntrega.data_fim) return "EXCLUIDO";
    else if (planoEntrega.data_cancelamento) return "CANCELADO";
    else if (planoEntrega.data_arquivamento) return "ARQUIVADO";
    else return planoEntrega.status;
  }

}
