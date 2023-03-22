import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { EixoTematicoDaoService } from 'src/app/dao/eixo-tematico-dao.service';
import { EixoTematico } from 'src/app/models/eixo-tematico.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-eixo-tematico-list',
  templateUrl: './eixo-tematico-list.component.html',
  styleUrls: ['./eixo-tematico-list.component.scss']
})
export class EixoTematicoListComponent extends PageListBase<EixoTematico, EixoTematicoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, EixoTematico, EixoTematicoDaoService);
    /* Inicializações */
    this.title = this.lex.noun('Eixo Temático', true);
    this.orderBy = [['nome', 'asc']];
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
     });
    // Testa se o usuário possui permissão para consultar eixos temáticos
    if (this.auth.hasPermissionTo("MOD_PLAN_INST_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir eixos temáticos
    if (this.auth.hasPermissionTo("MOD_PLAN_INST_EXCL")) {
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
