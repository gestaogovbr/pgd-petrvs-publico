import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { Cargo } from 'src/app/models/cargo.model';
import { CargoDaoService } from 'src/app/dao/cargo-dao.service';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.scss']
})
export class CargoListComponent extends PageListBase<Cargo, CargoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, Cargo, CargoDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Cargos");
    this.code = "MOD_RX_CURR";
    this.orderBy = [['nome', 'asc']];
    this.filter = this.fh.FormBuilder({
      nome: { default: "" },
      descricao: { default: "" },
      nivel: { default: "" },
      siape: { default: "" },
      cbo: { default: "" },
      efetivo: { default: 1 },
      ativo: { default: 1 },
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_RX_OUT_EXCL");
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.descrição.setValue("");
    filter.controls.nivel.setValue("");
    filter.controls.siape.setValue("");
    filter.controls.cbo.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if (form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }
    if (form.descricao?.length) {
      result.push(["descricao", "like", "%" + form.descricao.trim().replace(" ", "%") + "%"]);
    }
    if (form.nivel?.length) {
      result.push(["nivel", "like", "%" + form.nivel.trim().replace(" ", "%") + "%"]);
    }
    if (form.siape?.length) {
      result.push(["siape", "like", "%" + form.siape.trim().replace(" ", "%") + "%"]);
    }
    if (form.cbo?.length) {
      result.push(["cbo", "like", "%" + form.cbo.trim().replace(" ", "%") + "%"]);
    }
    if (form.ativo) {
      result.push(["ativo", "==", 1]);
    }
    result.push(["efetivo", "==", form.efetivo ? 1 : 0]);
    return result;
  }
}


