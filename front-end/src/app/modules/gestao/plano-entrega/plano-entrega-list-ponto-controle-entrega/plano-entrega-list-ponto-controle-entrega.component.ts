import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanoEntregaPontoControleDaoService } from 'src/app/dao/plano-entrega-ponto-controle-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PlanoEntregaPontoControle } from 'src/app/models/plano-entrega-ponto-controle.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-plano-entrega-list-ponto-controle-entrega',
  templateUrl: './plano-entrega-list-ponto-controle-entrega.component.html',
  styleUrls: ['./plano-entrega-list-ponto-controle-entrega.component.scss']
})
export class PlanoEntregaListPontoControleEntregaComponent extends PageListBase<PlanoEntregaPontoControle, PlanoEntregaPontoControleDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) { 
    super(injector, PlanoEntregaPontoControle, PlanoEntregaPontoControleDaoService);
    this.code = "MOD_PENT_PCTR_AVAL";
    this.join = ['gestor:nome','tipoAvaliacao','avaliador:nome'];
  }

  public filterClear(filter: FormGroup) {
/*     filter.controls.gestor_id.setValue(null);
    filter.controls.inicio.setValue("");
    filter.controls.fim.setValue(""); */
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
/*     result.push(["plano_entrega_id", "==", this.planoEntregaId]);
    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome + "%"]);
    }
    if(form.inicio) {
      result.push(["inicio", ">=", form.inicio]);
    }
    if(form.fim) {
      result.push(["fim", "<=", form.fim]);
    }  
    if(form.gestor_id) {
      result.push(["gestor_id", "==", form.gestor_id]);
    } */ 
    return result;
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
/*     let planoEntrega: PlanoEntrega = row as PlanoEntrega;
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
    const BOTAO_ALTERAR = { label: "Editar", icon: "bi bi-pencil-square", onClick: this.edit.bind(this) };
    const BOTAO_EXCLUIR = { label: "Excluir Plano", icon: "bi bi-trash", onClick: this.delete.bind(this) };
    //const BOTAO_ENTREGAS = { hint: "Entregas", icon: "bi bi-pen", onClick: this.editarEntregas.bind(this) };
    const BOTAO_HOMOLOGAR = { label: "Homologar", icon: "bi bi-file-earmark-check", onClick: this.homologar.bind(this) };
    const BOTAO_PONTOS_CONTROLE = { label: "Pontos de Controle", icon: "bi bi-file-earmark-check", onClick: ((row: PlanoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', row.id, 'ponto-controle' ] })).bind(this) };
    if(this.auth.hasPermissionTo("MOD_PENT_CONS")) result.push(BOTAO_INFORMACOES);
    if(this.auth.hasPermissionTo('MOD_PENT_EDT')) result.push(BOTAO_ALTERAR);
    if(this.auth.hasPermissionTo("MOD_PENT_EXCL")) result.push(BOTAO_EXCLUIR);
    if(this.auth.hasPermissionTo("MOD_PENT_PCTR_CONS")) result.push(BOTAO_PONTOS_CONTROLE);
    if(this.dao?.needHomologate(planoEntrega)) result.push(BOTAO_HOMOLOGAR); */
    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    //let planoEntregaPontoControle: PlanoEntregaPontoControle = row as PlanoEntregaPontoControle;
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
    const BOTAO_AVALIAR = { label: "Avaliar", icon: "bi bi-star-half", onClick: (pontoControle: PlanoEntregaPontoControle) => this.go.navigate({ route: ['gestao', 'plano-entrega', 'ponto-controle', pontoControle.id, 'avaliar'] }, this.modalRefreshId(pontoControle)) };
/*     if(this.auth.hasPermissionTo('MOD_PENT_PCTR_AVAL') && this.isAvailable(row)) result.push(BOTAO_AVALIAR);
    else if(this.auth.hasPermissionTo("MOD_PENT_PCTR_CONS")) result.push(BOTAO_INFORMACOES); */
    return result;
  }


}
