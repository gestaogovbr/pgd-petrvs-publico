import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar-types';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
    selector: 'planejamento-list-objetivos-entregas',
    templateUrl: './planejamento-list-objetivos-entregas.component.html',
    styleUrls: ['./planejamento-list-objetivos-entregas.component.scss'],
    standalone: false
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
    this.OPTION_INFORMACOES.onClick = (objetivo: PlanejamentoObjetivo) => this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult'] }, { modal: true });
    this.addOption(this.OPTION_INFORMACOES);
    this.rowsLimit = 1000;
  }

  public sortObjetivos(objetivos: PlanejamentoObjetivo[]): PlanejamentoObjetivo[] {
    const buildTree = (paiId: string | null = null): PlanejamentoObjetivo[] => {
      const children = objetivos
        .filter(p => (paiId === null ? !p.objetivo_pai_id : p.objetivo_pai_id === paiId))
        .sort((a, b) => (a.sequencia || 0) - (b.sequencia || 0));

      return children.flatMap(p => [p, ...buildTree(p.id)]);
    };
    return buildTree(null);
  }

  public allRows: PlanejamentoObjetivo[] = [];

  public onGridLoad = async (rows?: any[]) => {
    if (rows) {
      if (rows !== this.allRows) {
         this.allRows = [...rows];
      }
      
      const sorted = this.sortObjetivos(this.allRows);
      
      if (rows && rows !== this.allRows) {
          rows.splice(0, rows.length, ...sorted);
      } else if (this.grid) {
          this.grid.items = sorted;
          this.grid.cdRef.detectChanges();
      }
    }
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


  public getNome (row: PlanejamentoObjetivo){
    return row.nome;
  }
  
  public getNivel(row: PlanejamentoObjetivo): number {
    let paiId: string | null = row.objetivo_pai_id;
    let niveis = 0;
    while (paiId) {
      let atual = this.allRows.find(x => x.id == paiId);
      niveis++;
      paiId = atual?.objetivo_pai_id || null;
    }
    return niveis;
  }
}
