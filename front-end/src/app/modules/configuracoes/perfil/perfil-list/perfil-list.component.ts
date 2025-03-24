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
    this.orderBy = [['nome','asc']];
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
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

