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
    this.title = 'Planos de Entrega';
    this.filter = this.fh.FormBuilder({
      agrupar: {default: true},
      nome: {default: ''},
      inicio: {default: ''},
      fim: {default: ''},
      //status: {default: ''},
      unidade_id: {default: null},
      planejamento_id: {default: null},
      cadeia_valor_id: {default: null},
    });
    this.join = ['planejamento:nome','cadeiaValor:nome','unidade:sigla'];
    this.groupBy = [{field: "unidade.sigla", label: "Unidade"}];
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

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome + "%"]);
    }
    if(form.inicio) {
      result.push(["inicio", ">=", form.inicio]);
    }
    if(form.fim) {
      result.push(["fim", "<=", form.fim]);
    }  
    if(form.unidade_id) {
      result.push(["unidade_id", "==", form.unidade_id]);
    }  
    if(form.planejamento_id) {
      result.push(["planejamento_id", "==", form.planejamento_id]);
    }
    if(form.cadeia_valor_id) {
      result.push(["cadeia_valor_id", "==", form.cadeia_valor_id]);
    } 
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

  public onAgruparChange(event: Event) {
    const agrupar = this.filter!.controls.agrupar.value;
    if((agrupar && !this.groupBy?.length) || (!agrupar && this.groupBy?.length)) {
      this.groupBy = agrupar ? [{field: "unidade.sigla", label: "Unidade"}] : [];
      this.grid!.reloadFilter();
    }
  }

  public editarEntregas(){

  }

  public homologar(){

  }

  public avaliar(){

  }

}
