import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { FeriadoDaoService } from 'src/app/dao/feriado-dao.service';
import { Feriado } from 'src/app/models/feriado.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-feriado-list',
  templateUrl: './feriado-list.component.html',
  styleUrls: ['./feriado-list.component.scss']
})
export class FeriadoListComponent extends PageListBase<Feriado, FeriadoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;


  constructor(public injector: Injector, dao: FeriadoDaoService) {
    super(injector, Feriado, FeriadoDaoService);
    this.dao=dao;
    /* Inicializações */
    this.title = this.lex.translate("Feriados");
    this.code = "MOD_FER";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
    });
    // Testa se o usuário possui permissão para exibir dados do feriado
    if (this.auth.hasPermissionTo("MOD_FER_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o feriado
    if (this.auth.hasPermissionTo("MOD_FER_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
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

    return result;
  }
}

