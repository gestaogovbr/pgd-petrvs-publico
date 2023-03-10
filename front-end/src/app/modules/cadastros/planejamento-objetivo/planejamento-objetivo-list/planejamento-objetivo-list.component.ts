import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { EixoTematicoDaoService } from 'src/app/dao/eixo-tematico-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { EixoTematico } from 'src/app/models/eixo-tematico.model';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-planejamento-objetivo-list',
  templateUrl: './planejamento-objetivo-list.component.html',
  styleUrls: ['./planejamento-objetivo-list.component.scss']
})
export class PlanejamentoObjetivoListComponent extends PageListBase<PlanejamentoObjetivo, PlanejamentoObjetivoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, PlanejamentoObjetivo, PlanejamentoObjetivoDaoService);
    /* Inicializações */
    this.title = 'Objetivos do Planejamento Institucional';
    this.join = ['planejamento:nome'];
    this.filter = this.fh.FormBuilder({
      //
     });
    // Testa se o usuário possui permissão para consultar planejamentos institucionais
    if (this.auth.hasPermissionTo("MOD_PLAN_INST_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
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

/*     if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome + "%"]);
    } */

    return result;
  }

}
