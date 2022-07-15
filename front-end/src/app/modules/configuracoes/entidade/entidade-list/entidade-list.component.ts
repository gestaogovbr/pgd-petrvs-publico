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
    this.title = this.lex.noun("Entidade", true);
    this.code = "MOD_CFG_ENTD";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
    });
    // Testa se o usuário possui permissão para exibir dados da entidade
    if (this.auth.hasPermissionTo("MOD_ENTD_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir a entidade
    if (this.auth.hasPermissionTo("MOD_ENTD_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
    // Testa se o usuário possui permissão para configurar a entidade
    if (this.auth.hasPermissionTo("MOD_ENTD_CFG")){
      this.options.push({
        icon: "bi bi-tools",
        label: "Configurações",
        onClick: (entidade: Entidade) => {
          this.go.navigate({route: ['configuracoes', 'entidade', entidade.id, 'conf']}, {modal: true});
        }
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

