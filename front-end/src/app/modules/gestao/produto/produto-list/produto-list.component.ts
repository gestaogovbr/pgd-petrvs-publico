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
  public isUpdating: boolean = false;

  constructor(public injector: Injector, dao: ProdutoDaoService) {
    super(injector, Produto, ProdutoDaoService);
    this.produtoService = injector.get<ProdutoService>(ProdutoService);
    this.title = this.lex.translate("Produtos");
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
    });
    this.join = [
      "produtoProcessoCadeiaValor"
    ];
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public dynamicButtons(row: Produto): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    if(!row._status) result.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showDetalhes.bind(this) });   
    if(!row._status) result.push({ label: "Excluir", icon: "bi bi-trash", color: 'btn-outline-danger', onClick: this.delete.bind(this) });   

    return result;
  }

  public async showDetalhes(produto: Produto){
    this.go.navigate({route: ['gestao', 'produto', produto.id, "show"]}, {
      metadata: {
        produto: produto
      }
    });    
  }
  
  public async ativarDesativar(produto: Produto){  
    if (this.isUpdating) {
      console.log("Aguarde o término do processo anterior");
      return; 
    }
    this.isUpdating = true;
    let ativo = this.ativo(produto)  
    produto.data_desativado = null;
    produto.data_ativado = null;
    ativo ? produto.data_desativado = new Date() : produto.data_ativado = new Date();
    
    try {
      await this.dao?.update(produto.id, {
        id: produto.id,
        data_desativado: produto.data_desativado,
        data_ativado: produto.data_ativado
      });
      console.log("Produto atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar o produto", error);
    } finally {
      this.isUpdating = false; // Finaliza o processo, permitindo novos cliques
    }
  }

  public ativo(produto: Produto): boolean {
    return produto.data_ativado instanceof Date;
  }
}
