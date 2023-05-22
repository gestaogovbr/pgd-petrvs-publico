import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'plano-entrega-list-entrega',
  templateUrl: './plano-entrega-list-entrega.component.html',
  styleUrls: ['./plano-entrega-list-entrega.component.scss']
})
export class PlanoEntregaListEntregaComponent extends PageListBase<PlanoEntregaEntrega, PlanoEntregaEntregaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public planoEntregaId: string = "";

  constructor(public injector: Injector) { 
    super(injector, PlanoEntregaEntrega, PlanoEntregaEntregaDaoService);
    this.title = this.lex.noun("Entrega");
    this.code = "MOD_PENT_CONS";
    this.filter = this.fh.FormBuilder({
      plano_entrega_id: {default: null},
    });
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

  public ngOnInit() {
    super.ngOnInit();
    this.planoEntregaId = this.urlParams!.get("id") || "";
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    result.push(["plano_entrega_id", "==", this.planoEntregaId]);
    return result;
  }

}
