import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanoEntregaPontoControleDaoService } from 'src/app/dao/plano-entrega-ponto-controle-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PlanoEntregaPontoControle } from 'src/app/models/plano-entrega-ponto-controle.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-plano-entrega-list-ponto-controle',
  templateUrl: './plano-entrega-list-ponto-controle.component.html',
  styleUrls: ['./plano-entrega-list-ponto-controle.component.scss']
})
export class PlanoEntregaListPontoControleComponent extends PageListBase<PlanoEntregaPontoControle, PlanoEntregaPontoControleDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public form: FormGroup;
  public planoEntregaId: string = "";
  public usuarioDao: UsuarioDaoService;

  constructor(public injector: Injector) { 
    super(injector, PlanoEntregaPontoControle, PlanoEntregaPontoControleDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.title = this.lex.noun("Ponto de Controle",true);
    this.code = "MOD_PENT_PCTR_CONS";
    this.form = this.fh.FormBuilder({
      plano_entrega_id: {default: ''}
    });
    this.filter = this.fh.FormBuilder({
      gestor_id: {default: null},
      inicio: {default: ""},
      fim: {default: ""}
    });
    this.join = ['gestor:nome','tipo_avaliacao','avaliador:nome', 'entregas', 'entregas.plano_entrega_entrega'];
    // Testa se o usuário possui permissão para exibir pontos de controle
    if (this.auth.hasPermissionTo("MOD_PENT_PCTR_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir pontos de controle
    if (this.auth.hasPermissionTo("MOD_PENT_PCTR_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    } 
  }

  public ngOnInit() {
    super.ngOnInit();
    this.planoEntregaId = this.urlParams!.get("id") || "";
  }

  public filterClear(filter: FormGroup) {
    filter.controls.gestor_id.setValue(null);
    filter.controls.inicio.setValue("");
    filter.controls.fim.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    result.push(["plano_entrega_id", "==", this.planoEntregaId]);
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
    } 
    return result;
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let pontoControle: PlanoEntregaPontoControle = row as PlanoEntregaPontoControle;
    const BOTAO_INFORMACOES = { label: "Informações", hint: "Consultar o Ponto de Controle", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
    const BOTAO_ALTERAR = { label: "Editar", hint: "Editar o Ponto de Controle", icon: "bi bi-pencil-square", onClick: this.edit.bind(this) };
    const BOTAO_ALTERAR_AVALIACAO = { label: "Alterar avaliação", hint: "Alterar avaliação", icon: "bi bi-check-all", color: "btn-outline-danger", onClick: (pontoControle: PlanoEntregaPontoControle) => this.go.navigate({ route: ['gestao', 'plano-entrega', pontoControle.id, 'avaliar'] }, this.modalRefreshId(pontoControle)) };
    const BOTAO_EXCLUIR = { label: "Excluir", hint: "Excluir o Ponto de Controle", icon: "bi bi-trash", onClick: this.delete.bind(this) };
    if(this.auth.hasPermissionTo("MOD_PENT_PCTR_CONS")) result.push(BOTAO_INFORMACOES);
    if(this.auth.hasPermissionTo('MOD_PENT_PCTR_EDT')) result.push(BOTAO_ALTERAR);
    if(this.auth.hasPermissionTo('MOD_PENT_PCTR_EDT_AVAL') && pontoControle.tipo_avaliacao) result.push(BOTAO_ALTERAR_AVALIACAO);
    if(this.auth.hasPermissionTo("MOD_PENT_PCTR_EXCL")) result.push(BOTAO_EXCLUIR);
    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
    const BOTAO_AVALIAR = { label: "Avaliar", icon: "bi bi-star-half", onClick: (pontoControle: PlanoEntregaPontoControle) => this.go.navigate({ route: ['gestao', 'plano-entrega', 'ponto-controle', pontoControle.id, 'avaliar'] }, this.modalRefreshId(pontoControle)) };
    if(this.auth.hasPermissionTo('MOD_PENT_PCTR_AVAL') && this.isAvailable(row)) result.push(BOTAO_AVALIAR);
    else if(this.auth.hasPermissionTo("MOD_PENT_PCTR_CONS")) result.push(BOTAO_INFORMACOES);
    return result;
  }

    /**
   * 
   * @returns Retorna se o Ponto de Controle está em condições de ser avaliado, ou seja, não possui ainda uma avaliação
   * e está definido um gestor a ser avaliado.
   */
    public isAvailable(row: PlanoEntregaPontoControle): boolean {
      return row.tipo_avaliacao_id == null && row.gestor_id != null;
    }


}
