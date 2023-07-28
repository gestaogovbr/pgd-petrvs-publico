import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoJustificativaDaoService } from 'src/app/dao/tipo-justificativa-dao.service';
import { TipoJustificativa } from 'src/app/models/tipo-justificativa.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-tipo-justificativa-list',
  templateUrl: './tipo-justificativa-list.component.html',
  styleUrls: ['./tipo-justificativa-list.component.scss']
})
export class TipoJustificativaListComponent extends PageListBase<TipoJustificativa, TipoJustificativaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, TipoJustificativa, TipoJustificativaDaoService);
    /* Inicializações */
    this.title = "Tipos de " + this.lex.translate("Justificativa");
    this.code="MOD_TIPO_JUST";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
    });
    // Testa se o usuário possui permissão para exibir dados do tipo de justificativa
    if (this.auth.hasPermissionTo("MOD_TIPO_JUST_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o tipo de justificativa
    if (this.auth.hasPermissionTo("MOD_TIPO_JUST_EXCL")) {
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

