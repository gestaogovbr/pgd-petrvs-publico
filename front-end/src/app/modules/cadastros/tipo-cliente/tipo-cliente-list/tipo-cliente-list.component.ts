import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoClienteDaoService } from 'src/app/dao/tipo-cliente-dao.service';
import { TipoCliente } from 'src/app/models/tipo-cliente.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-tipo-cliente-list',
  templateUrl: './tipo-cliente-list.component.html',
  styleUrls: ['./tipo-cliente-list.component.scss']
})
export class TipoClienteListComponent extends PageListBase<TipoCliente, TipoClienteDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, TipoCliente, TipoClienteDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Tipos de Clientes");
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
    });

    if (this.auth.hasPermissionTo("MOD_TIPO_CLI_EXCL")) {
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
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }

    return result;
  }

}

