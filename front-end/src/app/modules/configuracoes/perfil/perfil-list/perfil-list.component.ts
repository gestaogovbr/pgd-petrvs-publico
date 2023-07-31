import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { Perfil } from 'src/app/models/perfil.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.scss']
})
export class PerfilListComponent extends PageListBase<Perfil, PerfilDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public options: ToolbarButton[] = [];

  constructor(public injector: Injector) {
    super(injector, Perfil, PerfilDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Perfis");
    this.code = "MOD_CFG_PERFS";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
    });
    // Testa se o usuário possui permissão para exibir dados do perfil
    if (this.auth.hasPermissionTo("MOD_PERF_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o perfil
    if (this.auth.hasPermissionTo("MOD_PERF_EXCL")) {
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

