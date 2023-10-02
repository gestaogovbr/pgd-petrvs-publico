import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { MaterialServicoDaoService } from 'src/app/dao/material-servico-dao.service';
import { MaterialServico } from 'src/app/models/material-servico.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-material-servico-list',
  templateUrl: './material-servico-list.component.html',
  styleUrls: ['./material-servico-list.component.scss']
})
export class MaterialServicoListComponent extends PageListBase<MaterialServico, MaterialServicoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, MaterialServico, MaterialServicoDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Materiais e Serviços");
    this.code = "MOD_MATSRV";
    this.filter = this.fh.FormBuilder({
      tipo: {default: null},
      codigo: {default: ""},
      referencia: {default: ""},
      descricao: {default: ""}
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_MATSRV_EXCL");
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.tipo) { 
      result.push(["tipo", "==", form.tipo]);
    } else if(form.codigo?.length) {
      result.push(["codigo", "like", "%" + form.codigo.trim().replace(" ", "%") + "%"]);
    } else if(form.referencia?.length) {
      result.push(["referencia", "like", "%" + form.referencia.trim().replace(" ", "%") + "%"]);
    } else if(form.descricao?.length) {
      result.push(["descricao", "like", "%" + form.descricao.trim().replace(" ", "%") + "%"]);
    }

    return result;
  }
}


