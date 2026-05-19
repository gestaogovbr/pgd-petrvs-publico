import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar-types';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { TipoProcesso } from 'src/app/models/tipo-processo.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
    selector: 'app-tipo-processo-list',
    templateUrl: './tipo-processo-list.component.html',
    styleUrls: ['./tipo-processo-list.component.scss'],
    standalone: false
})
export class TipoProcessoListComponent extends PageListBase<TipoProcesso, TipoProcessoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public toolbarButtons: ToolbarButton[] = [];

  constructor(public injector: Injector) {
    super(injector, TipoProcesso, TipoProcessoDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Tipos de Processo");
    this.code="MOD_TIPO_PROC";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
    });    
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_TIPO_PROC_EXCL");
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

