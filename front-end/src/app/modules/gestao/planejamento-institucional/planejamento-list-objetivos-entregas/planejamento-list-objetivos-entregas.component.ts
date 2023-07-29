import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'planejamento-list-objetivos-entregas',
  templateUrl: './planejamento-list-objetivos-entregas.component.html',
  styleUrls: ['./planejamento-list-objetivos-entregas.component.scss']
})
export class PlanejamentoListObjetivosEntregasComponent extends PageListBase<PlanejamentoObjetivo, PlanejamentoObjetivoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  
  public planejamentoDao: PlanejamentoDaoService;
  public planejamentoObjetivoDao: PlanejamentoObjetivoDaoService;
  public buttons: ToolbarButton[] = [];
  
  constructor(public injector: Injector) {
    super(injector, PlanejamentoObjetivo, PlanejamentoObjetivoDaoService);
    this.join = ['objetivos']
    this.planejamentoDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.planejamentoObjetivoDao = injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService);
    this.title = this.lex.translate("Objetivos", true);
    this.filter = this.fh.FormBuilder({
      nome: { default: "" },
      planejamento_id: { default: null}
    });
  }  
 
  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let objetivo: PlanejamentoObjetivo = row as PlanejamentoObjetivo;
    result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (objetivo: PlanejamentoObjetivo) => this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult'] }, { modal: true }) });
    return result;
  }

  public filterClear(filter: FormGroup) {
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let form: any = filter.value;
    let result: any[] = [];
    if (form.planejamento_id?.length) {
      result.push(["planejamento_id", "==", form.planejamento_id]);
    }
    if (form.nome?.length) {
      result.push(["or", ["nome", "like", "%" + form.nome.replace(" ", "%") + "%"], ["sigla", "like", "%" + form.nome.replace(" ", "%") + "%"]]);
    }
    return result;
  }
}
