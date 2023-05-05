import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-plano-entrega-list',
  templateUrl: './plano-entrega-list.component.html',
  styleUrls: ['./plano-entrega-list.component.scss']
})
export class PlanoEntregaListComponent extends PageListBase<PlanoEntrega, PlanoEntregaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public unidadeDao: UnidadeDaoService;
  public planejamentoDao: PlanejamentoDaoService;
  public cadeiaValorDao: CadeiaValorDaoService;

  constructor(public injector: Injector) {
    super(injector, PlanoEntrega, PlanoEntregaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.planejamentoDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.cadeiaValorDao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
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
    this.join = ['planejamento:id,nome', 'cadeiaValor:id,nome', 'unidade:id,sigla'];
    this.groupBy = [{ field: "unidade.sigla", label: "Unidade" }];

    // Testa se o usuário possui permissão para exibir planos de entrega
/*     if (this.auth.hasPermissionTo("MOD_PENT_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    } */
    // Testa se o usuário possui permissão para excluir planos de entrega
/*     if (this.auth.hasPermissionTo("MOD_PENT_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    } */
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

/*   public dynamicOptions(row: any): ToolbarButton[] {
    //let result: ToolbarButton[] = [];
    //let planoEntrega: PlanoEntrega = row as PlanoEntrega;
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
    const BOTAO_ALTERAR = { label: "Editar", icon: "bi bi-pencil-square", onClick: this.edit.bind(this) };
    const BOTAO_EXCLUIR = { label: "Excluir Plano", icon: "bi bi-trash", onClick: this.delete.bind(this) };
    //const BOTAO_ENTREGAS = { hint: "Entregas", icon: "bi bi-pen", onClick: this.editarEntregas.bind(this) };
    const BOTAO_HOMOLOGAR = { label: "Homologar", icon: "bi bi-file-earmark-check", onClick: this.homologar.bind(this) };
    if (this.auth.hasPermissionTo("MOD_PENT_CONS")) result.push(BOTAO_INFORMACOES);
    if (this.auth.hasPermissionTo('MOD_PENT_EDT')) result.push(BOTAO_ALTERAR);
    if (this.auth.hasPermissionTo("MOD_PENT_EXCL")) result.push(BOTAO_EXCLUIR);
    if (this.dao?.needHomologate(planoEntrega)) result.push(BOTAO_HOMOLOGAR);
    return result;
  } */

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
    const isGestor = this.auth.usuario?.id == planoEntrega.unidade?.gestor_id || this.auth.usuario?.id == planoEntrega.unidade?.gestor_substituto_id;
    const BOTAO_LIBERAR_HOMOLOGACAO = { label: "Liberar para homologação", icon: "bi bi-skip-end-circle", onClick: this.liberarHomologacao.bind(this) };
    const BOTAO_HOMOLOGAR = { label: "Homologar", icon: "bi bi-check-circle", onClick: this.homologar.bind(this) };
    const BOTAO_ALTERAR = { label: "Alterar", icon: "bi bi-pencil-square", onClick: (planoEntrega: PlanoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'edit'] }, this.modalRefreshId(planoEntrega)) };
    const BOTAO_CONCLUIR = { label: "Concluir", id: "CONCLUIDO", icon: "bi bi-check-circle", onClick: this.concluir.bind(this) };
    const BOTAO_CANCELAR_CONCLUSAO = { label: "Cancelar conclusão", icon: "bi bi-backspace", onClick: this.cancelarConclusao.bind(this) };
    const BOTAO_AVALIAR = { label: "Avaliar", icon: "bi bi-star-half", onClick: this.avaliar.bind(this) };
    const BOTAO_REATIVAR = { label: "Reativar", icon: "bi bi-stickies", onClick: this.reativar.bind(this) };
    const BOTAO_CANCELAR_AVALIACAO = { label: "Cancelar avaliação", icon: "bi bi-backspace", onClick: this.cancelarAvaliacao.bind(this) };
    const BOTAO_CONSULTAR = { label: "Informações", icon: "bi bi-info-circle", onClick: (planoEntrega: PlanoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'consult'] }, { modal: true }) };
    
    if (planoEntrega.metadados?.incluindo && this.auth.hasPermissionTo("MOD_PENT_LIB_HOMOL")) { result.push(BOTAO_LIBERAR_HOMOLOGACAO);
    } else if (planoEntrega.metadados?.homologando) { 
      if (isGestor) result.push(BOTAO_HOMOLOGAR); else { this.auth.hasPermissionTo("MOD_PENT_EDT") ? result.push(BOTAO_ALTERAR) : result.push(BOTAO_CONSULTAR); };
    } else if (planoEntrega.metadados?.ativo && this.auth.hasPermissionTo("MOD_PENT_CONCLUIR")) { result.push(BOTAO_CONCLUIR);
    } else if (planoEntrega.metadados?.concluido) {
      if (isGestor) result.push(BOTAO_AVALIAR); else { this.auth.hasPermissionTo("MOD_PENT_CANC_CONCL") ? result.push(BOTAO_CANCELAR_CONCLUSAO) : result.push(BOTAO_CONSULTAR); };
    } else if (planoEntrega.metadados?.suspenso) { this.auth.hasPermissionTo("MOD_PENT_REATIVAR") ? result.push(BOTAO_REATIVAR) : result.push(BOTAO_CONSULTAR);
    } else if (planoEntrega.metadados?.avaliado) {
      if (isGestor) result.push(BOTAO_CANCELAR_AVALIACAO); else result.push(BOTAO_CONSULTAR);
    }
    return result;
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let planoEntrega: PlanoEntrega = row as PlanoEntrega;
    const isGestor = this.auth.usuario?.id == planoEntrega.unidade?.gestor_id || this.auth.usuario?.id == planoEntrega.unidade?.gestor_substituto_id;
    const BOTAO_ALTERAR = { label: "Alterar", icon: "bi bi-pencil-square", onClick: (planoEntrega: PlanoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'edit'] }, this.modalRefreshId(planoEntrega)) };
    const BOTAO_EXCLUIR: ToolbarButton = { label: "Excluir", icon: "bi bi-trash", onClick: this.delete.bind(this) };
    const BOTAO_SUSPENDER = { label: "Suspender", id: "PAUSADO", icon: "bi bi-pause-circle", onClick: (planoEntrega: PlanoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'suspender'] }, this.modalRefreshId(planoEntrega)) };
    const BOTAO_RETIRAR_HOMOLOGACAO = { label: "Retirar de homologação", icon: "bi bi-backspace", onClick: this.retirarHomologacao.bind(this) };
    const BOTAO_CANCELAR_HOMOLOGACAO = { label: "Cancelar homologação", icon: "bi bi-check-all", onClick: this.cancelarHomologacao.bind(this) };
    const BOTAO_ARQUIVAR = { label: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
    const BOTAO_DESARQUIVAR = { label: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };
    const BOTAO_CONSULTAR: ToolbarButton = { label: "Informações", icon: "bi bi-info-circle", onClick: (planoEntrega: PlanoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'consult'] }, { modal: true }) };

    result.push(BOTAO_CONSULTAR);
    if(this.auth.hasPermissionTo("MOD_PENT_EXCL")) result.push(BOTAO_EXCLUIR);
    if (planoEntrega.metadados?.arquivado) { if(this.auth.hasPermissionTo("MOD_PENT_DESARQ")) result.push(BOTAO_DESARQUIVAR);
    } else if (planoEntrega.metadados?.incluindo) { if(this.auth.hasPermissionTo("MOD_PENT_EDT")) result.push(BOTAO_ALTERAR);
    } else if (planoEntrega.metadados?.homologando) { if(this.auth.hasPermissionTo("MOD_PENT_RET_HOMOL")) result.push(BOTAO_RETIRAR_HOMOLOGACAO);
    } else if (planoEntrega.metadados?.ativo) { 
      if(this.auth.hasPermissionTo("MOD_PENT_SUSP")) result.push(BOTAO_SUSPENDER);
      if (isGestor) result.push(BOTAO_CANCELAR_HOMOLOGACAO);
    } else if (planoEntrega.metadados?.avaliado) {
      if (!planoEntrega.metadados?.arquivado && this.auth.hasPermissionTo("MOD_PENT_ARQ")) result.push(BOTAO_ARQUIVAR);
    }
    return result;
  }

  public homologar(planoEntrega: PlanoEntrega){
    const self = this;
        this.dao!.homologar(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Homologado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao homologar: " + error?.message ? error?.message : error);
        });
  }

  public concluir(planoEntrega: PlanoEntrega){
    const self = this;
        this.dao!.concluir(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Concluído com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao concluir: " + error?.message ? error?.message : error);
        });
  }

  public avaliar(planoEntrega: PlanoEntrega){
    const self = this;
        this.dao!.avaliar(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Avaliado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao avaliar: " + error?.message ? error?.message : error);
        });
  }

  public reativar(planoEntrega: PlanoEntrega){
    const self = this;
        this.dao!.reativar(planoEntrega.id).then(function () {
          (self.grid?.query || self.query!).refreshId(planoEntrega.id);
          self.dialog.alert("Sucesso", "Reativado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao reativar: " + error?.message ? error?.message : error);
        });
  }

  public liberarHomologacao(planoEntrega: PlanoEntrega){
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

  public retirarHomologacao(planoEntrega: PlanoEntrega){
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

  public arquivar(planoEntrega: PlanoEntrega){
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
    this.dao!.arquivar(planoEntrega.id, false).then(() => {
      this.grid!.query!.refreshId(planoEntrega.id);
    }).catch(error => this.dialog.alert("Erro", "Erro ao desarquivar o Plano de Entregas: " + error?.message ? error?.message : error));
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
}
