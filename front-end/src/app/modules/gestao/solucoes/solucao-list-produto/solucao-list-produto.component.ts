import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { ProdutoSolucaoDaoService } from "src/app/dao/produto-solucao-dao.service";
import { QueryOptions } from "src/app/dao/query-options";
import { SolucaoDaoService } from "src/app/dao/solucao-dao.service";
import { SolucaoUnidadeDaoService } from "src/app/dao/solucao-unidade-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { ProdutoSolucao } from "src/app/models/produto-solucao.model";
import { Produto } from "src/app/models/produto.model";
import { Solucao } from "src/app/models/solucao.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";

@Component({
  selector: 'solucao-list-produto',
  templateUrl: './solucao-list-produto.component.html',
  styleUrls: ['./solucao-list-produto.component.scss']
})
export class SolucaoListProdutoComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() set entity(value: Solucao | undefined) { super.entity = value; } get entity(): Solucao | undefined { return super.entity; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }

  public get items(): ProdutoSolucao[] {
    return this.entity?.produtos_solucoes || [];
  }

  public dynamicButtons(row: ProdutoSolucao): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    result.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showProduto.bind(this) });  
    return result;
  }

  public async showProduto(row: ProdutoSolucao){
    this.go.navigate({route: ['gestao', 'produto', row.produto_id, "show"]}, {});    
  }

}