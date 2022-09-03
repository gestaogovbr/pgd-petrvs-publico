import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { Projeto } from 'src/app/models/projeto.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-projeto-list',
  templateUrl: './projeto-list.component.html',
  styleUrls: ['./projeto-list.component.scss']
})
export class ProjetoListComponent extends PageListBase<Projeto, ProjetoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, Projeto, ProjetoDaoService);
    /* Inicializações */
    this.title = this.lex.noun("Projeto", true);
    this.code = "MOD_PROJ";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      status: {default: null},
      inicio: {default: null},
      termino: {default: null}
    });
    // Testa se o usuário possui permissão para exibir dados do projeto
    if (this.auth.hasPermissionTo("MOD_PROJ_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o projeto
    if (this.auth.hasPermissionTo("MOD_PROJ_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.status.setValue(null);
    filter.controls.inicio.setValue(null);
    filter.controls.termino.setValue(null);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.nome?.length) { 
      result.push(["nome", "like", "%" + form.nome + "%"]);
    } else if(form.status) {
      result.push(["status", "==", form.status]);
    } else if(form.inicio?.length) {
      result.push(["termino", ">=", form.inicio]);
    } else if(form.termino?.length) {
      result.push(["inicio", "=<", form.termino]);
    }

    return result;
  }
}