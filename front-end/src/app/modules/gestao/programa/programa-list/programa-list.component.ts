import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { Programa } from 'src/app/models/programa.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-programa-list',
  templateUrl: './programa-list.component.html',
  styleUrls: ['./programa-list.component.scss']
})
export class ProgramaListComponent extends PageListBase<Programa, ProgramaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector, dao: ProgramaDaoService) {
    super(injector, Programa, ProgramaDaoService);
    /* Inicializações */
    this.title = this.lex.noun("Programa de gestão", true);
    this.code = "MOD_PRGT";
    this.join = ["unidade"];
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
    });
    // Testa se o usuário possui permissão para exibir dados do programa de gestão
    if (this.auth.hasPermissionTo("MOD_PRGT_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o programa de gestão
    if (this.auth.hasPermissionTo("MOD_PRGT_EXCL")) {
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

