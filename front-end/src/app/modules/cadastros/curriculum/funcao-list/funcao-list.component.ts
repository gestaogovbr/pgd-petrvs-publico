import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';

import { Funcao } from 'src/app/models/funcao.model';
import { FuncaoDaoService } from 'src/app/dao/funcao-dao.service';

@Component({
  selector: 'funcao-list',
  templateUrl: './funcao-list.component.html',
  styleUrls: ['./funcao-list.component.scss']
})
export class FuncaoListComponent extends PageListBase<Funcao, FuncaoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;


  constructor(public injector: Injector) {
    super(injector, Funcao, FuncaoDaoService);
    /* Inicializações */
  
    this.title = this.lex.noun("Centro de Treinamento",true);
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




