import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { AreaTematica } from 'src/app/models/area-tematica.model';
import { AreaTematicaDaoService } from 'src/app/dao/area-tematica-dao.service';


@Component({
  selector: 'area-tematica-list',
  templateUrl: './area-tematica-list.component.html',
  styleUrls: ['./area-tematica-list.component.scss']
})
export class AreaTematicaListComponent extends PageListBase<AreaTematica, AreaTematicaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;


  constructor(public injector: Injector) {
    super(injector, AreaTematica, AreaTematicaDaoService);
    /* Inicializações */
  
    this.title = this.lex.translate("Áreas Temática");
    this.code = "MOD_RX";
    this.orderBy = [['nome','asc']];

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


