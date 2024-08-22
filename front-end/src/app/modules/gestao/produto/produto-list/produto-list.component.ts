import { Component, Injector, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { Produto } from "src/app/models/produto.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { ProdutoService } from "src/app/services/produto.service";

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent extends PageListBase<Produto, ProdutoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  public produtoService: ProdutoService;

  constructor(public injector: Injector, dao: ProdutoDaoService) {
    super(injector, Produto, ProdutoDaoService);
    this.produtoService = injector.get<ProdutoService>(ProdutoService);
    this.title = this.lex.translate("Produtos");
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
    });
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public dynamicButtons(row: Produto): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    return result;
  }

}