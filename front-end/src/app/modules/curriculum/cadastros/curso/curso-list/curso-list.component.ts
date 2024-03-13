import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { Curso } from 'src/app/models/curso.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';

@Component({
  selector: 'curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.scss']
})
export class CursoListComponent extends PageListBase<Curso, CursoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, Curso, CursoDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Cursos");
    this.code = "MOD_RX_CURR";
    this.join = ["area_conhecimento", "tipo_curso"];
    this.orderBy = [['nome', 'asc']];
    this.filter = this.fh.FormBuilder({
      nome_area: { default: "" },
      nome_curso: { default: "" },
      nome_tipo: { default: "" },
      titulo: { default: "" },
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_RX_OUT_EXCL");
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome_area.setValue("");
    filter.controls.nome_curso.setValue("");
    filter.controls.nome_tipo.setValue("");
    filter.controls.titulo.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if (form.nome_curso?.length) {
      result.push(["nome", "like", "%" + form.nome_curso.trim().replace(" ", "%") + "%"]);
    }
    if (form.nome_area?.length) {
      result.push(["area_curso_id", "like", "%" + form.nome_area.trim().replace(" ", "%") + "%"]);
    }
    if (form.titulo?.length) {
      result.push(["titulo", "like", "%" + form.titulo.trim().replace(" ", "%") + "%"]);
    }
    if (form.nome_tipo?.length) {
      result.push(["tipo_curso_id", "like", "%" + form.tipo.trim().replace(" ", "%") + "%"]);
    }
    return result;
  }
}


