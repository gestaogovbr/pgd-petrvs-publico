import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar-types';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
    selector: 'cadeia-valor-list-processos-entregas',
    templateUrl: './cadeia-valor-list-processos-entregas.component.html',
    styleUrls: ['./cadeia-valor-list-processos-entregas.component.scss'],
    standalone: false
})
export class CadeiaValorListProcessosEntregasComponent extends PageListBase<CadeiaValorProcesso, CadeiaValorProcessoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public cadeiaValorDao: CadeiaValorDaoService;
  public cadeiaValorProcessoDao: CadeiaValorProcessoDaoService;
  public buttons: ToolbarButton[] = [];

  constructor(public injector: Injector) {
    super(injector, CadeiaValorProcesso, CadeiaValorProcessoDaoService);
    this.cadeiaValorDao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.cadeiaValorProcessoDao = injector.get<CadeiaValorProcessoDaoService>(CadeiaValorProcessoDaoService);
    this.title = this.lex.translate("Processos");
    this.filter = this.fh.FormBuilder({
      nome: { default: "" },
      cadeia_valor_id: { default: null },
    });
    this.OPTION_INFORMACOES.onClick = (processo: CadeiaValorProcesso) => this.go.navigate({ route: ['gestao', 'cadeia-valor', 'processo', processo.id, 'consult'] }, { modal: true });
    this.addOption(this.OPTION_INFORMACOES);
    this.rowsLimit = 1000;
  }

  public filterClear(filter: FormGroup) {
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let form: any = filter.value;
    let result: any[] = [];
    if (form.planejamento_id?.length) {
      result.push(["cadeia_valor_id", "==", form.cadeia_valor_id]);
    }
    if (form.nome?.length) {
      result.push(["or", ["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"], ["sigla", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]]);
    }
    return result;
  }

  public sortProcessos(processos: CadeiaValorProcesso[]): CadeiaValorProcesso[] {
    const buildTree = (paiId: string | null = null, nivel: number = 0, prefixo: string = ""): CadeiaValorProcesso[] => {
      const children = processos
        .filter(p => (paiId === null ? !p.processo_pai_id : p.processo_pai_id === paiId))
        .sort((a, b) => {
          const seqA = a.sequencia || 0;
          const seqB = b.sequencia || 0;
          if (seqA !== seqB) return seqA - seqB;
          return (a.nome || "").localeCompare(b.nome || "");
        });

      return children.flatMap(p => {
        const numero = prefixo + (prefixo ? "." : "") + (p.sequencia || "");
        (p as any)._nivel = nivel;
        (p as any)._numero = numero;
        return [p, ...buildTree(p.id, nivel + 1, numero)];
      });
    };
    return buildTree(null);
  }

  public allRows: CadeiaValorProcesso[] = [];

  public onGridLoad = async (rows?: any[]) => {
    if (rows) {
      if (rows !== this.allRows) {
         this.allRows = [...rows];
      }
      
      const sorted = this.sortProcessos(this.allRows);
      
      if (rows && rows !== this.allRows) {
          rows.splice(0, rows.length, ...sorted);
      } else if (this.grid) {
          this.grid.items = sorted;
          this.grid.cdRef.detectChanges();
      }
    }
  }
}
