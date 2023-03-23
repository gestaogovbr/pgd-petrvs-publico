import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PlanoEntregaPontoControleDaoService } from 'src/app/dao/plano-entrega-ponto-controle-dao.service';
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

  constructor(public injector: Injector) { 
    super(injector, PlanoEntregaPontoControle, PlanoEntregaPontoControleDaoService);
    this.title = this.lex.noun("Ponto de Controle",true);
    this.code = "MOD_PENT_PCTR_CONS";
    //this.modalWidth = 1000;
    this.form = this.fh.FormBuilder({
      plano_entrega_id: {default: ''}
    });
    this.filter = this.fh.FormBuilder({
    });
    this.join = ['gestor:nome','tipoAvaliacao','avaliador:nome'];
    //this.orderBy = [['tipo_avaliacao.nota', 'asc']];
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
    //filter.controls.nome.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    result.push(["plano_entrega_id", "==", this.planoEntregaId]);
    /*if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome + "%"]);
    }*/
    return result;
  }


}
