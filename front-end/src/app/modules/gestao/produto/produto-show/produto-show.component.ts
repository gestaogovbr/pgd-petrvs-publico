import { Component, Injector } from "@angular/core";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { Produto } from "src/app/models/produto.model";
import { PageBase } from "src/app/modules/base/page-base";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";

@Component({
  selector: 'produto-show',
  templateUrl: './produto-show.component.html',
  styleUrls: ['./produto-show.component.scss']
})
export class ProdutoShowComponent extends PageBase {
  public produto?: Produto | null;
  public produtoDaoService: ProdutoDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.produtoDaoService = injector.get<ProdutoDaoService>(ProdutoDaoService);
    this.loading = true;
  } 

  public ngOnInit() {
    super.ngOnInit();
    this.carregaProdutoDetalhado();
  }

  public async carregaProdutoDetalhado(){
    this.produto = await this.produtoDaoService.getById(this.metadata.produto.id, ["produtoProcessoCadeiaValor.cadeiaValorProcesso.cadeiaValor.unidade", "produtoProduto.produtoRelacionado.unidade","responsavel", "unidade"]);
    this.loading = false;
  }
}