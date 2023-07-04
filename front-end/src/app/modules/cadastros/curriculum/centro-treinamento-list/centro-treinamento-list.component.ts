import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CentroTreinamento } from 'src/app/models/centro-treinamento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { CentroTreinamentoDaoService } from 'src/app/dao/centro-treinamento-dao.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';

@Component({
  selector: 'centro-treinamento-list',
  templateUrl: './centro-treinamento-list.component.html',
  styleUrls: ['./centro-treinamento-list.component.scss']
})
export class CentroTreinamentoListComponent extends PageListBase<CentroTreinamento, CentroTreinamentoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;


  constructor(public injector: Injector) {
    super(injector, CentroTreinamento, CentroTreinamentoDaoService);
    /* Inicializações */
  
    this.title = this.lex.noun("Centro de Treinamento",true);
    this.code = "MOD_RX";
    this.orderBy = [['nome','asc']];

    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
     });
    // Testa se o usuário possui permissão para exibir dados de cidade
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir a cidade
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
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



