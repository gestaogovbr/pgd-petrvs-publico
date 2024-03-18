import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoCursoDaoService } from 'src/app/dao/tipo-curso-dao.service';
import { TipoCurso } from 'src/app/models/tipo-curso.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'tipo-curso-list',
  templateUrl: './tipo-curso-list.component.html',
  styleUrls: ['./tipo-curso-list.component.scss']
})
export class TipoCursoListComponent extends PageListBase<TipoCurso, TipoCursoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, TipoCurso, TipoCursoDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Tipos de Curso");
    this.code = "MOD_RX_CURR";
    this.filter = this.fh.FormBuilder({
      nome: { default: "" },
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
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }
    return result;
  }
}



