import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { GrupoEspecializado } from 'src/app/models/grupo-especializado.model';
import { GrupoEspecializadoDaoService } from 'src/app/dao/grupo-especializado-dao.service';

@Component({
  selector: 'grupo-especializado-list',
  templateUrl: './grupo-especializado-list.component.html',
  styleUrls: ['./grupo-especializado-list.component.scss']
})
export class GrupoEspecializadoListComponent extends PageListBase<GrupoEspecializado, GrupoEspecializadoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;


  constructor(public injector: Injector) {
    super(injector, GrupoEspecializado, GrupoEspecializadoDaoService);
    /* Inicializações */
  
    this.title = this.lex.translate("Grupos Especializados");
    this.code = "MOD_RX";

    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
     });
     this.addOption(this.OPTION_EXCLUIR, "MOD_RX_OUT_EXCL");
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }

    return result;
  }
}



