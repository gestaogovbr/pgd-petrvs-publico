import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Entrega } from 'src/app/models/entrega.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-entrega-list',
  templateUrl: './entrega-list.component.html',
  styleUrls: ['./entrega-list.component.scss']
})
export class EntregaListComponent extends PageListBase<Entrega, EntregaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public unidadeDao?: UnidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, Entrega, EntregaDaoService);
    /* Inicializações */
    this.title = this.lex.translate('Entrega');
    this.join = ["unidade:id,sigla,nome"];
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      unidade_id: {default: null}
     });
    // Testa se o usuário possui permissão para exibir dados de entrega
    if (this.auth.hasPermissionTo("MOD_ENTRG_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir a entrega
    if (this.auth.hasPermissionTo("MOD_ENTRG_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.unidade_id.setValue(null);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome?.length) result.push(["nome", "like", "%" + form.nome + "%"]);
    if(form.unidade_id?.length) result.push(["unidade_id", "==", form.unidade_id]);

    return result;
  }
}

