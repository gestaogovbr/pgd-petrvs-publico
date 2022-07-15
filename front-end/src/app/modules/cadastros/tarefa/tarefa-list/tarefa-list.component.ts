import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TarefaDaoService } from 'src/app/dao/tarefa-dao.service';
import { Tarefa } from 'src/app/models/tarefa.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { DaoBaseService } from 'src/app/dao/dao-base.service';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrls: ['./tarefa-list.component.scss']
})
export class TarefaListComponent extends PageListBase<Tarefa, TarefaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, Tarefa, TarefaDaoService);
    /* Inicializações */
    this.title = this.lex.noun("Tarefa", true);
    this.code="MOD_TRF";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
     });
     this.join = ["unidade", "entidade"];
    // Testa se o usuário possui permissão para exibir dados da tarefa
    if (this.auth.hasPermissionTo("MOD_TRF_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir a tarefa
    if (this.auth.hasPermissionTo("MOD_TRF_EXCL")) {
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

