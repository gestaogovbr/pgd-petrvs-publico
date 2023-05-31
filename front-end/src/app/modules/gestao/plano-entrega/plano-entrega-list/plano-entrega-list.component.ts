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
  public unidadeDao: UnidadeDaoService;
  public planoEntregaDao: PlanoEntregaDaoService;
  public planejamentoDao: PlanejamentoDaoService;
  public cadeiaValorDao: CadeiaValorDaoService;
  public unidadeSelecionada: Unidade;
  public habilitarAdesaoToolbar: boolean = false;
  public toolbarButtons: ToolbarButton[] = [];
  public BOTAO_ADERIR: ToolbarButton;

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
      nome: { default: '' },
      inicio: { default: '' },
      fim: { default: '' },
      //status: {default: ''},
      unidade_id: { default: null },
      planejamento_id: { default: null },
      cadeia_valor_id: { default: null },
    });
    this.join = ['planejamento:id,nome', 'cadeiaValor:id,nome', 'unidade:id,sigla,path', 'entregas.entrega', 'entregas.unidade'];
    this.groupBy = [{ field: "unidade.sigla", label: "Unidade" }];
    this.BOTAO_ADERIR = {
      label: "Aderir",
      disabled: !this.habilitarAdesaoToolbar,
      icon: this.entityService.getIcon("Adesao"),
      onClick: () => {
        this.loading = true;
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'adesao'] });
      }
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.checaBotaoAderirToolbar();
    this.toolbarButtons.push(this.BOTAO_ADERIR);
  }

  ngAfterContentChecked(): void {
    if(this.auth.unidade != this.unidadeSelecionada){
      this.unidadeSelecionada = this.auth.unidade!;
      this.checaBotaoAderirToolbar();
      this.cdRef.detectChanges();
    }
  }

  public checaBotaoAderirToolbar(){
    //let planos_ativos_unidade_pai = this.unidadeDao.planosEntregasAtivos(this.auth.unidade?.unidade_id || '').map(x => x.id);
    let planos_ativos_unidade_pai = this.planosEntregasAtivosUnidadePai().map(x => x.id);
    let planos_superiores_vinculados_pela_unidade_selecionada = this.planosEntregasAtivosUnidadeSelecionada().map(x => x.plano_entrega_id).filter(x => x != null);
    let condition1 = this.isGestorUnidadeSelecionada() || this.auth.isGestorUnidade(this.auth.unidade?.unidade_id) || (this.unidadeSelecionadaLotacaoPrincipal() && this.auth.hasPermissionTo("MOD_PENT_ADERIR"));
    let condition2 = !!planos_ativos_unidade_pai.filter(x => !planos_superiores_vinculados_pela_unidade_selecionada.includes(x)).length;
    this.habilitarAdesaoToolbar = condition1 && condition2;
    //this.habilitarAdesaoToolbar = true;
    this.BOTAO_ADERIR.disabled = !this.habilitarAdesaoToolbar;
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
    return this.auth.unidade?.planos_entregas?.filter(x => this.planoEntregaDao.isAtivo(x)) || [];
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.inicio.setValue(null);
    filter.controls.fim.setValue(null);
    //filter.controls.status.setValue("");
    filter.controls.unidade_id.setValue(null);
    filter.controls.planejamento_id.setValue(null);
    filter.controls.cadeia_valor_id.setValue(null);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

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
    return result;
  }

  public onAgruparChange(event: Event) {
    const agrupar = this.filter!.controls.agrupar.value;
    if ((agrupar && !this.groupBy?.length) || (!agrupar && this.groupBy?.length)) {
      this.groupBy = agrupar ? [{ field: "unidade.sigla", label: "Unidade" }] : [];
      this.grid!.reloadFilter();
    }
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let planoEntrega: PlanoEntrega = row as PlanoEntrega;
    const BOTAO_LIBERAR_HOMOLOGACAO = { label: "Liberar para homologação", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "HOMOLOGANDO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "HOMOLOGANDO"), onClick: this.liberarHomologacao.bind(this) };
    const BOTAO_HOMOLOGAR = { label: "Homologar", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"), onClick: this.homologar.bind(this) };
    const BOTAO_ALTERAR = { label: "Alterar", icon: "bi bi-pencil-square", onClick: (planoEntrega: PlanoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'edit'] }, this.modalRefreshId(planoEntrega)) };
    const BOTAO_CONCLUIR = { label: "Concluir", id: "CONCLUIDO", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"), onClick: this.concluir.bind(this) };
    const BOTAO_CANCELAR_CONCLUSAO = { label: "Cancelar conclusão", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"), onClick: this.cancelarConclusao.bind(this) };
    const BOTAO_AVALIAR = { label: "Avaliar", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "AVALIADO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "AVALIADO"), onClick: this.avaliar.bind(this) };
    const BOTAO_REATIVAR = { label: "Reativar", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"), onClick: this.reativar.bind(this) };
    const BOTAO_CANCELAR_AVALIACAO = { label: "Cancelar avaliação", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"), onClick: this.cancelarAvaliacao.bind(this) };
    const BOTAO_CONSULTAR = { label: "Informações", icon: "bi bi-info-circle", onClick: (planoEntrega: PlanoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'consult'] }, { modal: true }) };
    
    switch (this.situacaoPlano(planoEntrega)) {
      case 'INCLUINDO':
        if(this.isGestorUnidadePlano(planoEntrega) || (this.unidadePlanoLotacaoPrincipal(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_LIB_HOMOL"))) {
          result.push(BOTAO_LIBERAR_HOMOLOGACAO); 
        } else if(this.isGestorLinhaAscendente(planoEntrega) || this.isLotadoUnidadePlano(planoEntrega)) {
          result.push(BOTAO_CONSULTAR);
        };
        break;
      case 'HOMOLOGANDO':
        if (this.isGestorUnidadePaiPlano(planoEntrega) || (this.isLotadoUnidadePai(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_HOMOL_SUBORD"))) {
          result.push(BOTAO_HOMOLOGAR); 
        } else if(this.isGestorUnidadePlano(planoEntrega) || (this.unidadePlanoLotacaoPrincipal(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_EDT"))){ 
          result.push(BOTAO_ALTERAR); 
        } else if(this.isGestorLinhaAscendente(planoEntrega) || this.isLotadoUnidadePlano(planoEntrega)) {
          result.push(BOTAO_CONSULTAR);
        };
        break;
      case 'ATIVO':
        if(this.isGestorUnidadePlano(planoEntrega) || (this.unidadePlanoLotacaoPrincipal(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_CONCLUIR"))) {
          result.push(BOTAO_CONCLUIR); 
        } else if(this.isGestorLinhaAscendente(planoEntrega) || this.isLotadoUnidadePlano(planoEntrega)) {
          result.push(BOTAO_CONSULTAR);
        }
        break;
      case 'CONCLUIDO':
        if (this.isGestorUnidadePaiPlano(planoEntrega) || (this.isLotadoLinhaAscendente(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_AVAL_SUBORD"))) {
          result.push(BOTAO_AVALIAR); 
        } else if(this.isGestorUnidadePlano(planoEntrega) || (this.unidadePlanoLotacaoPrincipal(planoEntrega) && this.auth.hasPermissionTo("MOD_CANC_CONCL"))){ 
          result.push(BOTAO_CANCELAR_CONCLUSAO); 
        };
        break;
      case 'SUSPENSO':
        if(this.isGestorUnidadePlano(planoEntrega) || (this.unidadePlanoLotacaoPrincipal(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_REATIVAR"))) {
          result.push(BOTAO_REATIVAR); 
        };
        break;
      case 'AVALIADO':
        if(this.isGestorUnidadePaiPlano(planoEntrega) || (this.isLotadoLinhaAscendente(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_CANC_AVAL_SUBORD"))) {
          result.push(BOTAO_CANCELAR_AVALIACAO); 
        } else if(this.isGestorLinhaAscendente(planoEntrega) || this.isLotadoUnidadePlano(planoEntrega)) {
          result.push(BOTAO_CONSULTAR);
        }
        break;
    }
    return result;
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let planoEntrega: PlanoEntrega = row as PlanoEntrega;
    this.BOTAO_ADERIR.onClick = () => {
      this.loading = true;
      this.go.navigate({ route: ['gestao', 'plano-entrega', 'adesao'] }, { metadata: planoEntrega });
    }
    const BOTAO_ALTERAR = { label: "Alterar", icon: "bi bi-pencil-square", onClick: (planoEntrega: PlanoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'edit'] }, this.modalRefreshId(planoEntrega)) };
    const BOTAO_EXCLUIR: ToolbarButton = { label: "Excluir", icon: "bi bi-trash", onClick: this.delete.bind(this) };
    const BOTAO_SUSPENDER = { label: "Suspender", id: "PAUSADO", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "SUSPENSO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "SUSPENSO"), onClick: this.suspender.bind(this) };
    const BOTAO_RETIRAR_HOMOLOGACAO = { label: "Retirar de homologação", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "INCLUINDO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "INCLUINDO"), onClick: this.retirarHomologacao.bind(this) };
    const BOTAO_CANCELAR_HOMOLOGACAO = { label: "Cancelar homologação", icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "HOMOLOGANDO"), color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "HOMOLOGANDO"), onClick: this.cancelarHomologacao.bind(this) };
    const BOTAO_CANCELAR = { label: "Cancelar", icon: "bi bi-dash-circle", onClick: this.cancelar.bind(this) };
    const BOTAO_ARQUIVAR = { label: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
    const BOTAO_DESARQUIVAR = { label: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };
    const BOTAO_CONSULTAR: ToolbarButton = { label: "Informações", icon: "bi bi-info-circle", onClick: (planoEntrega: PlanoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'consult'] }, { modal: true }) };
    
    result.push(BOTAO_EXCLUIR); 
    
    switch (this.situacaoPlano(planoEntrega)) {
      case 'INCLUINDO':
        if(this.isGestorUnidadePlano(planoEntrega) || (this.unidadePlanoLotacaoPrincipal(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_EDT"))) {
          result.push(BOTAO_ALTERAR); 
        } else if(this.isGestorLinhaAscendente(planoEntrega) || this.isLotadoUnidadePlano(planoEntrega)) {
          result.push(BOTAO_CONSULTAR);
        };
        break;
      case 'HOMOLOGANDO':
        if (this.isPlanoProprio(planoEntrega) && (this.isGestorUnidadePlano(planoEntrega) || (this.unidadePlanoLotacaoPrincipal(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_RET_HOMOL")))) {
          result.push(BOTAO_RETIRAR_HOMOLOGACAO); 
        } else if(this.isPlanoVinculado(planoEntrega) && (this.isGestorUnidadePlano(planoEntrega) || (this.unidadePlanoLotacaoPrincipal(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_EXCL")))) { 
          result.push(BOTAO_EXCLUIR); 
        };
        break;
      case 'ATIVO':
        if(this.isGestorUnidadePaiPlano(planoEntrega) || (this.isLotadoLinhaAscendente(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_CANC_HOMOL_SUBORD"))) {
          result.push(BOTAO_CANCELAR_HOMOLOGACAO); 
        } else if(this.isGestorUnidadePlano(planoEntrega) || (this.unidadePlanoLotacaoPrincipal(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_SUSP"))) {
          result.push(BOTAO_SUSPENDER);
        };
        //-->(RN_PENT_6)
        if((planoEntrega.unidade_id == this.auth.unidade?.unidade_id) && (this.isGestorUnidadeSelecionada() || (this.unidadeSelecionadaLotacaoPrincipal() && this.auth.hasPermissionTo("MOD_PENT_ADERIR"))) && 
          (this.planosEntregasAtivosUnidadeSelecionada().filter(x => this.util.intersection([{start: x.inicio, end: x.fim!},{start: planoEntrega.inicio, end: planoEntrega.fim!}])).length == 0)){
            result.push(this.BOTAO_ADERIR);
        };
        //<--
        break;
      case 'CONCLUIDO':
        break;
      case 'SUSPENSO':
        break;
      case 'AVALIADO':
        if(this.isGestorUnidadePlano(planoEntrega) || (this.unidadePlanoLotacaoPrincipal(planoEntrega) && this.auth.hasPermissionTo("MOD_PENT_ARQ"))) {
          result.push(BOTAO_ARQUIVAR); 
        };
        break;
      case 'ARQUIVADO':
        break;
    }
    return result;
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
      }
    });

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

  }

  public avaliar(planoEntrega: PlanoEntrega) {
    const self = this;
    this.dao!.avaliar(planoEntrega.id).then(function () {
      (self.grid?.query || self.query!).refreshId(planoEntrega.id);
      self.dialog.alert("Sucesso", "Avaliado com sucesso!");
    }).catch(function (error) {
      self.dialog.alert("Erro", "Erro ao avaliar: " + error?.message ? error?.message : error);
    });
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

  }

  public cancelar(planoEntrega: PlanoEntrega) {
    const self = this;
    this.dialog.confirm("Cancelar ?", "Deseja realmente cancelar este Plano de Entregas?").then(confirm => {
      if (confirm) {
        this.dao!.cancelar(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Cancelado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao cancelar: " + error?.message ? error?.message : error);
        });
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

  public desarquivar(planoEntrega: PlanoEntrega) {
    this.dialog.confirm("Desarquivar ?", "Deseja realmente desarquivar o Plano de Entregas?").then(confirm => {
      if (confirm) {
        this.dao!.arquivar(planoEntrega.id, false).then(() => {
          this.grid!.query!.refreshId(planoEntrega.id);
        }).catch(error => this.dialog.alert("Erro", "Erro ao desarquivar o Plano de Entregas: " + error?.message ? error?.message : error));
      }
    });
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
  }

  public isGestorLinhaAscendente(planoEntrega: PlanoEntrega): boolean {
    return this.auth.isGestorLinhaAscendente(planoEntrega.unidade!);
  }

  public isGestorUnidadeSelecionada(): boolean {
    return this.auth.isGestorUnidade();
  }

  public isGestorUnidadePaiPlano(planoEntrega: PlanoEntrega): boolean {
    return this.auth.isGestorUnidade(planoEntrega.unidade?.unidade_id)
  }

  public isGestorUnidadePlano(planoEntrega: PlanoEntrega): boolean {
    return this.auth.isGestorUnidade(planoEntrega.unidade)
  }

  public isLotadoLinhaAscendente(planoEntrega: PlanoEntrega): boolean {
    return this.auth.isLotadoNaLinhaAscendente(planoEntrega.unidade!);
  }

  public isLotadoUnidadePai(planoEntrega: PlanoEntrega): boolean {
    return !!this.auth.hasLotacao(planoEntrega.unidade!.unidade_id!);
  }
  
  public isLotadoUnidadePlano(planoEntrega: PlanoEntrega): boolean {
    return !!this.auth.hasLotacao(planoEntrega.unidade_id);
  }

  public isPlanoProprio(planoEntrega: PlanoEntrega): boolean {
    return planoEntrega.plano_entrega_id == null;
  }

  public isPlanoVinculado(planoEntrega: PlanoEntrega): boolean {
    return !this.isPlanoProprio(planoEntrega);
  }

  public unidadeSelecionadaLotacaoPrincipal(): boolean {
    return this.auth.isLotacaoPrincipal(this.auth.unidade)
  }

  public unidadePlanoLotacaoPrincipal(planoEntrega: PlanoEntrega): boolean {
    return this.auth.isLotacaoPrincipal(planoEntrega.unidade)
  }

  public situacaoPlano(planoEntrega: PlanoEntrega): string {
    if(planoEntrega.data_fim) return "EXCLUIDO"; 
    else if(planoEntrega.data_cancelamento) return "CANCELADO";
    else if(planoEntrega.data_arquivamento) return "ARQUIVADO";
    else return planoEntrega.status;
  }
  
}
