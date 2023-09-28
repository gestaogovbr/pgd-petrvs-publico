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
    this.title = this.lex.translate("Objetivos") + ' ' + this.lex.translate("do Planejamento Institucional");
    this.filter = this.fh.FormBuilder({
      nome: { default: "" },
      planejamento_id: { default: null}
    });
  }  
 
  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (objetivo: PlanejamentoObjetivo) => this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult'] }, { modal: true }) });
    return result;
  }

  public filterClear(filter: FormGroup) {
    super.filterClear(filter);
    this.filter?.controls.nome.setValue("");
  }

  public filterWhere = (filter: FormGroup) => {
    let form: any = filter.value;
    let result: any[] = [];
    if (form.planejamento_id?.length) {
      result.push(["planejamento_id", "==", form.planejamento_id]);
    }
    if (form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }
    return result;
  }

  public getNome (metadata: any, row: PlanejamentoObjetivo){
    if (!metadata.path) {
      let paiId: string | null = row.objetivo_pai_id;
      let niveis = "";
      while (paiId) {
        let atual = this.grid?.items.find(x => x.id == paiId);
        niveis = (atual?.sequencia || "") + "." + niveis;
        paiId = atual?.objetivo_pai_id || null;
      }
      metadata.path = niveis + row.sequencia;
    }
    this.grid?.items.sort((a, b) => {
      const sa = (this.grid!.getMetadata(a)?.path || "").split(".").map((x: string) => ("000" + x).substr(-3)).join(".");
      const sb = (this.grid!.getMetadata(b)?.path || "").split(".").map((x: string) => ("000" + x).substr(-3)).join(".");
      return sa < sb ? -1 : sa > sb ? 1 : 0;
    });
    if (metadata.path.length > 2) return '- ' + row.nome;
    else if (metadata.path.length > 4) return '-- ' + row.nome;
    return row.nome;
  }
}
