import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CapacidadeTecnica } from 'src/app/models/capacidade-tecnica.model';
import { CapacidadeTecnicaDaoService } from 'src/app/dao/capacidade-tecnica-dao.service';

@Component({
  selector: 'capacidade-tecnica-list',
  templateUrl: './capacidade-tecnica-list.component.html',
  styleUrls: ['./capacidade-tecnica-list.component.scss']
})
export class CapacidadeTecnicaListComponent extends PageListBase<CapacidadeTecnica, CapacidadeTecnicaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, CapacidadeTecnica, CapacidadeTecnicaDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Capacidades Técnicas");
    this.code = "MOD_RX_CURR";
    this.join = ["area_tematica:id,nome"];
    this.orderBy = [['nome', 'asc']];
    this.filter = this.fh.FormBuilder({
      nome: { default: "" },
      area_tematica_id: { default: "" },
      ativo: { default: "" },
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_RX_OUT_EXCL");
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.area_tematica_id.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if (form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }
    if (form.area_tematica_id?.length) {
      result.push(["id", "like", "%" + form.area_tematica_id.trim().replace(" ", "%") + "%"]);
    }
    return result;
  }
}