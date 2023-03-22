import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {GridComponent} from "../../../../components/grid/grid.component";
import {PageListBase} from "../../../base/page-list-base";
import {Entrega} from "../../../../models/entrega.model";
import {EntregaDaoService} from "../../../../dao/entrega-dao.service";
import {FormGroup} from "@angular/forms";
import {Macroprocesso} from "../../../../models/macroprocesso.model";
import {MacroprocessoDaoService} from "../../../../dao/macroprocesso-dao.service";

@Component({
  selector: 'macroprocesso-list',
  templateUrl: './macroprocesso-list.component.html',
  styleUrls: ['./macroprocesso-list.component.scss']
})
export class MacroprocessoListComponent extends PageListBase<Macroprocesso, MacroprocessoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, Macroprocesso, MacroprocessoDaoService);
    /* Inicializações */
    this.title = this.lex.noun('Macroprocesso',true);
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
    });
    // Testa se o usuário possui permissão para exibir dados de entrega
    if (this.auth.hasPermissionTo("MOD_ENTRG_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir a entrega
    if (this.auth.hasPermissionTo("MOD_ENTRG_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome + "%"]);
    }

    return result;
  }

}
