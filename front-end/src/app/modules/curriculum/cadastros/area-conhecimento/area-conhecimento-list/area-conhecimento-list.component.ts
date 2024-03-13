import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { AreaConhecimento } from 'src/app/models/area-conhecimento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';

@Component({
  selector: 'area-conhecimento-list',
  templateUrl: './area-conhecimento-list.component.html',
  styleUrls: ['./area-conhecimento-list.component.scss']
})
export class AreaConhecimentoListComponent extends PageListBase<AreaConhecimento, AreaConhecimentoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, AreaConhecimento, AreaConhecimentoDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Áreas de Conhecimento");
    this.code = "MOD_RX_CURR";
    this.orderBy = [['nome', 'asc']];
    this.filter = this.fh.FormBuilder({
      nome: { default: "" }
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_RX_OUT_EXCL");
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if (form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome_area.trim().replace(" ", "%") + "%"]);
    }
    return result;
  }
}