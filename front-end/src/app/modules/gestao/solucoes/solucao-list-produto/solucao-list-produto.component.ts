import { Component, Injector, Input, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { InputSelectComponent } from "src/app/components/input/input-select/input-select.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { QueryOptions } from "src/app/dao/query-options";
import { ProdutoSolucao } from "src/app/models/produto-solucao.model";
import { Produto } from "src/app/models/produto.model";
import { Solucao } from "src/app/models/solucao.model";
import { Unidade } from "src/app/models/unidade.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
import { LookupItem } from "src/app/services/lookup.service";

@Component({
  selector: 'solucao-list-produto',
  templateUrl: './solucao-list-produto.component.html',
  styleUrls: ['./solucao-list-produto.component.scss']
})
export class SolucaoListProdutoComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() set entity(value: Solucao | undefined) { super.entity = value; } get entity(): Solucao | undefined { return super.entity; }
  @ViewChild('unidade', { static: false }) public unidade?: InputSelectComponent;
  public filter?: FormGroup;
  public unidades: LookupItem[] = [];
  public items: ProdutoSolucao[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.filter = this.fh.FormBuilder({
      unidade_id: { default: this.auth.unidade?.id }
    });
  }

  public ngOnInit() {
    super.ngOnInit();
    this.loadItens();
    this.loadUnidades();
  }

  public loadItens() {
    this.items = this.entity?.produtos_solucoes || [];

    if (this.unidade?.selectedItem) {
      this.items = this.items.filter(item => item.produto?.unidade_id == this.unidade?.selectedItem?.key);
    }
  }

  public loadUnidades() {
    if (!this.entity || !this.entity?.solucoes_unidades) {
      this.unidades = [];
      return;
    }
  
    const unidadesUnicas = new Map<string, Unidade>();
  
    this.entity.solucoes_unidades.forEach(solucao_unidade => {
      const unidade = solucao_unidade?.unidade;
      if (unidade && !unidadesUnicas.has(unidade.id)) {
        unidadesUnicas.set(unidade.id, unidade);
      }
    });
  
    this.unidades = Array.from(unidadesUnicas.values())
      .sort((a, b) => a.sigla.localeCompare(b.sigla)) 
      .map(unidade => ({ key: unidade.id, value: unidade.sigla }));
  }

  public dynamicButtons(row: ProdutoSolucao): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    result.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showProduto.bind(this) });  
    return result;
  }

  public async showProduto(row: ProdutoSolucao){
    this.go.navigate({route: ['gestao', 'produto', row?.produto_id, "show"]}, {});    
  }

  public isAtivo(row: Produto): boolean {
    return (row?.data_ativado && !row?.data_desativado) || false;
  }

  public getStatusColor(row: Produto): string {
    return this.isAtivo(row) ? 'success' : 'danger';
  }

  public getStatusText(row: Produto): string {
    return this.isAtivo(row) ? 'Ativo' : 'Inativo';
  }

  public onUnidadeChange(event: Event) {
    this.loadItens();
  }

}