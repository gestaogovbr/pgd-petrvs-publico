import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'cadeia-valor-list-processos-entregas',
  templateUrl: './cadeia-valor-list-processos-entregas.component.html',
  styleUrls: ['./cadeia-valor-list-processos-entregas.component.scss']
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
  }

  /*public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let processo: CadeiaValorProcesso = row as CadeiaValorProcesso;
    result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (processo: CadeiaValorProcesso) => this.go.navigate({ route: ['gestao', 'cadeia-valor', 'processo', processo.id, 'consult'] }, { modal: true }) });
    return result;
  }*/

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

  public getSequencia(metadata: any, row: CadeiaValorProcesso): string {
    metadata.nivel = row.sequencia_completa || row.sequencia;
    this.sortProcessos();
    return metadata.nivel;
  }
  public sortProcessos(): void {
    this.grid?.items.sort((a, b) => {
      const metaA = this.grid!.getMetadata(a);
      const metaB = this.grid!.getMetadata(b);

      const sa = (metaA?.nivel || "").split(".").map(Number);
      const sb = (metaB?.nivel || "").split(".").map(Number);

      const len = Math.max(sa.length, sb.length);
      for (let i = 0; i < len; i++) {
        const va = sa[i] || 0;
        const vb = sb[i] || 0;
        if (va !== vb) {
          return va - vb;
        }
      }
      return 0;
    });
  }

}
