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
    // Testa se o usuário possui permissão para exibir dados de cidade
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir a cidade
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
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



