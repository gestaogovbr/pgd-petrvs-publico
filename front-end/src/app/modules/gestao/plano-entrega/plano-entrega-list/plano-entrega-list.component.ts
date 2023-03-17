import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-plano-entrega-list',
  templateUrl: './plano-entrega-list.component.html',
  styleUrls: ['./plano-entrega-list.component.scss']
})
export class PlanoEntregaListComponent extends PageListBase<PlanoEntrega, PlanoEntregaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, PlanoEntrega, PlanoEntregaDaoService);
    /* Inicializações */
    this.title = 'Planos de Entrega';
    this.filter = this.fh.FormBuilder({

    });
    this.join = ['planejamento:nome','cadeiaValor:nome'];
    this.groupBy = [];
    // Testa se o usuário possui permissão para exibir planos de entrega
    if (this.auth.hasPermissionTo("MOD_PENT_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir planos de entrega
    if (this.auth.hasPermissionTo("MOD_PENT_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    } 
   }

   public filterClear(filter: FormGroup) {
/*     filter.controls.nome.setValue("");
    filter.controls.inicio.setValue(null);
    filter.controls.fim.setValue(null);
    filter.controls.unidade_id.setValue(null);
    filter.controls.so_entidade.setValue(false); */
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    return result;
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let planoEntrega: PlanoEntrega = row as PlanoEntrega;
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
    const BOTAO_ALTERAR = { label: "Editar", icon: "bi bi-pencil-square", onClick: this.edit.bind(this) };
    const BOTAO_EXCLUIR = { label: "Excluir Plano", icon: "bi bi-trash", onClick: this.delete.bind(this) };
    const BOTAO_ENTREGAS = { hint: "Entregas", icon: "bi bi-pen", onClick: this.editarEntregas.bind(this) };
    const BOTAO_HOMOLOGAR = { label: "Homologar", icon: "bi bi-file-earmark-check", onClick: this.homologar.bind(this) };
    const BOTAO_AVALIAR = { label: "Ponto de Controle", icon: "bi bi-file-earmark-check", onClick: this.avaliar.bind(this) };
    if(this.auth.hasPermissionTo("MOD_PENT_CONS")) result.push(BOTAO_INFORMACOES);
    if(this.auth.hasPermissionTo('MOD_PENT_EDT')) result.push(BOTAO_ALTERAR);
    if(this.auth.hasPermissionTo("MOD_PENT_EXCL")) result.push(BOTAO_EXCLUIR);
    if(this.auth.hasPermissionTo("MOD_PENT_AVAL")) result.push(BOTAO_AVALIAR);
    if(this.dao?.needHomologate(planoEntrega)) result.push(BOTAO_HOMOLOGAR);
    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let planoEntrega: PlanoEntrega = row as PlanoEntrega;
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
    const BOTAO_ALTERAR = { label: "Editar", icon: "bi bi-pencil-square", onClick: this.edit.bind(this) };
    if(this.auth.hasPermissionTo('MOD_PENT_EDT')) result.push(BOTAO_ALTERAR);
    else if(this.auth.hasPermissionTo("MOD_PENT_CONS")) result.push(BOTAO_INFORMACOES);
    return result;
  }

  public editarEntregas(){

  }

  public homologar(){

  }

  public avaliar(){

  }

}
