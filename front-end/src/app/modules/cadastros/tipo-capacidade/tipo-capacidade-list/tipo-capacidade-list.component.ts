import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoCapacidadeDaoService } from 'src/app/dao/tipo-capacidade-dao.service';
import { TipoCapacidade } from 'src/app/models/tipo-capacidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-tipo-capacidade-list',
  templateUrl: './tipo-capacidade-list.component.html',
  styleUrls: ['./tipo-capacidade-list.component.scss']
})
export class TipoCapacidadeListComponent extends PageListBase<TipoCapacidade, TipoCapacidadeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, TipoCapacidade, TipoCapacidadeDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Tipos de Capacidade");
    this.code="MOD_TIPO_CAP";
    this.filter = this.fh.FormBuilder({
      codigo: {default: ""},
      descricao: {default: ""}
    });
    // Testa se o usuário possui permissão para exibir dados do tipo de capacidade
    if (this.auth.hasPermissionTo("MOD_TIPO_CAP")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o tipo de avaliação
    if (this.auth.hasPermissionTo("MOD_TIPO_CAP_EXCL")) {
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

    if(form.descricao?.length) {
      result.push(["descricao", "like", "%" + form.descricao.trim().replace(" ", "%") + "%"]);
    }

    return result;
  }
}

