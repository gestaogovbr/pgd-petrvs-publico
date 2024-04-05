import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { Disciplina } from 'src/app/models/disciplina.model';
import { DisciplinaDaoService } from 'src/app/dao/disciplina-dao.service';

@Component({
  selector: 'disciplina-list',
  templateUrl: './disciplina-list.component.html',
  styleUrls: ['./disciplina-list.component.scss']
})
export class DisciplinaListComponent extends PageListBase<Disciplina, DisciplinaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public area?: AreaConhecimentoDaoService;
  constructor(public injector: Injector) {
    super(injector, Disciplina, DisciplinaDaoService);
    this.area = injector.get<AreaConhecimentoDaoService>(AreaConhecimentoDaoService)
    /* Inicializações */
    this.title = this.lex.translate("Disciplinas");
    this.code = "MOD_RX_CURR";
    this.join = [];
    this.orderBy = [['nome', 'asc']];
    this.filter = this.fh.FormBuilder({
      nome: { default: "" },
      sigla: { default: "" },
      inativas: { default: false },
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_RX_OUT_EXCL");
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.sigla.setValue("");
    filter.controls.inativas.setValue(false);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if (form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }
    if (form.sigla?.length) {
      result.push(["sigla", "like", "%" + form.sigla.trim().replace(" ", "%") + "%"]);
    }
    result.push(["ativo", "==", form.inativas ? 0 : 1]);
    return result;
  }
}