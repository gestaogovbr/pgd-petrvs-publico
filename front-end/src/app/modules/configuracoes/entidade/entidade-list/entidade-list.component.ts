import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { Entidade } from 'src/app/models/entidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-entidade-list',
  templateUrl: './entidade-list.component.html',
  styleUrls: ['./entidade-list.component.scss']
})
export class EntidadeListComponent extends PageListBase<Entidade, EntidadeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public options: ToolbarButton[] = [];

  constructor(public injector: Injector) {
    super(injector, Entidade, EntidadeDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Entidades");
    this.code = "MOD_ENTD";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_ENTD_EXCL");
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    // Testa se o usuário possui permissão para configurar a entidade
    if (this.auth.hasPermissionTo("MOD_CFG_ENTD")){
      this.options.push({
        icon: "bi bi-tools",
        label: "Configurações",
        onClick: (entidade: Entidade) => {
          this.go.navigate({route: ['configuracoes', 'entidade', entidade.id, 'conf']}, {modal: true});
        }
      });
    }
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

