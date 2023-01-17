import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TipoDocumento } from 'src/app/models/tipo-documento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-tipo-documento-list',
  templateUrl: './tipo-documento-list.component.html',
  styleUrls: ['./tipo-documento-list.component.scss']
})
export class TipoDocumentoListComponent extends PageListBase<TipoDocumento, TipoDocumentoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, TipoDocumento, TipoDocumentoDaoService);
    /* Inicializações */
    this.title = "Tipos de " + this.lex.noun("Documento",true);
    this.code="MOD_TIPO_DOC";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
    });
    // Testa se o usuário possui permissão para exibir dados do tipo de documento
    if (this.auth.hasPermissionTo("MOD_TIPO_DOC_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o tipo de documento
    if (this.auth.hasPermissionTo("MOD_TIPO_DOC_EXCL")) {
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

