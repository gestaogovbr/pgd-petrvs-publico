import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { AreaConhecimento } from 'src/app/models/area-conhecimento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';

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
    this.code = "MOD_RX";
    this.orderBy = [['nome','asc']];

    this.filter = this.fh.FormBuilder({
      nome_area: {default: ""}
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
    filter.controls.nome_area.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome_area?.length) {
      result.push(["nome", "like", "%" + form.nome_area.trim().replace(" ", "%") + "%"]);
    }

    return result;
  }
}


