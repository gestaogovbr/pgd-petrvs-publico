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
    this.title = this.lex.noun("Material e serviço", true);
    this.code = "MOD_MATSRV";
    this.filter = this.fh.FormBuilder({
      tipo: {default: null},
      codigo: {default: ""},
      referencia: {default: ""},
      descricao: {default: ""}
    });
    // Testa se o usuário possui permissão para exibir dados do materiais e serviços
    if (this.auth.hasPermissionTo("MOD_MATSRV_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o materiais e serviços
    if (this.auth.hasPermissionTo("MOD_MATSRV_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  public filterClear(filter: FormGroup) {
    filter.controls.tipo.setValue(null);
    filter.controls.codigo.setValue("");
    filter.controls.referencia.setValue("");
    filter.controls.descricao.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.tipo) { 
      result.push(["tipo", "==", form.tipo]);
    } else if(form.codigo?.length) {
      result.push(["codigo", "like", "%" + form.codigo + "%"]);
    } else if(form.referencia?.length) {
      result.push(["referencia", "like", "%" + form.referencia + "%"]);
    } else if(form.descricao?.length) {
      result.push(["descricao", "like", "%" + form.descricao + "%"]);
    }

    return result;
  }
}


