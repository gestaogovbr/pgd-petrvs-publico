import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ClienteDaoService } from 'src/app/dao/cliente-dao.service';
import { TipoClienteDaoService } from 'src/app/dao/tipo-cliente-dao.service';
import { Cliente } from 'src/app/models/cliente.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent extends PageListBase<Cliente, ClienteDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  public tipoClienteDao: TipoClienteDaoService;

  constructor(public injector: Injector, dao: ClienteDaoService) {
    super(injector, Cliente, ClienteDaoService);
    this.tipoClienteDao = injector.get<TipoClienteDaoService>(TipoClienteDaoService);
    this.dao=dao;
    /* Inicializações */
    this.title = this.lex.translate("Clientes");
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      tipo_cliente_id: { default: null }
    });
   
    this.options.push({
      icon: "bi bi-trash",
      label: "Excluir",
      onClick: this.delete.bind(this)
    });

    this.join = ["tipoCliente"];
   
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
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

    if (filter?.controls.tipo_cliente_id?.value?.length) {
      result.push(["tipo_cliente_id", "==", filter?.controls.tipo_cliente_id?.value]);
    }

    return result;
  }
}

